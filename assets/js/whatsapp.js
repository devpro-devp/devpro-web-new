(() => {
  const href = 'https://wa.me/62822104060?text=Halo%20DevPro%2C%20saya%20ingin%20mendiskusikan%20kebutuhan%20infrastruktur%20teknologi%20dan%20jaringan.';
  const icon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.45L3 20.5l1.38-4.68A8.5 8.5 0 1 1 20.5 11.7Z"/><path d="M8.3 7.7c.23-.5.48-.5.7-.5h.6c.2 0 .43.08.52.42l.78 1.86c.08.2.04.44-.1.58l-.54.66c-.12.13-.24.27-.1.5.14.24.62 1.03 1.34 1.65.92.82 1.7 1.08 1.94 1.2.24.12.38.1.52-.06l.66-.78c.17-.2.35-.16.58-.08l1.72.8c.28.14.46.2.52.32.06.12.06.7-.17 1.36-.23.66-1.3 1.27-1.8 1.34-.47.07-1.07.1-1.73-.12-.4-.13-.92-.3-1.58-.6-2.77-1.2-4.58-4.01-4.72-4.2-.13-.19-1.12-1.5-1.12-2.86 0-1.36.7-2.03.95-2.31Z"/></svg>';
  const link = (className, text, label) => {
    const anchor = document.createElement('a');
    anchor.className = className;
    anchor.href = href;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.setAttribute('aria-label', label || text);
    anchor.innerHTML = `${icon}${text ? `<span>${text}</span>` : ''}`;
    return anchor;
  };

  document.querySelectorAll('.hero-actions, .side-card').forEach(container => {
    if (!container.querySelector('[data-whatsapp-cta]')) {
      const cta = link('button button-whatsapp', 'Diskusi via WhatsApp');
      cta.dataset.whatsappCta = 'true';
      container.append(cta);
    }
  });

  document.querySelectorAll('.site-footer .footer-links').forEach(container => {
    if (container.querySelector('a[href^="mailto:"]') && !container.querySelector('[data-whatsapp-footer]')) {
      const cta = link('button button-whatsapp', 'Diskusi via WhatsApp');
      cta.dataset.whatsappFooter = 'true';
      container.append(cta);
    }
  });

  if (!document.querySelector('.whatsapp-float')) {
    document.body.append(link('whatsapp-float', '', 'Diskusi via WhatsApp'));
  }
})();
