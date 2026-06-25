document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Hamburger Menu Toggle
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const headerNav = document.getElementById('header-nav');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (hamburger && headerNav) {
        // Toggle menu on click
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            headerNav.classList.toggle('is-active');
            
            // Prevent body scroll when menu is open
            if (headerNav.classList.contains('is-active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('is-active');
                headerNav.classList.remove('is-active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // Smooth Scroll for anchor links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // FAQ Accordion
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-q');
        if (question) {
            question.addEventListener('click', () => {
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('is-open')) {
                        otherItem.classList.remove('is-open');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('is-open');
            });
        }
    });
});
