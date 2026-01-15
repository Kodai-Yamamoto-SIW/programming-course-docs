let swiper = new Swiper(".swiper", {
    loop: true,
    autoplay: {
        delay: 10000,
    },

    pagination: {
        el: '.swiper-pagination',
    },
});


let hamBtnYouso = document.querySelector(".ham_btn");
let drawerYouso = document.querySelector("#js-gnav-list");

hamBtnYouso.addEventListener('click', function() {
  drawerYouso.classList.toggle('open');
});