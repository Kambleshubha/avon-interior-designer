const header = document.querySelector('#site-header');
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#primary-menu');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setHeader = () => header.classList.toggle('scrolled', window.scrollY > 40);
setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

function closeMenu() {
  menu.classList.remove('open');
  document.body.classList.remove('menu-open');
  toggle.setAttribute('aria-expanded', 'false');
}

toggle.addEventListener('click', () => {
  const opening = !menu.classList.contains('open');
  menu.classList.toggle('open', opening);
  document.body.classList.toggle('menu-open', opening);
  toggle.setAttribute('aria-expanded', String(opening));
  if (opening) menu.querySelector('a').focus();
});

menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('open')) {
    closeMenu();
    toggle.focus();
  }
  if (event.key === 'Tab' && menu.classList.contains('open')) {
    const links = [...menu.querySelectorAll('a')];
    const first = links[0];
    const last = links[links.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

const revealItems = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach(item => item.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries, revealObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
  revealItems.forEach(item => observer.observe(item));
}

const testimonialSlides = [...document.querySelectorAll('.testimonial-slide')];
const testimonialDots = [...document.querySelectorAll('.carousel-dots button')];
const testimonialCurrent = document.querySelector('#testimonial-current');
const testimonialCarousel = document.querySelector('#testimonial-carousel');
let testimonialIndex = 0;

function showTestimonial(index) {
  testimonialIndex = (index + testimonialSlides.length) % testimonialSlides.length;
  testimonialSlides.forEach((slide, slideIndex) => {
    const active = slideIndex === testimonialIndex;
    slide.classList.toggle('active', active);
    slide.setAttribute('aria-hidden', String(!active));
  });
  testimonialDots.forEach((dot, dotIndex) => {
    const active = dotIndex === testimonialIndex;
    dot.classList.toggle('active', active);
    active ? dot.setAttribute('aria-current', 'true') : dot.removeAttribute('aria-current');
  });
  testimonialCurrent.textContent = String(testimonialIndex + 1).padStart(2, '0');
}

if (testimonialCarousel) {
  document.querySelector('.testimonial-prev').addEventListener('click', () => showTestimonial(testimonialIndex - 1));
  document.querySelector('.testimonial-next').addEventListener('click', () => showTestimonial(testimonialIndex + 1));
  testimonialDots.forEach((dot, index) => dot.addEventListener('click', () => showTestimonial(index)));
  testimonialCarousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') showTestimonial(testimonialIndex - 1);
    if (event.key === 'ArrowRight') showTestimonial(testimonialIndex + 1);
  });
}

const lightbox = document.querySelector('#gallery-lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');
let galleryTrigger = null;

document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => {
  galleryTrigger = item;
  lightboxImage.src = item.dataset.galleryImage;
  lightboxImage.alt = item.dataset.galleryAlt;
  lightbox.showModal();
}));

function closeLightbox() {
  lightbox.close();
  lightboxImage.src = '';
  galleryTrigger?.focus();
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});
