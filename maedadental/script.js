document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       Header Scroll Effect
       ========================================================================== */
    const header = document.querySelector('.js-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    });

    /* ==========================================================================
       Hamburger Menu Toggle
       ========================================================================== */
    const hamburgerBtn = document.querySelector('.js-hamburger');
    const navMenu = document.querySelector('.js-nav');
    
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            
            hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
            hamburgerBtn.classList.toggle('is-open');
            navMenu.classList.toggle('is-open');
        });
    }

    /* ==========================================================================
       Smooth Scroll & Menu Auto-close
       ========================================================================== */
    const navLinks = document.querySelectorAll('.js-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close menu if open
            if (navMenu && navMenu.classList.contains('is-open')) {
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                hamburgerBtn.classList.remove('is-open');
                navMenu.classList.remove('is-open');
            }

            // Smooth scroll
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Adjust offset for fixed header
                    const headerHeight = document.querySelector('.js-header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* ==========================================================================
       Fade-in Animation with IntersectionObserver
       ========================================================================== */
    // prefers-reduced-motion を尊重する
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const fadeElements = document.querySelectorAll('.js-fade-in');
        
        const fadeObserverOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px', // 少しスクロールしてから発火
            threshold: 0
        };

        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // 一度表示されたら監視を解除（フェードインは1回のみ）
                    observer.unobserve(entry.target);
                }
            });
        }, fadeObserverOptions);

        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
    } else {
        // アニメーションをオフにする設定の場合、最初からすべて表示する
        const fadeElements = document.querySelectorAll('.js-fade-in');
        fadeElements.forEach(element => {
            element.classList.add('is-visible');
        });
    }

});
