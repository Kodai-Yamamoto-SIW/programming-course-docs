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