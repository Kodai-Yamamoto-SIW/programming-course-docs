// スライダーの動作
const sliderContainer = document.querySelector('.slides');
const images = [
   '/img/athletic-shoes_purple.png',
   '/img/sneakers-blue.png',
   '/img/sneakers_01_red.png',
   '/img/sun-k-kutsu-no-irasuto.png',
];
images.forEach(image => {
   const img = document.createElement('img');
   img.src = image;
   img.alt = 'かっこいいくつ！！！！！！';
   img.classList.add('slide-img');
   sliderContainer.appendChild(img);
});
let currentIndex = 0;
function showSlide(index) {
   const slideWidth = sliderContainer.clientWidth;
   sliderContainer.style.transform = `translateX(-${index * slideWidth}px)`;
}
document.getElementById('left').addEventListener('click', () => {
   currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
   showSlide(currentIndex);
});
document.getElementById('right').addEventListener('click', () => {
   currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
   showSlide(currentIndex);
});
// menu
let menus = document.querySelectorAll(".menu");
for (let menu of menus) {
    let title = menu.querySelector(".menu-title");
    let menuB = menu.querySelector(".menu-b");

    menu.addEventListener("mouseenter", function() {
        menuB.classList.add("open");
    });

    menu.addEventListener("mouseleave", function() {
        menuB.classList.remove("open");
    });
}
// モーダルウィンドウ
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalText = document.getElementById('modal-text');
const closeModal = document.getElementById('close-modal');
document.querySelectorAll('.slide-img').forEach(img => {
   img.addEventListener('click', () => {
       modal.style.display = 'flex';
       modalImg.src = img.src;
       modalText.textContent = img.alt;
   });
});
closeModal.addEventListener('click', () => {
   modal.style.display = 'none';
});
window.addEventListener('click', (e) => {
   if (e.target === modal) {
       modal.style.display = 'none';
   }
});