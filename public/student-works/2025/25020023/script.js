/* ============================
   Swiper（トップスライダー）
============================ */
const swiper = new Swiper(".swiper", {
  loop: false,
  autoplay: { delay: 3000 },
  speed: 1200,
  effect: "slide",
});

/* ============================
   ヒーロー画像フェード
============================ */
const heroSlides = document.querySelectorAll(".hero-slide");
let heroIndex = 0;

setInterval(() => {
  heroSlides[heroIndex].classList.remove("active");
  heroIndex = (heroIndex + 1) % heroSlides.length;
  heroSlides[heroIndex].classList.add("active");
}, 4000);

/* ============================
   Fade Slider（Charm）
============================ */
document.querySelectorAll(".fade-slider").forEach(slider => {
  const slides = slider.querySelectorAll(".fade-slide");
  let idx = 0;

  setInterval(() => {
    slides[idx].classList.remove("active");
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add("active");
  }, 6000);
});

/* ============================
   ドロワーメニュー
============================ */
const drawer = document.getElementById("drawer");
const menuBtn = document.getElementById("menu-btn");
const drawerCloseBtn = document.querySelector(".drawer-close");
const indicator = drawer.querySelector(".menu-indicator");

menuBtn.addEventListener("click", () => {
  drawer.classList.toggle("open");
  menuBtn.classList.toggle("open");
});

drawerCloseBtn.addEventListener("click", () => {
  drawer.classList.remove("open");
  menuBtn.classList.remove("open");
});

/* ============================
   セクション管理
============================ */
const sections = {
  profile: document.getElementById("profile"),
  charm: document.getElementById("charm"),
  works: document.getElementById("works"),
  message: document.getElementById("message"),
  sns: document.getElementById("sns"),
};

/* ============================
   ドロワーリンク → スクロール
============================ */
drawer.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();

    const target = sections[a.dataset.target];
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const absoluteY = rect.top + window.pageYOffset - 60;

    drawer.classList.remove("open");
    menuBtn.classList.remove("open");

    setTimeout(() => {
      window.scrollTo({
        top: absoluteY,
        behavior: "smooth"
      });
    }, 250);
  });
});
/* ============================
   作品データ（リンクすべて保持）
============================ */
const works = {
  tokyorevengers: {
    title: "映画『東京リベンジャーズ』シリーズ（2021–2023）",
    img: "img/works/tokyo_revengers.jpg",
      images: [
    "img/works/revengers/revengers1.jpg",
    "img/works/revengers/revengers2.jpg",
    "img/works/revengers/revengers3.jpg",
    "img/works/revengers/revengers4.jpg",
    "img/works/revengers/revengers5.jpg",
    "img/works/revengers/revengers6.jpg",
  ],
    role: "橘 日向",
    desc:
    "主人公タケミチの“人生を変えた存在”として描かれる心優しいヒロイン。誰かを信じ抜く強さと、まっすぐな愛情を持ち、タケミチが過去に戻る理由の中心に存在する女性。どんな困難にも決して揺らがない温かさは、作品全体の希望そのものとなっている。",
    links: [
      {
        service: "U-NEXT",
        url: "https://video-share.unext.jp/video/title/SID0063752?utm_source=copy&utm_medium=social&utm_campaign=nonad-sns&rid=PM026687830"
      },
      {
        service: "Netflix",
        url: "https://www.netflix.com/watch/81708087?trackId=13212365&tctx=2%2C0%2C3c5f0489-0cbf-452c-9b26-b38c6e7103cf%2C3c5f0489-0cbf-452c-9b26-b38c6e7103cf%7C%3DeyJwYWdlSWQiOiI1OGZkNjc5ZS0yZGIxLTQ0YzUtOTk5Yi03YjMwZTU3ZDE3OTUvMS8vdG8vMC8wIiwibG9jYWxTZWN0aW9uSWQiOiIyIn0%3D%2C%2C%2C%2C%2C81708088%2CVideo%3A81708087%2CdetailsPageCollection"
      },
      {
        service: "Prime Video",
        url: "https://www.amazon.co.jp/gp/video/detail/B0CGMTRN6N/ref=atv_sr_fle_c_sr01216b_4_1_4?sr=1-4&pageTypeIdSource=ASIN&pageTypeId=B0CGMTZMS6&qid=1765524563094"
      }
    ]
  },

  watakon: {
    title: "映画『わたしの幸せな結婚』（2023）",
    img: "img/works/watakon.jpg",
          images: [
    "img/works/watakon/watakon1.JPG",
    "img/works/watakon/watakon2.JPG",
    "img/works/watakon/watakon3.JPG",
    "img/works/watakon/watakon4.JPG",
    "img/works/watakon/watakon5.JPG",
    "img/works/watakon/watakon6.JPG",
  ],
    role: "斎森 美世",
    desc:
    "家族から愛されずに育ちながらも、静かな強さと優しさを失わずに生きてきた女性。異能が絡む世界で孤独に耐え続けるが、久堂清霞と出会い、初めて“愛される喜び”を知っていく。か弱さと芯の強さが共存する、儚くも美しいヒロイン。",
    links: [
      {
        service: "U-NEXT",
        url: "https://video-share.unext.jp/video/title/SID0092155?utm_source=copy&utm_medium=social&utm_campaign=nonad-sns&rid=PM026687830"
      },
      {
        service: "Netflix",
        url: "https://www.netflix.com/watch/81716521?trackId=200256543&tctx=0%2C0%2C133f93d4-c0a7-4ce8-aa81-39993766ea05-94346044%2Cgallery-person-60447184%2C%2C%2C%2C%2C%2CVideo%3A81716521%2CdetailsPagePlayButton"
      },
      {
        service: "Prime Video",
        url: "https://www.amazon.co.jp/gp/video/detail/B0CJQMKTS5/ref=atv_dp_share_cu_r"
      },
      { service: "Hulu", url: "https://www.hulu.jp/watch/100162709" }
    ]
  },

  lastman: {
    title: "ドラマ『ラストマン -全盲の捜査官-』（2023）",
    img: "img/works/lastman.jpg",
          images: [
            "img/works/lastman/lastman1.jpg",
            "img/works/lastman/lastman2.jpg",
            "img/works/lastman/lastman3.jpg",
            "img/works/lastman/lastman4.jpg",
            "img/works/lastman/lastman5.jpg",
            "img/works/lastman/lastman6.jpg"
  ],
    role: "吾妻ゆうき",
    desc:
    "警視庁の捜査支援分析センターに所属する技術支援捜査官。PCと情報分析に優れ、捜査を影から支える頭脳派。学生時代のトラウマから人前に出ることを避けていたが、皆実の姿に救われ、自分も正義の側に立ちたいと願うようになる。臆病さを抱えながらも一歩を踏み出す、その成長が魅力。",
    links: [
      { service: "TVer", url: "https://tver.jp/series/sr03ilj3i5" },
      {
        service: "U-NEXT",
        url: "https://video-share.unext.jp/video/title/SID0088767?utm_source=copy&utm_medium=social&utm_campaign=nonad-sns&rid=PM026687830"
      }
    ]
  },

  sukihana: {
    title: "ドラマ『いちばんすきな花』（2023）",
    img: "img/works/sukihana.jpg",
          images: [
    "img/works/sukihana/sukihana1.jpg",
    "img/works/sukihana/sukihana2.jpg",
    "img/works/sukihana/sukihana3.jpg",
    "img/works/sukihana/sukihana4.jpg",
    "img/works/sukihana/sukihana5.jpg",
    "img/works/sukihana/sukihana6.jpg",
  ],
    role: "深雪 夜々",
    desc:
      "表参道の美容院で働く美容師。人と丁寧に向き合いたいだけなのに、異性として見られたり、周囲から誤解されてしまう繊細な悩みを抱えている。優しい嘘で自分を守りながらも、本当は“誰かと対等に繋がりたい”と願っている、不器用で愛おしい女性。",
    links: [
      { service: "FOD", url: "https://fod.fujitv.co.jp/title/70jl/" },
      {
        service: "Prime Video",
        url: "https://www.amazon.co.jp/gp/video/detail/B0CH6KBNNF/ref=atv_dp_share_cu_r"
      }
    ]
  },

trilliongame: {
    title: "『トリリオンゲーム』シリーズ（2023-2025）",
    img: "img/works/trilliongame.jpg",
    images: [
        "img/works/trilliongame/trilliongame1.jpg",
        "img/works/trilliongame/trilliongame2.jpg",
        "img/works/trilliongame/trilliongame3.jpg",
        "img/works/trilliongame/trilliongame4.jpg",
        "img/works/trilliongame/trilliongame5.jpg",
        "img/works/trilliongame/trilliongame6.jpg"
    ],
    role: "黒龍キリカ",
    desc:
    "世界一のワガママ男と気弱なパソコンオタクがゼロから起業し1兆ドルを稼ぎ上げる。前代未聞のノンストップ・エンターテインメント。<br><br>今田美桜は、欲しいものはどんな手を使ってでも手に入れる、高飛車で堂々とした態度が印象的な“女帝”、野心家な社長令嬢・黒龍キリカを演じている。誰もが憧れる美しさと冷酷さを併せ持ち、物語に緊張感と華やかさを与える存在だ。",
    links: {
      drama: [
        {
          service: "U-NEXT（ドラマ）",
          url: "https://video-share.unext.jp/video/title/SID0090348?utm_source=copy&utm_medium=social&utm_campaign=nonad-sns&rid=PM026687830"
        },
        {
          service: "Netflix",
          url: "https://www.netflix.com/browse/m/person/60447184?jbv=81704795"
        },
        {
          service: "Prime Video",
          url: "https://www.amazon.co.jp/gp/video/detail/B0D8LLJJDB/ref=atv_dp_share_cu_r"
        }
      ],
      movie: [
        {
          service: "U-NEXT（映画）",
          url: "https://video-share.unext.jp/video/title/SID0225290?utm_source=copy&utm_medium=social&utm_campaign=nonad-sns&rid=PM026687830"
        },
        {
          service: "Prime Video（映画）",
          url: "https://www.amazon.co.jp/gp/video/detail/B0FRG8B4RR/ref=atv_dp_share_cu_r"
        }
      ]
    }
},

  anpan: {
    title: "連続テレビ小説『あんぱん』（2025）",
    img: "img/works/anpan.jpg",
              images: [
    "img/works/anpan/anpan1.jpg",
    "img/works/anpan/anpan2.jpg",
    "img/works/anpan/anpan3.jpg",
    "img/works/anpan/anpan4.jpg",
    "img/works/anpan/anpan5.jpg",
    "img/works/anpan/anpan6.jpg",
  ],
    role: "朝田のぶ",
    desc:
      "高知で“ハチキンおのぶ”と呼ばれた快活で強い女性。家族を支えるために奮闘し、教師・速記者・政治秘書と時代に合わせて新しい道を切り開く。戦争の渦に翻弄されながらも、大切な人を守りたいという真っすぐな思いを失わず、何度でも立ち上がる。愛と喪失、再生を生き抜く彼女の人生そのものが、物語の力になっている。",
    links: [
      {
        service: "Prime Video",
        url: "https://www.amazon.co.jp/gp/video/detail/B0F1NKG3TN/ref=atv_dp_share_cu_r"
      },
      {
        service: "U-NEXT",
        url: "https://video-share.unext.jp/video/title/SID0185668?utm_source=copy&utm_medium=social&utm_campaign=nonad-sns&rid=PM026687830"
      }
    ]
  }
};

/* ============================
   モーダル処理
============================ */

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalRole = document.getElementById("modal-role");
const modalDesc = document.getElementById("modal-desc");
const modalLinks = document.getElementById("modal-links");
const modalCloseBtn = document.querySelector(".modal-close-btn");

let modalSwiper = null;
let modalAutoTimer = null;

/* ===== モーダルを開くとき ===== */
function openModalSwiper(images) {

  const wrapper = document.getElementById("modal-swiper-wrapper");
  wrapper.innerHTML = "";

  if (modalSwiper) {
    modalSwiper.destroy(true, true);
    modalSwiper = null;
  }

  // 2) スライド生成
  images.forEach(src => {
    wrapper.insertAdjacentHTML(
      "beforeend",
      `<div class="swiper-slide"><img src="${src}" /></div>`
    );
  });

  // 3) 新しいSwiper作成
  modalSwiper = new Swiper(".modal-swiper", {
    loop: true,
    slidesPerView: 1,
    loopedSlides: images.length,
    speed: 1600,
    autoplay: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
  });
}

/* ===== モーダル閉じる ===== */
function closeModal() {
  modal.style.display = "none";
}

modalCloseBtn.addEventListener("click", closeModal);

modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

/* ===== 作品クリックでモーダル開く ===== */
document.querySelectorAll(".work-item").forEach(item => {
  item.addEventListener("click", () => {
    const key = item.dataset.work;
    const w = works[key];

    if (!w) return;

    // 基本情報
    modalTitle.textContent = w.title;
    modalRole.textContent = "役：" + w.role;
    modalDesc.innerHTML = w.desc;

    // スライダー
    const imgs = w.images?.length ? w.images : [w.img];
    openModalSwiper(imgs);

    // ===== リンク生成（ここ重要）=====
    let html = "";

    if (Array.isArray(w.links)) {
      w.links.forEach(link => {
        html += `<a href="${link.url}" target="_blank" class="stream-btn">${link.service}</a>`;
      });
    }

    if (w.links?.drama) {
      html += `<h3 class="modal-subtitle">ドラマ</h3>`;
      w.links.drama.forEach(link => {
        html += `<a href="${link.url}" target="_blank" class="stream-btn">${link.service}</a>`;
      });
    }

    if (w.links?.movie) {
      html += `<h3 class="modal-subtitle">映画</h3>`;
      w.links.movie.forEach(link => {
        html += `<a href="${link.url}" target="_blank" class="stream-btn">${link.service}</a>`;
      });
    }

    modalLinks.innerHTML = html;

    // モーダル表示
    modal.style.display = "flex";
  });
});

// モーダル閉じる
modalCloseBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
modal.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});