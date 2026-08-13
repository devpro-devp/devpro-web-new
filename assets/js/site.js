(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const menuLabel = document.querySelector('[data-menu-label]');
  const modal = document.querySelector('[data-lead-modal]');
  const stickyConversion = document.querySelector('[data-sticky-conversion]');
  const hero = document.querySelector('.hero, .page-hero');
  const finalCta = document.querySelector('[data-final-cta]');
  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])';
  let lastFocus;

  const setMenu = open => {
    if (!toggle || !menu) return;
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    if (menuLabel) menuLabel.textContent = open ? 'Tutup menu' : 'Buka menu';
    if (open) menu.querySelector(focusableSelector)?.focus();
    else toggle.focus();
  };

  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));

  const desktopNavigation = window.matchMedia('(min-width: 980px)');
  desktopNavigation.addEventListener('change', event => {
    if (event.matches && menu?.classList.contains('is-open')) setMenu(false);
  });

  if (header && hero && 'IntersectionObserver' in window) {
    const headerObserver = new IntersectionObserver(entries => {
      header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }, { threshold: 0 });
    headerObserver.observe(hero);
  }

  let heroVisible = true;
  let finalCtaVisible = false;
  const updateStickyConversion = () => {
    if (!stickyConversion) return;
    const visible = !heroVisible && !finalCtaVisible;
    const stickyLink = stickyConversion.querySelector('a');
    stickyConversion.classList.toggle('is-visible', visible);
    stickyConversion.setAttribute('aria-hidden', String(!visible));
    stickyConversion.toggleAttribute('inert', !visible);
    if (stickyLink) stickyLink.tabIndex = visible ? 0 : -1;
    document.body.classList.toggle('has-sticky-conversion', visible);
  };

  if (stickyConversion && hero && 'IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver(entries => {
      heroVisible = entries[0].isIntersecting;
      updateStickyConversion();
    }, { threshold: .08 });
    heroObserver.observe(hero);

    if (finalCta) {
      const finalObserver = new IntersectionObserver(entries => {
        finalCtaVisible = entries[0].isIntersecting;
        updateStickyConversion();
      }, { threshold: .15 });
      finalObserver.observe(finalCta);
    }
  }

  const openModal = () => {
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('input, select, textarea, button')?.focus();
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastFocus?.focus();
  };

  document.querySelectorAll('[data-open-lead]').forEach(button => button.addEventListener('click', openModal));
  modal?.querySelectorAll('[data-close-lead]').forEach(button => button.addEventListener('click', closeModal));
  modal?.addEventListener('click', event => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', event => {
    const menuOpen = menu?.classList.contains('is-open');
    const modalOpen = modal?.classList.contains('is-open');

    if (event.key === 'Escape') {
      if (modalOpen) closeModal();
      else if (menuOpen) setMenu(false);
      return;
    }

    if (event.key !== 'Tab') return;

    if (modalOpen) {
      const items = [...modal.querySelectorAll(focusableSelector)];
      if (!items.length) return;
      if (event.shiftKey && document.activeElement === items[0]) {
        event.preventDefault();
        items.at(-1).focus();
      } else if (!event.shiftKey && document.activeElement === items.at(-1)) {
        event.preventDefault();
        items[0].focus();
      }
      return;
    }

    if (menuOpen && !desktopNavigation.matches) {
      const items = [toggle, ...menu.querySelectorAll(focusableSelector)];
      if (event.shiftKey && document.activeElement === items[0]) {
        event.preventDefault();
        items.at(-1).focus();
      } else if (!event.shiftKey && document.activeElement === items.at(-1)) {
        event.preventDefault();
        items[0].focus();
      }
    }
  });

  document.querySelector('[data-lead-form]')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get('name');
    const company = form.get('company');
    const email = form.get('email');
    const service = form.get('service');
    const needs = form.get('needs');
    const subject = encodeURIComponent(`Project Brief DevPro - ${company || name}`);
    const body = encodeURIComponent(`Nama: ${name}\nPerusahaan: ${company}\nEmail/Telepon: ${email}\nArea kebutuhan: ${service}\n\nRingkasan kebutuhan:\n${needs}`);
    const status = event.currentTarget.querySelector('[data-form-status]');
    if (status) status.textContent = 'Membuka aplikasi email dengan project brief Anda.';
    window.location.href = `mailto:contact@devpro.co.id?subject=${subject}&body=${body}`;
  });
})();
