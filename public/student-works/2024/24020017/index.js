// 各ヘッダーメニュー全体（タイトル + アイテム）を取得
let menus = document.querySelectorAll(".menu");
 
// 全てのヘッダーメニューに対して
for (let menu of menus) {
    // タイトル部分取得
    let title = menu.querySelector(".title");
 
    // アイテムの中身を取得
    let menuB = menu.querySelector(".AAA, .BBB, .CCC");
 
    // メニュー領域にカーソル乗せたとき
    menu.addEventListener("mouseenter", function () {
        // open状態にする
        menuB.classList.add("open");
    });
 
    // メニュー領域からカーソルを外したとき
    menu.addEventListener("mouseleave", function () {
        // open状態を解除
        menuB.classList.remove("open");
    });
}
 
// ドロワーメニューを開閉するボタンを取得
let hamButton = document.querySelector(".ham-button");
 
// ドロワーのコンテナを取得
let hamC = document.querySelector(".ham-a");
 
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
 
// ドロワーの背景を取得
let back = document.querySelector(".back");
 
// ドロワーの背景をクリックしたとき
back.addEventListener("click", function () {
    // open状態を解除
    hamC.classList.remove("open");
});

// あめみやmodal
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
  