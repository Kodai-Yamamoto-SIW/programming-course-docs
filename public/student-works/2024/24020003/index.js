
window.onload = function () {
    var nav = document.getElementById('nav-wrapper');
    var hamburger = document.getElementById('js-hamburger');
    var blackBg = document.getElementById('js-black-bg');

    hamburger.addEventListener('click', function () {
        nav.classList.toggle('open');
    });
    blackBg.addEventListener('click', function () {
        nav.classList.remove('open');
    });
};

// ドロワーメニューを開閉するボタンを取得
let hamButton = document.querySelector(".gnavi__list");
 
// ドロワーのコンテナを取得
let hamC = document.querySelector(".gnavi__list");
 
// ドロワーメニューを開閉するボタンをクリックしたとき
hamButton.addEventListener("click", function () {
    // open状態なら
    if (hamC.classList.contains("open")) {
        // open状態を解除
        hamC.classList.remove("open");
    }
    // open状態じゃなければ
    else {
        // open状態にする
        hamC.classList.add("open");
    }
});
 

 

// modal
let openModal = document.querySelector(".openModal");
let modalArea = document.querySelector(".modalArea");
let closeModal = document.querySelector(".closeModal");
let modalBg = document.querySelector(".modalBg");

openModal.addEventListener("click", function () {
    modalArea.style.display = "block";
});

closeModal.addEventListener("click", function () {
    modalArea.style.display = "none";
});

modalBg.addEventListener("click", function () {
    modalArea.style.display = "none";
});
