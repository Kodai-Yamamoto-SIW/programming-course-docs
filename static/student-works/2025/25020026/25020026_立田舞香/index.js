// ハンバーガーボタンの要素を取得
let hamBtnYoso = document.querySelector('.ham-btn');
// ドロワーの要素を取得
let drawerYoso = document.querySelector('.drawer');

let overlayYoso = document.querySelector('.overlay');

let hamIconYoso = document.querySelector('.ham-icon');


// ハンバーガーボタンがクリックされたときの処理
hamBtnYoso.addEventListener('click', () => {
  // ドロワー要素に対して、open クラスの付け外しを行う
  drawerYoso.classList.toggle('open');
  overlayYoso.classList.toggle('open');
  hamIconYoso.classList.toggle('open');
});

overlayYoso.addEventListener('click', () => {
    drawerYoso.classList.remove('open');
    overlayYoso.classList.remove('open'); // ハンバーガーアイコン部分も open クラスを外す
    hamIconYoso.classList.remove('open');
  });
