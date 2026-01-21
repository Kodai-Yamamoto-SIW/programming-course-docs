// 各ヘッダーメニュー全体（タイトル + アイテム）を取得
let menus = document.querySelectorAll(".menu");

// 全てのヘッダーメニューに対して
for (let menu of menus) {
    // タイトル部分取得
    let title = menu.querySelector(".title");

    // アイテムコンテナ部分取得
    let menuB = menu.querySelector(".menu-b");

    // メニュー領域にカーソル乗せたとき
    menu.addEventListener("mouseenter", function () {
        menuB.classList.add("open");
    });

    // メニュー領域からカーソルを外したとき
    menu.addEventListener("mouseleave", function () {
        menuB.classList.remove("open");
    });
}

// ドロワーメニューを開閉するボタンを取得
let hamButton = document.querySelector(".ham-button");

// ドロワーのコンテナを取得
let hamC = document.querySelector(".ham-c");

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

// スライダー
// imgの要素を取得
const images = document.querySelectorAll('img');
let number = 0;
 
function changeImage() {
    // activeクラスを消して画像を非表示
  images[number].classList.remove('active');
  number = (number + 1) % images.length;
//   新しい画像にactiveを追加して画像を表示
  images[number].classList.add('active');
}
 
setInterval(changeImage, 4000); 