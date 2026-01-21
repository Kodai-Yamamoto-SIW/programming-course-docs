
// 各ヘッダーメニュー全体（タイトル + アイテム）を取得
let menulists = document.querySelectorAll(".menulist");

// 全てのヘッダーメニューに対して
for (let menulist of menulists) {
    // タイトル部分取得
    let title = menulist.querySelector(".title");

    // アイテムの中身を取得
    let menuB = menulist.querySelector(".menu-b");

    // メニュー領域にカーソル乗せたとき
    menulist.addEventListener("mouseenter", function () {
        // open状態にする
        menuB.classList.add("open");
    });

    // メニュー領域からカーソルを外したとき
    menulist.addEventListener("mouseleave", function () {
        // open状態を解除
        menuB.classList.remove("open");
    });
}

$(function(){
    $('.btn-gnavi').on('click',function(){
      var rightVal = 0;
      if($(this).hasClass('hb-open')){
        rightVal = -300;
        $(this).removeClass('hb-open');
      }else{
        $(this).addClass('hb-open');
      }
  
      $('#global-navi').stop().animate({
        right: rightVal
      }, 200);
    });
  });

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

