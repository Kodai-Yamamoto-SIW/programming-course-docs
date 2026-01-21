
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
let hamButton = document.querySelector(".ham-bt");

// ドロワーのコンテナを取得
let hamA = document.querySelector(".ham-a");

// ドロワーメニューを開閉するボタンをクリックしたとき
hamButton.addEventListener("click", function () {
    // open状態なら
    if (hamA.classList.contains("open")) {
        // open状態を解除
        hamA.classList.remove("open");
    }
    // open状態じゃなければ
    else {
        // open状態にする
        hamA.classList.add("open");
    }
});

// ドロワーの背景を取得
let back = document.querySelector(".back");

// ドロワーの背景をクリックしたとき
back.addEventListener("click", function () {
    // open状態を解除
    hamC.classList.remove("open");
});

//処理で必要となるHTMLのエレメントを取得
var $photos = $('.photos'),
    $lis    = $('.photos li');


   //画像リストの情報を取得
    var li_count = $lis.length;
    //画像リストの横幅を取得 画像リストに指定されている左マージン幅を取得 画像リストに指定されている右マージン幅を取得
var li_width = $lis.width() + parseInt($lis.css('margin-left'), 10) + parseInt($lis.css('margin-right'), 10);

//横幅ピッタリ
$photos.css('width', (li_width * li_count) + 'px');

//1.5秒間隔で画像がスライド 画像を横にスライドするアニメーションを定義 画像の位置をリセット 見切れた左端の画像を右端へ移動

setInterval(function () {
    $photos.stop().animate({
        marginLeft: parseInt($photos.css('margin-left'), 10) - li_width + 'px'
    }, function () {
        $photos.css('margin-left', '0px');
        $photos.find('li:first').appendTo($photos);
    });
}, 3000)

const buttonOpen = document.getElementsByClassName('modalOpen')[0];
const modal = document.getElementsByClassName('modal')[0];
const buttonClose = document.getElementsByClassName('modalClose')[0];
const body = document.getElementsByTagName('body')[0];
// ボタンがクリックされた時
buttonOpen.addEventListener('click', function(){
  modal.style.display = 'block';
  body.classList.add('open');
});


// バツ印がクリックされた時
buttonClose.addEventListener('click',function(){
  modal.style.display = 'none';
  body.classList.remove('open');
});

// モーダルコンテンツ以外がクリックされた時
modal.addEventListener('click', function(){ 
    modal.style.display = 'none';
    body.classList.remove('open');
});


