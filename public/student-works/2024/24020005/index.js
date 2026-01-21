// 各ヘッダーメニュー全体（タイトル + アイテム）を取得
let menus = document.querySelectorAll(".menu");

// 全てのヘッダーメニューに対して
for (let menu of menus) {
    // タイトル部分取得
    let title = menu.querySelector(".title");

    // アイテムの中身を取得
    let menuB = menu.querySelector(".menu-b");

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


// ページがロードされたときに実行される処理
window.onload = function() {
    // 画像スライダーのサイズ設定を実行
    sliderImgSizeSet();
    // 3秒ごとにスライダーのアイテムを変更する
    setInterval(sliderChangeTwo , 3000);
}

// スライダーの画像サイズを設定する関数
function sliderImgSizeSet() {
    // ".cont-two"の幅を取得
    let contWidth = document.querySelector(".cont-two").clientWidth;
    // ".items-two"クラスの要素（スライダーアイテム）を全て取得
    let items = document.querySelectorAll(".items-two");
    // ".wrap-two"（スライダー全体を包んでいるラッパー）を取得
    let wrap = document.querySelector(".wrap-two");

    // wrapの幅を、アイテム数に応じて設定
    wrap.style.width = contWidth * items.length + "px";
}

// スライダーのアイテムを変更する関数
function sliderChangeTwo() {
    // ".cont-two"の幅を取得
    let contWidth = document.querySelector(".cont-two").clientWidth;
    // ".wrap-two"を取得（スライダーアイテムをまとめて表示するラッパー）
    let wrap = document.querySelector(".wrap-two");
    // ".items-two"クラスの要素（スライダーアイテム）を全て取得
    let items = document.querySelectorAll(".items-two");
    // 現在表示されているアイテムを取得（"show"クラスがついているアイテム）
    let itemShow = document.querySelector(".items-two.show");
    // 表示されているアイテムの番号を取得
    let itemNumber = Number(itemShow.getAttribute("data-item-two-number"));

    // 現在表示されているアイテムから"show"クラスを削除
    itemShow.classList.remove("show");
    
    // アイテムが最後の場合は最初に戻る
    if (itemNumber === (items.length - 1)) {
        // 最初のアイテムに"show"クラスを追加
        items[0].classList.add("show");
        // wrapの位置を最初のアイテムに合わせて変更
        wrap.style.right = contWidth * 0 + "px";
    } else {
        // 次のアイテムに"show"クラスを追加
        items[itemNumber + 1].classList.add("show");
        // wrapの位置を次のアイテムに合わせて変更
        wrap.style.right = contWidth * (itemNumber + 1) + "px";
    }
}

