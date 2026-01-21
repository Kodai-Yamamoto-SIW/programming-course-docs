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

// ham
let hamButton = document.querySelector(".ham-button");
let hamC = document.querySelector(".ham-c");

hamButton.addEventListener("click", function () {
    if (hamC.classList.contains("open")) {
        hamC.classList.remove("open");
    }
    else {
        hamC.classList.add("open");
    }
});

// slider
const left = document.getElementById("left")
const right = document.getElementById("right")
const container = document.querySelector(".box-container")
const boxes = document.querySelectorAll(".box")
let index = 0;

function updatebtn() {
    left.classList.remove("hidden");
    right.classList.remove(".hidden");

    if (index === 0) {
        left.classList.add(".hidden");
    }

    if (index === boxes.length - 1) {
        right.classList.add(".hidden");
    }
}

function moveBoxes() {
    const boxWidth = boxes[0].getBoundingClientRect().width;
    container.style.transform = `translateX(${-1 * boxWidth *index}px)`;
}

updatebtn();

right.addEventListener("click", () => {
    index = (index + 1) % boxes.length;
    updatebtn();
    moveBoxes();
});

left.addEventListener("click", () => {
    index = (index - 1 + boxes.length) % boxes.length;
    updatebtn();
    moveBoxes();
});