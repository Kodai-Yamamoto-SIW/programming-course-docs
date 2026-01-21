// ハンバーガーメニュー
const btn = document.querySelector('#menuber');
const nav = document.querySelector('#ham');

// メニューボタンをクリックしてハンバーガーメニューの表示を切り替え
btn.addEventListener('click', function () {
    nav.classList.toggle("open")
});
/* ----------------------------------------------- */

// ドロップダウンメニュー
const midashi = document.querySelector('.midashi');
const drop = document.querySelector('.drop')

// カーソルを被せたらドロップダウンメニューを表示
midashi.addEventListener('mouseover', function () {
    drop.classList.add("drop-hyouji");
});
// カーソルが離れたらドロップダウンメニューを隠す
midashi.addEventListener('mouseout', function () {
    drop.classList.remove("drop-hyouji");
});
/* ----------------------------------------------- */

// モーダルウィンドウ
const modal = document.querySelector(".js-modal");
const open = document.querySelector(".js-modal-open");
const close = document.querySelector(".js-modal-close");
const nakami = document.querySelector(".js-modal-container");
const content = document.querySelector(".modal-content");

// ボタンを押したらモーダルウィンドウを表示
open.addEventListener('click', function () {
    content.style.display = 'flex';
    modal.classList.add("modal");
    nakami.classList.add("modal-container-open");
    content = classList.add("modal-content-open");
})

// 「閉じる」を押したらモーダルウィンドウを閉じる
close.addEventListener('click', function () {
    content.style.display = 'none';
    modal.classList.remove("modal");
    nakami.classList.remove("modal-container-open");
    content = classList.remove("modal-content-open");
})
/* ----------------------------------------------- */