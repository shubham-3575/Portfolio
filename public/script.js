(() => {
  'use strict';
  // Add verified links here. Empty fields never render as dead or placeholder links.
  const profile = {
    resume: 'assets/documents/Shubham-Patel-Resume.pdf',
    email: 'shubhampatel150805@gmail.com',
    github: 'https://github.com/shubham-3575',
    linkedin: ''
  };
  document.querySelectorAll('[data-resume]').forEach(link => { link.href = profile.resume; });
  document.querySelector('#year').textContent = new Date().getFullYear();
  const contactActions = document.querySelector('#contact-actions');
  if (profile.email) {
    const contactLink = contactActions.querySelector('a');
    contactLink.href = `mailto:${profile.email}`;
    contactLink.removeAttribute('target');
    contactLink.replaceChildren(document.createTextNode('Start a conversation '));
    const arrow = document.createElement('span');
    arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true');
    contactLink.append(arrow);
  }
  const socialLinks = document.createElement('div');
  socialLinks.className = 'social-links';
  for (const [key, label] of [['github', 'GitHub ↗'], ['linkedin', 'LinkedIn ↗']]) {
    if (!profile[key]) continue;
    const link = document.createElement('a');
    link.href = profile[key]; link.textContent = label;
    link.target = '_blank'; link.rel = 'noopener noreferrer';
    socialLinks.append(link);
  }
  if (socialLinks.childElementCount) contactActions.after(socialLinks);

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('open', open);
  });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu(); menuButton.focus();
    }
  });
  document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
  matchMedia('(min-width: 681px)').addEventListener('change', closeMenu);

  // One frame-scheduled scroll update keeps progress, navigation, and artwork in sync.
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.header');
  const progress = document.querySelector('.reading-progress');
  const orbital = document.querySelector('.orbital');
  const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];
  const sections = [...document.querySelectorAll('main > section[id]')].filter(section =>
    sectionLinks.some(link => link.hash === `#${section.id}`)
  );
  let framePending = false;
  function updateScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, y / max)) : 0})`;
    header.classList.toggle('scrolled', y > 12);
    if (!reducedMotion.matches && y < window.innerHeight * 1.5) {
      orbital.style.transform = `translateY(${Math.min(y * 0.075, 60)}px) rotate(${y * 0.008}deg)`;
    } else if (reducedMotion.matches) orbital.style.transform = '';
    let active = null;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.42) active = section.id;
    }
    if (max > 0 && y >= max - 4) active = 'contact';
    sectionLinks.forEach(link => {
      if (link.hash === `#${active}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    framePending = false;
  }
  function scheduleScroll() {
    if (!framePending) { framePending = true; requestAnimationFrame(updateScroll); }
  }
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', scheduleScroll);
  reducedMotion.addEventListener('change', scheduleScroll);
  window.addEventListener('load', scheduleScroll);
  updateScroll();

  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('visible'); observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
    document.body.classList.add('motion-ready');
    reveals.forEach(element => {
      const siblings = [...element.parentElement.children];
      if (element.parentElement.matches('.expertise-grid, .process-grid')) {
        element.style.setProperty('--delay', `${siblings.indexOf(element) * 90}ms`);
      }
      observer.observe(element);
    });
  }

  const tabs = [...document.querySelectorAll('[data-system]')];
  const panel = document.querySelector('#architecture-panel');
  const descriptions = {
    intelligence: 'The service layer connects the interface with model inference, turning data into a response the user can act on.',
    fullstack: 'The service layer validates requests, applies business logic, and retrieves persistent data before returning a response to the interface.'
  };
  function selectSystem(tab) {
    tabs.forEach(item => {
      item.setAttribute('aria-selected', String(item === tab));
      item.tabIndex = item === tab ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', tab.id);
    panel.querySelector('.system-dynamic').textContent = tab.dataset.system === 'intelligence' ? 'AI / ML model' : 'SQL database';
    panel.querySelector('.system-description').textContent = descriptions[tab.dataset.system];
    if (!reducedMotion.matches) panel.animate([{ opacity: 0, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 280, easing: 'ease-out' });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectSystem(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); tabs[next].focus(); selectSystem(tabs[next]); }
    });
  });
  const dialog = document.querySelector('#project-dialog');
  document.querySelector('#project-open').addEventListener('click', () => dialog.showModal());
  dialog.querySelectorAll('.dialog-close').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
})();
