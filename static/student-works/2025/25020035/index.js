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
