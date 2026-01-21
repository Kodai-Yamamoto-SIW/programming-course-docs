// ドロップダウンメニューの要素を取得
let ddMenuYoso = document.querySelector('.dd-menu');

// マウスが乗ったときの処理
ddMenuYoso.addEventListener('mouseenter', function() {
  let submenu = ddMenuYoso.querySelector('.dd-submenu');
  submenu.classList.add('open'); // open クラスを追加して表示
});

// マウスが離れたときの処理
ddMenuYoso.addEventListener('mouseleave', function() {
  let submenu = ddMenuYoso.querySelector('.dd-submenu');
  submenu.classList.remove('open'); // open クラスを削除して非表示
});