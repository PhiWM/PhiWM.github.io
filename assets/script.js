const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
const navLinks = Array.from(document.querySelectorAll('.nav-menu a'));

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
    });
  });
}

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('active'));
          const current = navLinks.find((link) => link.getAttribute('href') === `#${entry.target.id}`);
          if (current) current.classList.add('active');
        }
      });
    },
    { rootMargin: '-35% 0px -55% 0px', threshold: 0.05 }
  );
  sections.forEach((section) => observer.observe(section));
}
