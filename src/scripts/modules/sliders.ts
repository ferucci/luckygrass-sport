import Swiper from "swiper";
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
// import type { SwiperOptions } from 'swiper/types';

export function sliders(): void {

  // sliders 
  // const _swiper = 
  new Swiper('.hero__swiper', {
    modules: [Autoplay, Pagination, EffectFade],
    direction: 'horizontal',
    loop: true,
    speed: 700,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
  });
  // const _reviewSlider = 
  new Swiper('#reviews', {
    modules: [Autoplay, Navigation],
    direction: 'horizontal',
    loop: true,
    speed: 700,

    // Основные настройки для множественного отображения
    slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: false,
    watchOverflow: true,

    // Для обрезки выходящих за границу
    breakpoints: {
      320: {
        slidesPerView: 1.2,
        spaceBetween: 10
      },
      768: {
        slidesPerView: 2.5,
        spaceBetween: 15
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    },

    autoplay: false,
    navigation: {
      nextEl: '#reviews-next',
      prevEl: '#reviews-prev',
    }
  });
  // const _blogSlider = 
  new Swiper('#blog', {
    modules: [Autoplay, Navigation],
    direction: 'horizontal',
    loop: true,
    speed: 700,

    // Основные настройки для множественного отображения
    slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: false,
    watchOverflow: true,

    // Для обрезки выходящих за границу
    breakpoints: {
      320: {
        slidesPerView: 1.2,
        spaceBetween: 10
      },
      768: {
        slidesPerView: 2.5,
        spaceBetween: 15
      },
      1024: {
        slidesPerView: 3.2,
        spaceBetween: 20
      }
    },

    autoplay: false,
    navigation: {
      nextEl: '#blog-next',
      prevEl: '#blog-prev',
    }
  });

}

