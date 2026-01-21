document.addEventListener("DOMContentLoaded", () => {
  // ===== ハンバーガーメニュー（ドロワー） =====
  const hamBtn = document.querySelector(".ham-btn");
  const drawer = document.querySelector(".drawer");
  const overlay = document.querySelector(".drawer-overlay");

  const openDrawer = () => {
    document.body.classList.add("is-drawer-open");
    if (hamBtn) {
      hamBtn.classList.add("is-open");
      hamBtn.setAttribute("aria-expanded", "true");
    }
    if (drawer) drawer.setAttribute("aria-hidden", "false");
  };

  const closeDrawer = () => {
    document.body.classList.remove("is-drawer-open");
    if (hamBtn) {
      hamBtn.classList.remove("is-open");
      hamBtn.setAttribute("aria-expanded", "false");
    }
    if (drawer) drawer.setAttribute("aria-hidden", "true");
  };

  const toggleDrawer = () => {
    const isOpen = document.body.classList.contains("is-drawer-open");
    isOpen ? closeDrawer() : openDrawer();
  };

  // 要素が揃っていればドロワーとして動かす
  if (hamBtn && drawer && overlay) {
    hamBtn.addEventListener("click", toggleDrawer);

    // 黒い幕クリックで閉じる
    overlay.addEventListener("click", closeDrawer);

    // メニュー内リンク押下で閉じる
    drawer.addEventListener("click", (e) => {
      if (e.target && e.target.closest("a")) closeDrawer();
    });

    // Escで閉じる
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawer();
    });
  } else if (hamBtn) {
    // 万一ドロワーが無い時はアイコンだけ切替（保険）
    hamBtn.addEventListener("click", () => {
      hamBtn.classList.toggle("is-open");
      hamBtn.setAttribute(
        "aria-expanded",
        hamBtn.classList.contains("is-open") ? "true" : "false"
      );
    });
  }

  // ===== ヒーロー =====
  heroInit();
  window.addEventListener("resize", heroResize);
});

let heroViewport, heroTrack, heroDots, heroSlidesAll;
let heroTimer = null;

let heroIndex = 1; // 0=最後クローン, 1=本物1枚目
let heroCount = 0; // 本物の枚数
let heroW = 0;     // 1枚の幅(px)
let heroAnimating = false; // ★アニメ中ロック

function heroInit() {
  heroViewport = document.querySelector(".hero-viewport");
  heroTrack = document.querySelector(".hero-track");
  heroDots = document.querySelectorAll(".hero-dot");

  if (!heroViewport || !heroTrack || heroDots.length === 0) return;

  const originals = Array.from(heroTrack.querySelectorAll(".hero-image")).filter(
    (img) => img.dataset.clone !== "true"
  );

  heroCount = originals.length;
  if (heroCount <= 1) return;

  // クローン未作成なら作る（先頭に最後クローン、末尾に最初クローン）
  if (!heroTrack.querySelector(".hero-image[data-clone='true']")) {
    const firstClone = originals[0].cloneNode(true);
    firstClone.dataset.clone = "true";

    const lastClone = originals[heroCount - 1].cloneNode(true);
    lastClone.dataset.clone = "true";

    heroTrack.appendChild(firstClone);
    heroTrack.insertBefore(lastClone, heroTrack.firstChild);
  }

  heroSlidesAll = Array.from(heroTrack.querySelectorAll(".hero-image"));

  // サイズ確定 → 初期位置へ
  heroResize();
  heroMoveTo(1, false);

  // ★つなぎ目補正
  heroTrack.addEventListener("transitionend", (e) => {
    if (e.target !== heroTrack) return;
    if (e.propertyName !== "transform") return;

    heroAnimating = false;

    if (heroIndex === heroCount + 1) heroMoveTo(1, false); // 最後→最初へ瞬間移動
    if (heroIndex === 0) heroMoveTo(heroCount, false);     // 最初前→最後へ瞬間移動
  });

  // ドット
  heroDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      if (heroAnimating) return;

      const real = Number(dot.dataset.hero) - 1; // 0〜
      heroMoveTo(real + 1, true);
      heroResetTimer();
    });
  });

  // 矢印
  const prevBtn = document.querySelector(".hero-prev");
  const nextBtn = document.querySelector(".hero-next");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (heroAnimating) return;

      heroMoveTo(heroIndex - 1, true);
      heroResetTimer();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (heroAnimating) return;

      heroMoveTo(heroIndex + 1, true);
      heroResetTimer();
    });
  }

  // 自動（5秒ごと）
  heroStartTimer(5000);
}

function heroResize() {
  if (!heroViewport || !heroTrack || !heroSlidesAll) return;

  heroW = heroViewport.clientWidth;
  if (heroW === 0) return;
  heroTrack.style.width = heroSlidesAll.length * heroW + "px";
  heroSlidesAll.forEach((slide) => {
    slide.style.width = heroW + "px";
    slide.style.flex = "0 0 " + heroW + "px";
  });

  heroMoveTo(heroIndex, false);
}

function heroMoveTo(i, animate) {
  if (!heroTrack || heroW === 0) return;

  const max = heroCount + 1;
  if (i < 0) i = 0;
  if (i > max) i = max;

  heroTrack.style.transition = animate ? "transform .8s ease-in-out" : "none";
  heroTrack.style.transform = "translateX(" + -heroW * i + "px)";

  if (animate) {
    heroAnimating = true;
  } else {
    void heroTrack.offsetHeight;
    heroAnimating = false;
  }

  // dot更新
  let real = i - 1;
  if (real < 0) real = heroCount - 1;
  if (real >= heroCount) real = 0;

  heroDots.forEach((d, idx) => d.classList.toggle("is-active", idx === real));

  heroIndex = i;
}

function heroNext() {
  // ★アニメ中は進めない（暴走防止）
  if (heroAnimating) return;
  heroMoveTo(heroIndex + 1, true);
}

function heroStartTimer(ms) {
  clearInterval(heroTimer);
  heroTimer = setInterval(heroNext, ms);
}

function heroResetTimer() {
  heroStartTimer(5000);
}