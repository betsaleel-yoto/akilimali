import { CountUp } from 'countup';

const toggle = document.getElementById('menu-toggle');
const menu  = document.getElementById('menu');

toggle.addEventListener('click', () => {
  if (menu.hasAttribute('hidden')) {
    menu.removeAttribute('hidden');
  } else {
    menu.setAttribute('hidden', '');
  }
});

const menuClose = document.getElementById('menu-close');
menuClose.addEventListener('click', () => {
  menu.setAttribute('hidden', '');
});

const popup = document.getElementById('popup');


const contactSection = document.getElementById('contact');
const obs = new IntersectionObserver(([e]) => {
  if (e.isIntersecting) {
    popup.classList.add('visible');
    obs.disconnect();
  }
}, { threshold: 0.5 });
obs.observe(contactSection);

document.getElementById('popup-close').addEventListener('click', () => {
  popup.classList.remove('visible');
});

function handleForm(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const whatsapp = document.getElementById('whatsapp').value;
  console.log("Données du formulaire:", { email, whatsapp });
  popup.classList.remove('visible');
  e.target.reset();
}

const testimonialVideos = document.querySelectorAll('.testimonial-video');
let currentTestimonial = 0;

testimonialVideos.forEach(video => {
  video.addEventListener('ended', () => {
    video.classList.remove('active');
    currentTestimonial = (currentTestimonial + 1) % testimonialVideos.length;
    const nextVideo = testimonialVideos[currentTestimonial];
    nextVideo.classList.add('slide-in');
    nextVideo.classList.add('active');
    nextVideo.play();
    nextVideo.addEventListener('animationend', () => {
      nextVideo.classList.remove('slide-in');
    }, { once: true });
  });
});

// On full page load: trigger intro animations and initialize AOS
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  const activeVideo = document.querySelector('.testimonial-video.active');
  if (activeVideo) {
    activeVideo.play();
  }
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    });
  }
});

/* Hero Background Slider */
const slides = document.querySelectorAll('.hero-bg-slider .bg-slide');
let slideIndex = 0;
setInterval(() => {
  slides[slideIndex].classList.remove('active');
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add('active');
}, 5000);

/* Stats Counter Animation using CountUp.js */
const statsSection = document.getElementById('stats');
let statsAnimated = false;
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      document.querySelectorAll('.counter').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const countUp = new CountUp(counter, target);
        if (!countUp.error) {
          countUp.start();
        } else {
          console.error(countUp.error);
        }
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
if (statsSection) statsObserver.observe(statsSection);

// New handler for the newsletter form submission
function handleNewsletter(e) {
  e.preventDefault();
  const newsletterEmail = document.getElementById('newsletter-email').value;
  console.log("Newsletter subscription:", { newsletterEmail });
  alert("Merci pour votre inscription !");
  e.target.reset();
}