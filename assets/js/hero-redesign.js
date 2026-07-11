document.addEventListener('DOMContentLoaded', () => {
  /**
   * Helper function to safely swap data-src to src attributes
   * @param {HTMLImageElement} img 
   */
  const loadImage = (img) => {
    if (!img || !img.dataset.src) return;
    
    // Set the true source path
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
    
    // Clean up UI classes once asset is loaded by the engine
    img.addEventListener('load', () => {
      img.classList.remove('swiper-lazy');
      img.classList.add('swiper-lazy-loaded');
    });
  };

  // Initialize Swiper engine immediately
  const heroSwiper = new Swiper('.hero-swiper', {
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    speed: 1000,

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },

    simulateTouch: true,
    grabCursor: true,
    
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets'
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // Handle lazy loaded images manually for local paths inside slides
    on: {
      init: function () {
        const activeSlide = this.slides[this.activeIndex];
        if (activeSlide) {
          activeSlide.querySelectorAll('.swiper-lazy').forEach(loadImage);
        }
        this.slides.forEach((slide, idx) => {
          if (Math.abs(idx - this.activeIndex) <= 1) {
            slide.querySelectorAll('.swiper-lazy').forEach(loadImage);
          }
        });
      },
      slideChange: function () {
        const activeSlide = this.slides[this.activeIndex];
        if (activeSlide) {
          activeSlide.querySelectorAll('.swiper-lazy').forEach(loadImage);
        }
      }
    }
  });
});