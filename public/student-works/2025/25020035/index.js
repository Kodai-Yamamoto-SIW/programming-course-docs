// index.js
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".oya-btn");
  const menu = document.getElementById("hum-menu");

  if (!btn || !menu) return;

  // アクセシビリティ用（なくても動くけど、あると◎）
  btn.setAttribute("aria-controls", "hum-menu");
  btn.setAttribute("aria-expanded", "false");

  // 開閉
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // 外クリック判定に引っかからないようにする
    menu.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", menu.classList.contains("is-open") ? "true" : "false");
  });

  // メニュー内クリックは閉じない（リンクは押したら閉じる）
  menu.addEventListener("click", (e) => {
    // aタグを押したら閉じる
    if (e.target.closest("a")) {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }
  });

  // メニュー外をクリックしたら閉じる
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }
  });

  // ESCキーで閉じる（任意だけど便利）
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
});


// ===== ファーストビュー切り替え（jQuery）=====
$(function () {
  const images = [
    "url(https://cloudfront-eu-central-1.images.arcpublishing.com/thenational/OUUQ5VQLK5D4VF2KSDS66JX3DU.jpg)",
    "url(https://images.www.kateigaho.com/media/article/23380/images/main_6b11a94d4700ffc02525fa59691b14444af34019.jpg)",
    "url(https://hips.hearstapps.com/hmg-prod/images/000-1637656452.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*)",
    "url(https://regency-trvl.com/wordpress/wp-content/uploads/2020/06/chiva-som_-_patchouli_suite_bedroom.jpg)"
  ];

  const $bg = $(".bg-slider");
  if ($bg.length === 0) return;

  let current = 0;
  $bg.css("background-image", images[current]);

  setInterval(function () {
    $bg.fadeOut(800, function () {
      current = (current + 1) % images.length;
      $bg.css("background-image", images[current]).fadeIn(800);
    });
  }, 6000);
});