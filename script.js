/**
 * HOWELL Portfolio LP - Script
 * Minimal and lightweight Vanilla JS interaction.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // 1. Header Navigation Sticky/Scroll State
  // ==========================================================================
  const header = document.querySelector('.site-header');
  
  const handleScroll = () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Run on load and add event listener
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });


  // ==========================================================================
  // 2. Mobile Hamburger Menu Toggle
  // ==========================================================================
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navToggle.classList.toggle('active');
      siteNav.classList.toggle('active');
    });

    // Close menu when a navigation link is clicked
    const navLinks = siteNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('active');
        siteNav.classList.remove('active');
      });
    });
  }


  // ==========================================================================
  // 3. Scroll Fade-in Animation (IntersectionObserver)
  // ==========================================================================
  const fadeElements = document.querySelectorAll('.fade-in-trigger');
  
  if ('IntersectionObserver' in window) {
    const fadeObserverOptions = {
      root: null, // default is viewport
      rootMargin: '0px 0px -8% 0px', // trigger slightly before entering viewport center
      threshold: 0.1 // triggers when 10% of element is visible
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Once animated, stop observing this element
          observer.unobserve(entry.target);
        }
      });
    }, fadeObserverOptions);

    fadeElements.forEach(element => {
      fadeObserver.observe(element);
    });
  } else {
    // Fallback for older browsers: show all elements instantly
    fadeElements.forEach(element => {
      element.classList.add('is-visible');
    });
  }
});
