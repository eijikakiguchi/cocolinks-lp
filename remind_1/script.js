document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SP Menu Toggle
    const menuBtn = document.querySelector('.js-menu-btn');
    const body = document.body;
    const navLinks = document.querySelectorAll('.header__nav-list a');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            body.classList.toggle('nav-open');
            const isOpen = body.classList.contains('nav-open');
            menuBtn.setAttribute('aria-expanded', isOpen);
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (body.classList.contains('nav-open')) {
                body.classList.remove('nav-open');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // 2. Scroll Animation (Fade Up)
    const fadeElements = document.querySelectorAll('.js-fade-up');
    
    // Reduce motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && fadeElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px', // Trigger slightly before it comes into view
            threshold: 0
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-active');
                    // Stop observing once animated to keep the state
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for reduced motion or no intersection observer
        fadeElements.forEach(el => {
            el.classList.add('is-active');
        });
    }

    // 3. Header Scroll Effect (Optional: add a slight shadow or border on scroll)
    const header = document.querySelector('.js-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
            } else {
                header.style.boxShadow = 'none';
            }
        }, { passive: true });
    }
});
