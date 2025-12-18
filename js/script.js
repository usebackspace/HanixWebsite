/* ===================================
   GSAP ANIMATIONS & INTERACTIONS
   =================================== */

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMobileMenu();
    initHeroAnimations();
    initScrollAnimations();
    initProductCarousel();
    initTestimonialCarousel();
    initFormSubmission();
});
/* ===================================
   MOBILE MENU (RESPONSIVE NAV)
   =================================== */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-menu-close');
    const body = document.body;

    if (!menuBtn || !menu || !closeBtn) return;

    // Hide menu by default
    menu.classList.add('closed');
    menu.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');

    function openMenu() {
        menu.classList.remove('closed');
        menu.classList.add('open');
        menu.setAttribute('aria-hidden', 'false');
        menuBtn.setAttribute('aria-expanded', 'true');
        body.style.overflow = 'hidden';
    }
    function closeMenu() {
        menu.classList.remove('open');
        menu.classList.add('closed');
        menu.setAttribute('aria-hidden', 'true');
        menuBtn.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });
}

/* ===================================
   NAVIGATION
   =================================== */

function initNavigation() {
    const navbar = document.querySelector('.nav-custom');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const closeButton = document.querySelector('.navbar-toggler');
                        closeButton.click();
                    }
                }
            }
        });
    });
}

/* ===================================
   HERO SECTION ANIMATIONS
   =================================== */

function initHeroAnimations() {
    const timeline = gsap.timeline();

    // Hero text animations
    timeline.from('.hero-title', {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power3.out'
    }, 0)
    .from('.hero-subtitle', {
        duration: 1,
        opacity: 0,
        y: 30,
        ease: 'power3.out'
    }, 0.2)
    .from('.hero-buttons .btn', {
        duration: 0.8,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        ease: 'power3.out'
    }, 0.4);

    // Mockup items animation
    gsap.from('.mockup-item', {
        duration: 1.2,
        opacity: 0,
        x: 100,
        rotation: 10,
        stagger: 0.2,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.8
    });

    // Button hover scale
    document.querySelectorAll('.btn-get-quote, .btn-catalog').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                ease: 'power2.out'
            });
        });
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });

    // Parallax effect on scroll
    gsap.to('.hero-gradient', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
            markers: false
        },
        y: 50,
        ease: 'none'
    });
}

/* ===================================
   SCROLL ANIMATIONS
   =================================== */

function initScrollAnimations() {
    // Category cards stagger animation
    gsap.from('.category-card', {
        scrollTrigger: {
            trigger: '.category-section',
            start: 'top 80%',
            end: 'top 20%',
            markers: false
        },
        duration: 0.8,
        opacity: 0,
        y: 50,
        stagger: {
            amount: 1,
            grid: [3, 3],
            from: 'top'
        },
        ease: 'power3.out'
    });

    // Category cards hover lift effect
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -10,
                boxShadow: '0 15px 40px rgba(216, 9, 44, 0.15)',
                ease: 'power2.out'
            });
        });
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
                ease: 'power2.out'
            });
        });
    });

    // About section image reveal
    gsap.from('.about-image-main', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            markers: false
        },
        duration: 1,
        opacity: 0,
        x: -50,
        ease: 'power3.out'
    });

    gsap.from('.about-image-secondary', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            markers: false
        },
        duration: 1,
        opacity: 0,
        scale: 0,
        ease: 'back.out(1.7)',
        delay: 0.3
    });

    // Feature items stagger
    gsap.from('.feature-item', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 60%',
            markers: false
        },
        duration: 0.8,
        opacity: 0,
        x: 50,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // Products carousel animation
    gsap.from('.product-card', {
        scrollTrigger: {
            trigger: '.products-section',
            start: 'top 80%',
            markers: false
        },
        duration: 0.8,
        opacity: 0,
        y: 50,
        stagger: 0.1,
        ease: 'power3.out'
    });

    // Product cards hover effect
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -10,
                boxShadow: '0 15px 40px rgba(216, 9, 44, 0.15)',
                ease: 'power2.out'
            });
        });
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
                ease: 'power2.out'
            });
        });
    });

    // Service cards stagger animation
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services-section',
            start: 'top 80%',
            markers: false
        },
        duration: 0.8,
        opacity: 0,
        y: 50,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // Service cards hover effect
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -5,
                boxShadow: '0 15px 40px rgba(216, 9, 44, 0.2)',
                ease: 'power2.out'
            });
            gsap.to(this.querySelector('.service-icon'), {
                duration: 0.3,
                rotation: 10,
                scale: 1.1,
                ease: 'power2.out'
            });
        });
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
                ease: 'power2.out'
            });
            gsap.to(this.querySelector('.service-icon'), {
                duration: 0.3,
                rotation: 0,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });

    // Client logos animation
    gsap.from('.client-logo-card', {
        scrollTrigger: {
            trigger: '.testimonials-section',
            start: 'top 80%',
            markers: false
        },
        duration: 0.6,
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    });

    // Client logo hover effect
    document.querySelectorAll('.client-logo').forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                ease: 'power2.out'
            });
        });
        logo.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });

    // Contact section fade in
    gsap.from('.contact-info-item', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
            markers: false
        },
        duration: 0.8,
        opacity: 0,
        x: -50,
        stagger: 0.15,
        ease: 'power3.out'
    });

    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
            markers: false
        },
        duration: 1,
        opacity: 0,
        x: 50,
        ease: 'power3.out'
    });

    // Form inputs focus animation
    document.querySelectorAll('.contact-form .form-control').forEach(input => {
        input.addEventListener('focus', function() {
            gsap.to(this, {
                duration: 0.3,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                ease: 'power2.out'
            });
        });
        input.addEventListener('blur', function() {
            gsap.to(this, {
                duration: 0.3,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                ease: 'power2.out'
            });
        });
    });
}

/* ===================================
   PRODUCT CAROUSEL
   =================================== */

function initProductCarousel() {
    const track = document.querySelector('.products-track');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentPosition = 0;

    if (!track || !prevBtn || !nextBtn) return;

    const cardWidth = document.querySelector('.product-card').offsetWidth;
    const gap = 32; // 2rem
    const visibleCards = 4;
    const maxScroll = -(track.scrollWidth - window.innerWidth + 100);

    prevBtn.addEventListener('click', () => {
        if (currentPosition < 0) {
            currentPosition += cardWidth + gap;
            gsap.to(track, {
                duration: 0.8,
                x: currentPosition,
                ease: 'power3.inOut'
            });
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPosition > maxScroll) {
            currentPosition -= cardWidth + gap;
            gsap.to(track, {
                duration: 0.8,
                x: currentPosition,
                ease: 'power3.inOut'
            });
        }
    });

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            nextBtn.click();
        } else if (touchEndX - touchStartX > 50) {
            prevBtn.click();
        }
    });

    // Responsive carousel
    window.addEventListener('resize', () => {
        currentPosition = 0;
        gsap.set(track, { x: 0 });
    });
}

/* ===================================
   TESTIMONIAL CAROUSEL
   =================================== */

function initTestimonialCarousel() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    if (testimonialCards.length === 0) return;

    // Set initial active testimonial
    testimonialCards[0].classList.add('active');

    const rotateTestimonials = () => {
        testimonialCards[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        testimonialCards[currentIndex].classList.add('active');
    };

    // Auto-rotate every 5 seconds
    setInterval(rotateTestimonials, 5000);
}

/* ===================================
   FORM SUBMISSION
   =================================== */

function initFormSubmission() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const formData = new FormData(contactForm);

        // Create success animation
        const submitBtn = contactForm.querySelector('[type="submit"]');
        const originalText = submitBtn.innerHTML;

        gsap.to(submitBtn, {
            duration: 0.3,
            scale: 0.95,
            ease: 'power2.out'
        });

        setTimeout(() => {
            gsap.to(submitBtn, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });

            // Update button text
            submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Quote Request Sent!';
            submitBtn.disabled = true;

            // Reset after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 3000);
        }, 300);

        // Here you would typically send the form data to a server
        console.log('Form submitted with data:', Object.fromEntries(formData));
    });
}

/* ===================================
   UTILITY FUNCTIONS
   =================================== */

// Counter animation for stats (if needed)
function animateCounter(element, target, duration = 2) {
    gsap.to(element, {
        duration: duration,
        innerHTML: Math.floor(target),
        snap: { innerHTML: 1 },
        ease: 'power2.out',
        onUpdate() {
            element.innerHTML = Math.floor(element.innerHTML);
        }
    });
}

// Stagger reveal animation
function staggerReveal(elements, delay = 0.1) {
    gsap.from(elements, {
        duration: 0.8,
        opacity: 0,
        y: 50,
        stagger: delay,
        ease: 'power3.out'
    });
}

/* ===================================
   PERFORMANCE OPTIMIZATION
   =================================== */

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(0.5);
}

// Disable animations on low-end devices
if (navigator.deviceMemory && navigator.deviceMemory < 4) {
    document.body.classList.add('reduce-motion');
    gsap.globalTimeline.timeScale(0.8);
}

/* ===================================
   EVENT LISTENERS
   =================================== */

// Update on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// Log page load time
window.addEventListener('load', () => {
    console.log('Page fully loaded and ready!');
});


// SCROLL-BASED NAVBAR: hide on scroll DOWN, show on scroll UP
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeader() {
    const currentY = window.scrollY;

    // Always visible at the top
    if (currentY <= 10) {
      header.classList.remove('nav-hidden');
    } 
    // Scrolling DOWN -> HIDE menu
    else if (currentY > lastScrollY) {
      header.classList.add('nav-hidden');
    } 
    // Scrolling UP -> SHOW menu
    else if (currentY < lastScrollY) {
      header.classList.remove('nav-hidden');
    }

    lastScrollY = currentY;
    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    },
    { passive: true }
  );
})();


