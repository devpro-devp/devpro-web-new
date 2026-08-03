(() => {
  const description = document.querySelector('meta[name="description"]')?.content;
  const canonical = document.querySelector('link[rel="canonical"]')?.href;
  const upsertMeta = (property, content) => {
    if (!content) return;
    let element = document.querySelector(`meta[property="${property}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('property', property);
      document.head.append(element);
    }
    element.content = content;
  };
  upsertMeta('og:title', document.title);
  upsertMeta('og:description', description);
  upsertMeta('og:type', 'website');
  upsertMeta('og:url', canonical || window.location.href);
  document.querySelectorAll('.hero .button-secondary').forEach(button => { button.style.background = 'transparent'; });
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const modal = document.querySelector('[data-lead-modal]');
  const focusable = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])';
  let lastFocus;
  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  updateHeader(); window.addEventListener('scroll', updateHeader, {passive:true});
  toggle?.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('is-open'); toggle?.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
  }));
  const openModal = () => {
    if (!modal) return;
    lastFocus = document.activeElement; modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('input,select,textarea,button')?.focus(); document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; lastFocus?.focus();
  };
  document.querySelectorAll('[data-open-lead]').forEach(button => button.addEventListener('click', openModal));
  modal?.querySelectorAll('[data-close-lead]').forEach(button => button.addEventListener('click', closeModal));
  modal?.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal?.classList.contains('is-open')) closeModal();
    if (event.key !== 'Tab' || !modal?.classList.contains('is-open')) return;
    const items = [...modal.querySelectorAll(focusable)]; if (!items.length) return;
    if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items.at(-1).focus(); }
    if (!event.shiftKey && document.activeElement === items.at(-1)) { event.preventDefault(); items[0].focus(); }
  });
  document.querySelector('[data-lead-form]')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get('name'), company = form.get('company'), email = form.get('email'), service = form.get('service'), needs = form.get('needs');
    const subject = encodeURIComponent(`Project Brief DevPro — ${company || name}`);
    const body = encodeURIComponent(`Nama: ${name}\nPerusahaan: ${company}\nEmail/Telepon: ${email}\nArea kebutuhan: ${service}\n\nRingkasan kebutuhan:\n${needs}`);
    const status = event.currentTarget.querySelector('[data-form-status]');
    if (status) status.textContent = 'Membuka email untuk mengirim project brief Andaâ€¦';
    window.location.href = `mailto:contact@devpro.co.id?subject=${subject}&body=${body}`;
  });
})();
