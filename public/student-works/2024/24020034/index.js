let button = document.querySelector(".button");/*htmlからクラスを持ってくる */
let humNav = document.querySelector(".hum-nav");/*htmlからクラスを持ってくる */

button.addEventListener("mouseenter",function () {/*mouseをenterした時 */
    let mouse = document.querySelector(".mouse");/*htmlからクラスを持ってくる */
    mouse.classList.add("open");/*変数mouseにopenを付ける */
})

humNav.addEventListener("mouseleave",function () {/*mouseを外した時 */
    let mouse = document.querySelector(".mouse");/*htmlからクラスを持ってくる */
    mouse.classList.remove("open");/*変数mouseからopenを外す */
})

let menu = document.querySelector(".menu");
let title1 = document.querySelector(".title1");
let title2 = document.querySelector(".title2");
let title3 = document.querySelector(".title3");
let menuB1 = document.querySelector(".menu-b1");
let menuB2 = document.querySelector(".menu-b2");
let menuB3 = document.querySelector(".menu-b3");

title1.addEventListener("mouseenter", function() {
    menuB1.classList.add("open");
});
title2.addEventListener("mouseenter", function() {
    menuB2.classList.add("open");
});
title3.addEventListener("mouseenter", function() {
    menuB3.classList.add("open");
});

menuB1.addEventListener("mouseleave", function() {
    menuB1.classList.remove("open");
});
menuB2.addEventListener("mouseleave", function() {
    menuB2.classList.remove("open");
});
menuB3.addEventListener("mouseleave", function() {
    menuB3.classList.remove("open");
});

//スライダー　ふうきくんとりゅうまくんに教えてもらいました❤️
const left =document.getElementById("left1");
const right =document.getElementById("right1");
const hero =document.querySelector(".hero");
const image =document.querySelectorAll(".image");
let index = 0

function updatebtn(){
    left.classList.remove("hidden");
    right.classList.remove(".hidden");

    if (index === 0) {
        left.classList.add(".hidden");
    }

    if (index === image.length - 1) {
        right.classList.add(".hidden");
    }
}

function moveBoxes() {
    const boxWidth = image[0].getBoundingClientRect().width;
    hero.style.transform = `translateX(${-1 * boxWidth *index}px)`;
}

updatebtn();

right.addEventListener("click", () => {
    index = (index + 1) % image.length;
    updatebtn();
    moveBoxes();
});

left.addEventListener("click", () => {
    index = (index - 1 + image.length) % image.length;
    updatebtn();
    moveBoxes();
});

//モーダルメニュー
