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

// topに戻るボタンーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// smoothscroll.js読み込み
// https://github.com/iamdustan/smoothscroll
 
// セレクタ名（.pagetop）に一致する要素を取得
const pagetop_btn = document.querySelector(".pagetop");
 
// .pagetopをクリックしたら
pagetop_btn.addEventListener("click", scroll_top);
 
// ページ上部へスムーズに移動
function scroll_top() {
  window.scroll({ top: 0, behavior: "smooth" });
}
 
// スクロールされたら表示
window.addEventListener("scroll", scroll_event);
function scroll_event() {
  if (window.pageYOffset > 100) {
    pagetop_btn.style.opacity = "1";
  } else if (window.pageYOffset < 100) {
    pagetop_btn.style.opacity = "0";
  }
}