// 「querySelector()」・・・JavaScriptから任意のHTML要素を検出・取得することができる
// ドロワーメニューを開閉するボタンを取得する
let hamButton = document.querySelector(".ham-button");

// ドロワーメニューを取得する
let hamC = document.querySelector(".ham-c");

// ドロワーメニューのボタンをクリックしたとき
hamButton.addEventListener("click", function () {
    // もし開いた状態なら・・・
    if (hamC.classList.contains("open")) {
        // 開いた状態を戻す
        hamC.classList.remove("open");
    }

    // 開いた状態じゃないのなら・・・
    else {
        // 開いた状態にする
        hamC.classList.add("open");
    }
});


// ----------------------------------------------------


//ドロップダウンメニューを取得する 
let menus = document.querySelectorAll(".menu");

for (let menu of menus) {
    // タイトルを取得する
    let title = menu.querySelector(".title");

    // メニュー部分を取得する
    let menuB = menu.querySelector(".menu-b");

    // ドロップダウンメニューにマウスカーソルを乗せたときに開く
    menu.addEventListener("mouseenter", function () {
        menuB.classList.add("open");
    });

    // ドロップダウンメニューからマウスカーソルを外したときに閉じる
    menu.addEventListener("mouseleave", function () {
        menuB.classList.remove("open");
    });
}