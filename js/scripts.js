// scripts.js - Funcionalidad del slider y efectos adicionales

// Variables para el slider
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

// Función para mostrar slides
function showSlides() {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
  });
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add('active');
}

// Inicializar slider automático cada 5 segundos
setInterval(showSlides, 5000);

// Función para smooth scroll en navegación
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll para enlaces de navegación
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Efecto parallax ligero en el header
  window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  const scrolled = window.pageYOffset;

  if (scrolled > 50) {
    // Change to a solid color when scrolled down
    header.style.background = 'rgba(30, 58, 138, 0.95)';
  } else {
    // Revert to the gradient when at the top
    header.style.background = 'linear-gradient(135deg, #111827, #1f2937)';
  }
});


  // Animación adicional para las tarjetas
  const cards = document.querySelectorAll('.card');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const cardObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.opacity = '1';
      }
    });
  }, observerOptions);

  cards.forEach(card => {
    cardObserver.observe(card);
  });
});

// Función para mostrar mensaje de WhatsApp personalizado
function initWhatsApp() {
  const whatsappButton = document.querySelector('.whatsapp-float');
  
  if (whatsappButton) {
    // Agregar efecto de hover mejorado
    whatsappButton.addEventListener('mouseenter', function() {
      this.style.animation = 'none';
    });
    
    whatsappButton.addEventListener('mouseleave', function() {
      this.style.animation = 'whatsapp-pulse 2s infinite';
    });
  }
}

// Inicializar WhatsApp cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initWhatsApp);

// Función para manejar el menú responsive (si se agrega en el futuro)
function toggleMobileMenu() {
  const nav = document.querySelector('nav');
  nav.classList.toggle('mobile-active');
}

// Función para lazy loading de imágenes
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);