// Shefali's Makeover Studio — Interactive Scripts
const STUDIO_PHONE_FORMATTED = '+91 91795 45146';
const STUDIO_PHONE_DIGITS = '919179545146';

// Footer copyright year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Smooth scrolling for internal anchor links (#experience, #services, etc.)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('#!')) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
