/**
 * Aditya Vibhute — Portfolio Interactive Logic
 * Modern Vanilla JavaScript with Parallax, Intersection Observer & Typing Effect
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Typing Effect Logic
    // ----------------------------------------------------------------------
    const typingSpan = document.getElementById('typing');
    const words = [
        'Frontend Developer',
        'AI/ML',
        'Data Science'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function typeEffect() {
        if (!typingSpan) return;

        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 40;
        } else {
            typingSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 90;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingDelay = 2200; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingDelay = 400;
        }

        setTimeout(typeEffect, typingDelay);
    }

    if (typingSpan) {
        // Create custom blinking cursor
        const cursor = document.createElement('span');
        cursor.classList.add('typing-cursor');
        typingSpan.parentNode.insertBefore(cursor, typingSpan.nextSibling);

        // Start typing after initial delay
        setTimeout(typeEffect, 800);
    }

    // ----------------------------------------------------------------------
    // 2. Intersection Observer for Scroll Reveals
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.12
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ----------------------------------------------------------------------
    // 3. Navbar Scroll & Active Section Link Highlighting
    // ----------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a.nav-link');

    function handleScroll() {
        const scrollY = window.pageYOffset;

        // Add scrolled backdrop class to navbar
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Highlight active nav item based on scroll position
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Toggle Back-To-Top button
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            if (scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ----------------------------------------------------------------------
    // 4. Mobile Navigation Drawer Toggle
    // ----------------------------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const navLinksList = document.getElementById('nav-links');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    if (hamburger && navLinksList) {
        hamburger.addEventListener('click', () => {
            navLinksList.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeMobileMenu = () => {
            navLinksList.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', closeMobileMenu);
        }

        // Close when clicking any nav link
        const mobileNavItems = navLinksList.querySelectorAll('a');
        mobileNavItems.forEach(item => {
            item.addEventListener('click', closeMobileMenu);
        });
    }

    // ----------------------------------------------------------------------
    // 5. Interactive Mouse Parallax for Full-Site Background
    // ----------------------------------------------------------------------
    const siteBgImage = document.querySelector('.site-bg-image');

    if (siteBgImage && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const moveX = (clientX - window.innerWidth / 2) / 65;
            const moveY = (clientY - window.innerHeight / 2) / 65;

            siteBgImage.style.transform = `scale(1.04) translate3d(${moveX}px, ${moveY}px, 0)`;
            siteBgImage.style.transition = 'transform 0.1s ease-out';
        });
    }

    // ----------------------------------------------------------------------
    // 6. Contact Form Submission Handler
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.btn-submit');
            if (!submitBtn) return;

            const originalContent = submitBtn.innerHTML;

            // Visual sending state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

            // Simulate server network dispatch
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
                submitBtn.style.background = 'rgba(16, 185, 129, 0.3)';
                submitBtn.style.borderColor = '#10b981';
                submitBtn.style.color = '#ffffff';

                contactForm.reset();

                // Restore button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.style.color = '';
                }, 3500);
            }, 1200);
        });
    }

    // ----------------------------------------------------------------------
    // 7. Dynamic Footer Year Update
    // ----------------------------------------------------------------------
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});