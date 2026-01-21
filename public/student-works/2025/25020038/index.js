/* slide
---------------------- */

let swiper = new Swiper('.swiper', {
  loop: true,
  autoplay: {
    delay: 3000,
  },
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  pagination: {
    el: '.swiper-pagination',
  },
});