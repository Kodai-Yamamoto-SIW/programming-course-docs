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



//  slick：desktopでは、4つ表示、mobileでは、2つ表示 
$('.aplle-slide').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }
    ]
});