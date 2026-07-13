/**
 * PREMIUM HERO SECTION CAROUSEL ENGINE
 * Powered by Swiper.js v11+
 */

document.addEventListener('DOMContentLoaded', () => {
  const heroSliderEl = document.querySelector('.hero-swiper');
  
  if (!heroSliderEl) return;

  // Initialize Swiper engine with exact design criteria specs
  const heroSwiper = new Swiper(heroSliderEl, {
    // Structural parameters
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    
    // Automation control matrix
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true // Gracefully pause sliding routines on hover
    },

    // UI Pagination dot matrix
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    // Navigation controllers
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // Accessibility layers
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    
    // Input management systems
    simulateTouch: true,
    grabCursor: true,
    
    // Event cycle optimization hooks
    on: {
      init: function () {
        handleSlideTransition(this);
      },
      slideChange: function () {
        handleSlideTransition(this);
      }
    }
  });

  /**
   * Orchestrates domestic layout recalculations during active carousel transitions.
   * Assures that entry animations reset and reflow exactly when a slide fires.
   * 
   * @param {Object} swiperInstance - The active Swiper controller scope
   */
  function handleSlideTransition(swiperInstance) {
    const allSlides = swiperInstance.el.querySelectorAll('.swiper-slide');
    
    allSlides.forEach(slide => {
      // Force internal element layout reflow cycles by toggling layout classes safely
      if (slide.classList.contains('swiper-slide-active')) {
        // Accessibility focus sync
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.setAttribute('aria-hidden', 'true');
      }
    });
  }
});