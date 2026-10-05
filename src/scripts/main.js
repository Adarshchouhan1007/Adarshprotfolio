import { initSkillsFilter } from './skills.js';
import { renderProjects } from './projects.js';

// DOM Ready Handler
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypingEffect();
  initMobileNav();
  initSkillsFilter();
  renderProjects();
  initContactForm();
  initNavbarScroll();
  initScrollAnimations();
});

// Theme Switcher Logic
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(toggleBtn, currentTheme);

  toggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeIcon(toggleBtn, newTheme);
  });
}

function updateThemeIcon(btn, theme) {
  btn.innerHTML = theme === 'light' 
    ? '<i class="fa-solid fa-moon"></i>' 
    : '<i class="fa-solid fa-sun"></i>';
}

// Typing Effect for Hero Title
function initTypingEffect() {
  const element = document.getElementById('typed-role');
  if (!element) return;

  const roles = [
    'Software Engineer',
    'Competitive Programmer',
    'Algorithm Specialist',
    'Full Stack Developer'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIdx];
    
    if (isDeleting) {
      element.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50;
    } else {
      element.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at full word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// Mobile Drawer Menu
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        icon.className = navLinks.classList.contains('active') 
          ? 'fa-solid fa-xmark' 
          : 'fa-solid fa-bars';
      }
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }
}

// Navbar Shadow on Scroll
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
}

// Contact Form Handler
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notification');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'warning');
        return;
      }

      // Simulated successful send
      showToast('Thank you! Your message has been sent successfully to Adarsh.', 'success');
      form.reset();
    });
  }

  function showToast(msg, type = 'success') {
    if (!toast) return;
    const toastText = toast.querySelector('.toast-text');
    if (toastText) toastText.textContent = msg;
    toast.classList.add('active');

    setTimeout(() => {
      toast.classList.remove('active');
    }, 4000);
  }
}

// Scroll Animations & Counter Triggers
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('bio-stat-val')) {
          animateCounter(entry.target);
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.bio-stat-val').forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target') || '0', 10);
  let current = 0;
  const increment = Math.ceil(target / 40);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = current + '+';
    }
  }, 30);
}
