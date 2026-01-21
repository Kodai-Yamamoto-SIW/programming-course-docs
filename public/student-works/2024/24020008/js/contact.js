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

// modal
document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('.openModal').addEventListener('click', function() {
      document.querySelector('.modalArea').style.display = 'block';
    });
  
    document.querySelector('.closeModal').addEventListener('click', function() {
      document.querySelector('.modalArea').style.display = 'none';
    });
  
    document.querySelector('.modalBg').addEventListener('click', function() {
      document.querySelector('.modalArea').style.display = 'none';
    });
    
    document.getElementById('form-button').addEventListener('click', function() {
      document.querySelector('.modalArea').style.display = 'none';
    });
  });

  let formButton = document.getElementById("form-button");
  let formText = document.querySelector(".form-text")

  formButton.addEventListener("click", function() {
    formText.style.display = "block";

    setTimeout(("click",function() {
        formText.style.display = "none";
    }),1500);
  });



 