//ドロップダウンメニューコード
let menus = document.querySelectorAll(".menu-h");

for (let menu of menus) {
  let chara = menu.querySelector(".menu-c");
  let menuc = menu.querySelector(".menu-chara");
  chara.addEventListener("click", function () {
    if (menuc.classList.contains("open")) {
      menuc.classList.remove("open");
    } else {
      menuc.classList.add("open");
    }
  });
}


let leftmenu = document.querySelector(".leftmenu");
let drower = document.querySelector(".drowermenu");
let end = document.querySelector(".end");

// ドロワーメニュークリックイベント
leftmenu.addEventListener("click", function () {
  if (drower.classList.contains("open")) {
    drower.classList.remove("open");
  }
  else {
    drower.classList.add("open");
  }
});
end.addEventListener("click", function () {
  drower.classList.remove("open");
});

//要素を取得
const modal = document.querySelector('.js-modal'),
  open = document.querySelector('.js-modal-open'),
  close = document.querySelector('.js-modal-close');

//「開くボタン」をクリックしてモーダルを開く
function modalOpen() {
  modal.classList.add('is-active');
}
open.addEventListener('click', modalOpen);

//「閉じるボタン」をクリックしてモーダルを閉じる
function modalClose() {
  modal.classList.remove('is-active');
}
close.addEventListener('click', modalClose);

//「モーダルの外側」をクリックしてモーダルを閉じる
function modalOut(e) {
  if (e.target == modal) {
    modal.classList.remove('is-active');
  }
}
addEventListener('click', modalOut);


//画像切り替えコードと文字表示
window.addEventListener('DOMContentLoaded', () => {
  const imgSwitcher = document.getElementById('itemmap');

  if (imgSwitcher) {
    const mainImg = document.querySelector('.item-big img');
    const thumbBtns = document.querySelectorAll('.ITEM');
    // １番目のサムネイル画像をメイン画像に適用し、.is_activeクラスを付与
    mainImg.src = thumbBtns[0].querySelector('img').src;
    mainImg.alt = thumbBtns[0].querySelector('img').alt;
    thumbBtns[0].classList.add('is_active');
    // サムネイル画像がフォーカスされたときの処理
    thumbBtns.forEach(thumbBtn => {
      thumbBtn.addEventListener('focus', switchImage);
    });
    function switchImage() {
      const img = this.querySelector('img');
      mainImg.style.transition = 'opacity .3s ease-out';
      mainImg.style.opacity = 0;
      setTimeout(() => {
        mainImg.src = img.src;
        mainImg.alt = img.alt;
        mainImg.style.opacity = 1;
      }, 300);
      thumbBtns.forEach(thumbBtn => thumbBtn.classList.remove('is_active'));
      this.classList.add('is_active');
    }
  }
});

function displayItem(imageSrc, text) {
  // 画像を表示
  document.getElementById('picksup').src = imageSrc;
  // テキストを表示
  document.getElementById('text').innerText = text;
}


//スライダーコード    要素取得
var slide = document.getElementById('slider');
var prev = document.getElementById('prev');
var next = document.getElementById('next');

// クリックイベント　スライダー

next.addEventListener('click', nextClick);
prev.addEventListener('click', prevClick);

//右矢印部分

function nextClick() {
  if (slide.classList.contains('slider1') === true) {
    slide.classList.remove('slider1');
    slide.classList.add('slider2');
  } else if (slide.classList.contains('slider2') === true) {
    slide.classList.remove('slider2');
    slide.classList.add('slider3');
  } else if (slide.classList.contains('slider3') === true) {
    slide.classList.remove('slider3');
    slide.classList.add('slider4');
  } else {
    slide.classList.remove('slider4');
    slide.classList.add('slider1');
  }
};

//左矢印部分

function prevClick() {
  if (slide.classList.contains('slider1') === true) {
    slide.classList.remove('slider1');
    slide.classList.add('slider4');
  } else if (slide.classList.contains('slider2') === true) {
    slide.classList.remove('slider2');
    slide.classList.add('slider1');
  } else if (slide.classList.contains('slider3') === true) {
    slide.classList.remove('slider3');
    slide.classList.add('slider2');
  } else {
    slide.classList.remove('slider4');
    slide.classList.add('slider3');
  }
};
// 自動スライド
var count = 0;

setInterval(() => {
  if (count > 5) {
    count = 0;
    nextClick();
  }
  count++;
  console.log(count);
}, 1000);