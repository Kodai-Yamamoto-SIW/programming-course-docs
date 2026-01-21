// 各ヘッダーメニュー全体（タイトル + アイテム）を取得
let menus = document.querySelectorAll(".up");

// 全てのヘッダーメニューに対して
for (let menu of menus) {
    // タイトル部分取得
    let title = menu.querySelector(".title");

    // アイテムの中身を取得
    let menuB = menu.querySelector(".up-b");

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

// ドロワーの背景を取得
let back = document.querySelector(".back");

// ドロワーの背景をクリックしたとき
back.addEventListener("click", function () {
    // open状態を解除
    hamC.classList.remove("open");
});
