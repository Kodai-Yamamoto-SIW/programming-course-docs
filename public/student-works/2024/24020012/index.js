document.getElementById('demo').addEventListener('click', function () {
    var right_content = document.querySelector('.au');
    right_content.classList.toggle('open');
})

let menus = document.querySelectorAll(".menu");

for (let menu of menus) {

    let title = menu.querySelector(".title");

    let menuB = menu.querySelector(".menu-b");

    menu.addEventListener("mouseenter", function () {
        menuB.classList.add("open");
    });

    menu.addEventListener("mouseleave", function () {
        menuB.classList.remove("open");
    });
}


const modal = document.querySelector('.js-modal'),
    open = document.querySelector('.js-modal-open'),
    close = document.querySelector('.js-modal-close');

function modalOpen() {
    modal.classList.add('is-active');
}
open.addEventListener('click', modalOpen);

function modalClose() {
    modal.classList.remove('is-active');
}
close.addEventListener('click', modalClose);

// モーダル以外を押したときの関数
function modalOut(e) {
    if (e.target == modal) {
        modal.classList.remove('is-active');
    }
}
addEventListener('click', modalOut);


const left = document.getElementById("left")
const right = document.getElementById("right")
const container = document.querySelector(".slider-container")
const slideres = document.querySelectorAll(".slider")
let index = 0;

function updatebtn() {
    left.classList.remove("hidden");
    right.classList.remove(".hidden");

    if (index === 0) {
        left.classList.add(".hidden");
    }

    if (index === slideres.length - 1) {
        right.classList.add(".hidden");
    }
}

function moveslideres() {
    const sliderWidth = slideres[0].getBoundingClientRect().width;
    container.style.transform = `translateX(${-1 * sliderWidth * index}px)`;
}

updatebtn();

right.addEventListener("click", () => {
    index = (index + 1) % slideres.length;
    updatebtn();
    moveslideres();
});

left.addEventListener("click", () => {
    index = (index - 1 + slideres.length) % slideres.length;
    updatebtn();
    moveslideres();
});