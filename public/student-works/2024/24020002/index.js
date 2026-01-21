

// ドロップダウンメニューーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 各ヘッダーメニュー全体（タイトル + アイテム）を取得
let headerMenus = document.querySelectorAll(".header-menu");

// 全てのヘッダーメニューに対して
for (let headerMenu of headerMenus) {
    // タイトル部分取得
    let headerMenuTitle = headerMenu.querySelector(".header-menu-title");

    // アイテムコンテナ部分取得
    let headerMenuItemContainer = headerMenu.querySelector(".header-menu-item-container");

    // タイトル部分をクリックしたとき
    headerMenuTitle.addEventListener("click", function () {
        if (headerMenuItemContainer.classList.contains("open")) {
            headerMenuItemContainer.classList.remove("open");
        } else {
            headerMenuItemContainer.classList.add("open");
        }
    });
}

// モーダルウィンドウーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// モーダル要素を取得
var modal = document.getElementById("myModal");
// モーダルを開くボタンを取得
var btn = document.getElementById("openModal");
// モーダルを閉じるアイコン（×）を取得
var span = document.getElementById("closeModal");

// ボタンがクリックされた時にモーダルを表示
btn.onclick = function() {
    modal.style.display = "block"; // モーダルのdisplayスタイルを"block"にして表示
}

// ×（クローズアイコン）がクリックされた時にモーダルを非表示
span.onclick = function() {
    modal.style.display = "none"; // モーダルのdisplayスタイルを"none"にして非表示
}

// モーダルの外側がクリックされた時にモーダルを非表示
window.onclick = function(event) {
    // クリックされた箇所がモーダル自体（外側）であれば
    if (event.target == modal) {
        modal.style.display = "none"; // モーダルのdisplayスタイルを"none"にして非表示
    }
}


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