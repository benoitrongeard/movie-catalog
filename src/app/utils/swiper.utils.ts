import { SwiperOptions } from 'swiper/types';

export class SwiperUtils {
  static swiperParams: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 30,
    freeMode: true,
    scrollbar: {
      dragClass: 'custom-scrollbar-drag',
      draggable: true,
    },
    mousewheel: true,
    injectStyles: [
      `
      .custom-bullet-active {
        background-color: #0284c7;
        opacity: 1;
      }

      .custom-scrollbar-drag {
        background-color: #0284c7;
        height: 100%;
        position: relative;
        border-radius: 10px;
        left: 0px;
        top: 0px;
      }
    `,
    ],
    pagination: {
      clickable: true,
      bulletActiveClass: 'custom-bullet-active',
    },
    observeSlideChildren: true,
    breakpoints: {
      640: {
        slidesPerView: 3,
      },
    },
  };
}
