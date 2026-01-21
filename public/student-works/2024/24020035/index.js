const slide = document.getElementById('slide');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const indicator = document.getElementById('indicator');
const lists = document.querySelectorAll('.list');
const totalSlides = lists.length;
let count = 0;
let autoPlayInterval;
function updateListBackground() {
  for (let i = 0; i < lists.length; i++) {
    lists[i].style.backgroundColor = i === count % totalSlides ? '#000' : '#fff';
  }
}
function nextClick() {
  slide.classList.remove(`slide${count % totalSlides + 1}`);
  count++;
  slide.classList.add(`slide${count % totalSlides + 1}`);
  updateListBackground();
}
function prevClick() {
  slide.classList.remove(`slide${count % totalSlides + 1}`);
  count--;
  if (count < 0) count = totalSlides - 1;
  slide.classList.add(`slide${count % totalSlides + 1}`);
  updateListBackground();
}
function startAutoPlay() {
  autoPlayInterval = setInterval(nextClick, 3000);
}
function resetAutoPlayInterval() {
  clearInterval(autoPlayInterval);
  startAutoPlay();
}
next.addEventListener('click', () => {
  nextClick();
  resetAutoPlayInterval();
});
prev.addEventListener('click', () => {
  prevClick();
  resetAutoPlayInterval();
});
indicator.addEventListener('click', (event) => {
  if (event.target.classList.contains('list')) {
    const index = Array.from(lists).indexOf(event.target);
    slide.classList.remove(`slide${count % totalSlides + 1}`);
    count = index;
    slide.classList.add(`slide${count % totalSlides + 1}`);
    updateListBackground();
    resetAutoPlayInterval();
  }
});
startAutoPlay();


// ドロワーメニュー
// 各ヘッダーメニュー全体（タイトル + アイテム）を取得
let menus = document.querySelectorAll(".menu");

// 全てのヘッダーメニューに対して
for (let menu of menus) {
  // タイトル部分取得
  let title = menu.querySelector(".title");

  // アイテムコンテナ部分取得
  let menuB = menu.querySelector(".menu-b");

  // メニュー領域にカーソル乗せたとき
  menu.addEventListener("mouseenter", function () {
    menuB.classList.add("open");
  });

  // メニュー領域からカーソルを外したとき
  menu.addEventListener("mouseleave", function () {
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


// モーダルウインドウ
const buttonOpen = document.getElementsByClassName('modalOpen')[0];
const modal = document.getElementsByClassName('modal')[0];
const buttonClose = document.getElementsByClassName('modalClose')[0];
const body = document.getElementsByTagName('body')[0];
// ボタンがクリックされた時
buttonOpen.addEventListener('click', function () {
  modal.style.display = 'block';
  body.classList.add('open');
});


// バツ印がクリックされた時
buttonClose.addEventListener('click', function () {
  modal.style.display = 'none';
  body.classList.remove('open');
});

// モーダルコンテンツ以外がクリックされた時
modal.addEventListener('click', function () {
  modal.style.display = 'none';
  body.classList.remove('open');
});