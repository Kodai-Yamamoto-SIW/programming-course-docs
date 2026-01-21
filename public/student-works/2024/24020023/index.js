// -----------------------------------------------------------------------
// ドロワーメニュー
// ドロワーメニューのボタンを取得
let rgButton = document.querySelector(".rg-btn");
// ドロワーのコンテナを取得
let rgb = document.querySelector(".rg-b");
// ドロワーメニューを開閉するボタンをクリックしたとき
rgButton.addEventListener("click", function() {
  if(rgb.classList.contains("open")){
    // open状態を解除
    rgb.classList.remove("open");
  }
  // open状態じゃなければ
  else{
    // open状態にする
    rgb.classList.add("open");
  }
});
// -----------------------------------------------------------------------
// モーダルウィンドウ
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
// -----------------------------------------------------------------------
//要素を取得
const modal2 = document.querySelector('.js-modal2'),
      open2 = document.querySelector('.js-modal-open2'),
      close2 = document.querySelector('.js-modal-close2');

//「開くボタン」をクリックしてモーダルを開く
function modalOpen() {
  modal2.classList.add('is-active');
}
open2.addEventListener('click', modalOpen);

//「閉じるボタン」をクリックしてモーダルを閉じる
function modalClose() {
  modal2.classList.remove('is-active');
}
close2.addEventListener('click', modalClose);

//「モーダルの外側」をクリックしてモーダルを閉じる
function modalOut(e) {
  if (e.target == modal2) {
    modal2.classList.remove('is-active');
  }
}
addEventListener('click', modalOut);