// =========================================================
// S. KAVIARASAN - PORTFOLIO MAIN SCRIPT (Preloader Removed)
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. NAVBAR SCROLL EFFECT & BACK TO TOP ---
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('is-scrolled');
      backToTop.classList.add('is-visible');
    } else {
      navbar.classList.remove('is-scrolled');
      backToTop.classList.remove('is-visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // --- 2. MOBILE MENU (HAMBURGER) ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
  const navItems = document.querySelectorAll('.nav-link');

  function toggleMenu() {
    const isOpen = navLinks.classList.contains('is-open');
    navLinks.classList.toggle('is-open');
    navOverlay.classList.toggle('is-active');
    hamburger.setAttribute('aria-expanded', !isOpen);
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', toggleMenu);
    
    // Close menu when a link is clicked
    navItems.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('is-open')) toggleMenu();
      });
    });
  }


  // --- 3. SCROLL REVEAL ANIMATIONS (Fix for Blank Screen) ---
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-reveal-delay');
        if (delay) {
          entry.target.style.transitionDelay = `${delay}ms`;
        }
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => revealObserver.observe(el));


  // --- 4. NUMBER COUNTERS ---
  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const suffix = entry.target.getAttribute('data-suffix') || '';
        let count = 0;
        const speed = 100; // Adjust speed here
        const inc = target / speed;

        const updateCount = () => {
          count += inc;
          if (count < target) {
            entry.target.innerText = Math.ceil(count) + suffix;
            requestAnimationFrame(updateCount);
          } else {
            entry.target.innerText = target + suffix;
          }
        };
        updateCount();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));


  // --- 5. MODALS (PROJECT DETAILS) ---
  const openModalBtns = document.querySelectorAll('[data-modal-open]');
  const closeBtns = document.querySelectorAll('[data-modal-close]');
  const modals = document.querySelectorAll('.modal');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal-open');
      document.getElementById(modalId).classList.add('is-open');
      document.body.classList.add('modal-open'); // Prevent background scrolling
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modals.forEach(modal => modal.classList.remove('is-open'));
      document.body.classList.remove('modal-open');
    });
  });


  // --- 6. TYPING EFFECT (Hero Section) ---
  const typedRole = document.getElementById('typedRole');
  if (typedRole) {
    const roles = ["Data Analyst", "Data Scientist", "Power BI Developer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        typedRole.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedRole.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Wait before deleting
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Wait before typing next word
      }

      setTimeout(typeEffect, typeSpeed);
    }
    setTimeout(typeEffect, 1000);
  }


  // --- 7. TERMINAL CODE MOCKUP EFFECT ---
  const terminalCode = document.getElementById('terminalCode');
  if (terminalCode) {
    terminalCode.textContent = "import pandas as pd\nimport matplotlib.pyplot as plt\n\n# Analyzing Britannia Sales Data\ndf = pd.read_csv('sales.csv')\nprint(df.describe())";
  }


  // --- 8. FOOTER DYNAMIC YEAR ---
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }


  // --- 9. CONTACT FORM DEMO SUBMIT ---
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Temporary success message for demo
      formStatus.textContent = "Thank you! Your message has been sent.";
      formStatus.className = "form-status is-success";
      form.reset();
      
      setTimeout(() => {
        formStatus.textContent = "";
      }, 4000);
    });
  }

});
// --- 11. ACTIVE MENU LINK (SCROLL SPY) ---
  const sections = document.querySelectorAll('section[id]');
  const navLinksArray = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      // 150px offset to change active state smoothly before reaching the exact section
      if (scrollY >= (sectionTop - 150)) { 
        current = section.getAttribute('id');
      }
    });

    navLinksArray.forEach(link => {
      link.classList.remove('is-active'); // Pazhaya active line-a remove panrom
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('is-active'); // Puthu section-ku blue line-a add panrom
      }
    });
  });