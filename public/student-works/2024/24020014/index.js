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

const modal = document.querySelector('.js-modal'); // layer要素に付与したjs-modalクラスを取得
const modalButton = document.querySelector('.js-modal-button'); // button要素に付与したjs-modal-buttonクラスを取得し、変数に格納

// モーダルボタンをクリックしたとき
modalButton.addEventListener('click', () => {
  modal.classList.add('is-open');
});

// 開閉するときのボタンを取得
const modal1 = document.querySelector('.js-modal');
const modalButton1 = document.querySelector('.js-modal-button');

const modalClose = document.querySelector('.js-close-button');  // バツボタンのjs-close-buttonを取得

modalButton.addEventListener('click', () => {
  modal.classList.add('is-open');
});

modalClose.addEventListener('click', () => { // バツボタンをクリックしたときのイベントを登録
  modal.classList.remove('is-open'); 
});