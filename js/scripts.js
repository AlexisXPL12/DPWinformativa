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

// JavaScript para el menú header
document.addEventListener('DOMContentLoaded', function() {
    
    // Función para toggle del menú móvil
    function toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (mobileMenu && menuToggle) {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        }
    }
    
    // Hacer la función global para que funcione con onclick
    window.toggleMobileMenu = toggleMobileMenu;
    
    // Manejo de dropdowns en desktop
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const content = dropdown.querySelector('.dropdown-content');
        
        if (toggle && content) {
            // Para mobile, usar click
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Cerrar otros dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
            });
        }
    });
    
    // Cerrar menú móvil al hacer click fuera
    document.addEventListener('click', function(e) {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuToggle = document.querySelector('.menu-toggle');
        const header = document.querySelector('header');
        
        if (mobileMenu && menuToggle && header) {
            if (!header.contains(e.target) && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
    
    // Cerrar menú móvil al redimensionar la ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuToggle = document.querySelector('.menu-toggle');
            
            if (mobileMenu && menuToggle) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            // Cerrar todos los dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Cerrar dropdowns al hacer click fuera (solo en mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const isDropdownClick = e.target.closest('.dropdown');
            
            if (!isDropdownClick) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
});

// Función adicional para smooth scroll (opcional)
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
}