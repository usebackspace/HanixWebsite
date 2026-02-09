/* ===================================
   GSAP ANIMATIONS & INTERACTIONS
   =================================== */

// Register GSAP plugin if available
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMobileMenu();
    initHeroAnimations();
    initScrollAnimations();
    initProductCarousel();
    initTestimonialCarousel();
    initFormSubmission();
    initSwiperCarousels();
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
    const navbar = document.querySelector('header');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ===================================
   HERO SECTION ANIMATIONS
   =================================== */

function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;
    
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
}

/* ===================================
   SCROLL ANIMATIONS
   =================================== */

function initScrollAnimations() {
    if (typeof gsap === 'undefined') return;
    
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

    // Service cards hover effect
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -5,
                boxShadow: '0 15px 40px rgba(216, 9, 44, 0.2)',
                ease: 'power2.out'
            });
            const icon = this.querySelector('.service-icon');
            if (icon) {
                gsap.to(icon, {
                    duration: 0.3,
                    rotation: 10,
                    scale: 1.1,
                    ease: 'power2.out'
                });
            }
        });
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
                ease: 'power2.out'
            });
            const icon = this.querySelector('.service-icon');
            if (icon) {
                gsap.to(icon, {
                    duration: 0.3,
                    rotation: 0,
                    scale: 1,
                    ease: 'power2.out'
                });
            }
        });
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

    if (!track || !prevBtn || !nextBtn) return;

    let currentPosition = 0;
    const cardWidth = document.querySelector('.product-card')?.offsetWidth || 300;
    const gap = 32;

    prevBtn.addEventListener('click', () => {
        if (currentPosition < 0 && typeof gsap !== 'undefined') {
            currentPosition += cardWidth + gap;
            gsap.to(track, {
                duration: 0.8,
                x: currentPosition,
                ease: 'power3.inOut'
            });
        }
    });

    nextBtn.addEventListener('click', () => {
        if (typeof gsap !== 'undefined') {
            currentPosition -= cardWidth + gap;
            gsap.to(track, {
                duration: 0.8,
                x: currentPosition,
                ease: 'power3.inOut'
            });
        }
    });

    // Responsive carousel
    window.addEventListener('resize', () => {
        currentPosition = 0;
        if (typeof gsap !== 'undefined') {
            gsap.set(track, { x: 0 });
        }
    });
}

/* ===================================
   TESTIMONIAL CAROUSEL
   =================================== */

function initTestimonialCarousel() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    if (testimonialCards.length === 0) return;

    let currentIndex = 0;

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

        if (typeof gsap !== 'undefined') {
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
        }

        // Log form data
        console.log('Form submitted with data:', Object.fromEntries(formData));
    });
}

/* ===================================
   SWIPER CAROUSELS
   =================================== */

function initSwiperCarousels() {
    if (typeof Swiper === 'undefined') return;

    // Category Slider
    if (document.querySelector('.category-slider')) {
        new Swiper('.category-slider', {
            slidesPerView: 4,
            spaceBetween: 25,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
            }
        });
    }

    // Products Slider
    if (document.querySelector('.products-slider')) {
        new Swiper('.products-slider', {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
            }
        });
    }
}

/* ===================================
   SCROLL-BASED NAVBAR
   =================================== */

(function () {
    const header = document.getElementById('site-header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const currentY = window.scrollY;

        if (currentY <= 10) {
            header.classList.remove('nav-hidden');
        } else if (currentY > lastScrollY) {
            header.classList.add('nav-hidden');
        } else if (currentY < lastScrollY) {
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

/* ===================================
   PERFORMANCE OPTIMIZATION
   =================================== */

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && typeof gsap !== 'undefined') {
    gsap.globalTimeline.timeScale(0.5);
}

console.log('Hanix website scripts loaded successfully!');
