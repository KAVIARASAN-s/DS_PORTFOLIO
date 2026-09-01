// =========================================================
// S. KAVIARASAN - PORTFOLIO MAIN SCRIPT (Preloader Removed)
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- NAVBAR SCROLL & BACK TO TOP ---
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

  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // --- MOBILE MENU ---
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
    navItems.forEach(link => link.addEventListener('click', () => { if (navLinks.classList.contains('is-open')) toggleMenu(); }));
  }

  // --- ACTIVE MENU LINK (SCROLL SPY) ---
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (scrollY >= (section.offsetTop - 150)) current = section.getAttribute('id');
    });
    navItems.forEach(link => {
      link.classList.remove('is-active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('is-active');
    });
  });

  // --- SCROLL REVEAL ANIMATIONS ---
  const revealElements = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-reveal-delay');
        if (delay) entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // --- PROGRESS BAR ANIMATIONS ---
  const progressBars = document.querySelectorAll('.bar span[data-bar]');
  const barObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.getAttribute('data-bar') + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  progressBars.forEach(bar => barObserver.observe(bar));

  // --- MODALS (PROJECT DETAILS) ---
  const openModalBtns = document.querySelectorAll('[data-modal-open]');
  const closeBtns = document.querySelectorAll('[data-modal-close]');
  const modals = document.querySelectorAll('.modal');
  openModalBtns.forEach(btn => btn.addEventListener('click', () => {
    document.getElementById(btn.getAttribute('data-modal-open')).classList.add('is-open');
    document.body.style.overflow = 'hidden'; 
  }));
  closeBtns.forEach(btn => btn.addEventListener('click', () => {
    modals.forEach(modal => modal.classList.remove('is-open'));
    document.body.style.overflow = '';
  }));

  // --- PROJECT IMAGE CAROUSEL ---
  const carousels = document.querySelectorAll('.project-carousel');
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const images = carousel.querySelectorAll('.carousel-img');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    let currentIndex = 0;
    const totalImages = images.length;
    let interval;
    
    function updateCarousel() { track.style.transform = `translateX(-${currentIndex * 100}%)`; }
    function nextSlide() { currentIndex = (currentIndex + 1) % totalImages; updateCarousel(); }
    function prevSlide() { currentIndex = (currentIndex - 1 + totalImages) % totalImages; updateCarousel(); }
    function startAutoSlide() { clearInterval(interval); interval = setInterval(nextSlide, 3000); }
    function stopAutoSlide() { clearInterval(interval); }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    startAutoSlide();
  });

  // --- IMAGE LIGHTBOX (CLICK TO REVEAL) ---
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const carouselImagesToClick = document.querySelectorAll('.carousel-img');

  if (lightbox) {
    carouselImagesToClick.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      });
    });
    const closeLightbox = () => {
      lightbox.classList.remove('is-active');
      document.body.style.overflow = '';
      setTimeout(() => { lightboxImg.src = ''; }, 300); 
    };
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', closeLightbox);
  }

  // --- NUMBER COUNTERS ---
  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const suffix = entry.target.getAttribute('data-suffix') || '';
        let count = 0;
        const speed = 30; // Speed of the counting animation
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
  // --- TYPEWRITER EFFECT ---
  const typeWriterElement = document.getElementById('typewriter');
  if (typeWriterElement) {
    // Inga ungalukku thevayana roles-a add/edit pannikalam
    const roles = ["Data Analyst", "Power BI Developer", "SQL Intern", "AI Enthusiast"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typeWriterElement.textContent = currentRole.substring(0, charIndex);

      let typingSpeed = isDeleting ? 50 : 100; // Type panra speed & Azhikkira speed

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // Oru word mudinjathum 2 seconds wait pannum
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pudhu word start aaga half second wait pannum
      }

      setTimeout(typeEffect, typingSpeed);
    }

    // Start the typing effect
    setTimeout(typeEffect, 1000);
  }
});