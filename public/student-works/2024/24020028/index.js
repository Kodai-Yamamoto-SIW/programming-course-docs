let menu = document.querySelector(".menu");

// カーソルをのせたら
menu.addEventListener("mouseenter",function(){
        menu.classList.add("open");

});

// カーソルを外したら
menu.addEventListener("mouseleave",function(){
    menu.classList.remove("open");
})



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



// モーダルを取得
let modal = document.getElementById("myModal");

// 閉じるボタン取得
let span = document.getElementsByClassName("close")[0];

// ページが読み込まれたときにモーダルを表示
window.onload = function() {
    modal.style.display = "block"; // モーダルを表示
}

// 閉じるボタンがクリックされたときにモーダルを非表示
span.onclick = function() {
    modal.style.display = "none";
}

// モーダルの外側をクリックされたときにモーダルを非表示
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}