document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. メニュー周りの制御（既存）
       ========================================= */
    const navItems = document.querySelectorAll('.menu > li');
    navItems.forEach(li => {
        const link = li.querySelector('a');
        if (li.querySelector('ul')) {
            link.addEventListener('click', (e) => {
                li.classList.toggle('open');
            });
        }
        document.addEventListener('click', (e) => {
            if (!li.contains(e.target)) {
                li.classList.remove('open');
            }
        });
    });

    const hamburger = document.getElementById('js-hamburger');
    const drawer = document.getElementById('js-drawer');
    const overlay = document.getElementById('js-overlay');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            drawer.classList.toggle('is-open');
            overlay.classList.toggle('is-open');
        });
    }
    if (overlay) {
        overlay.addEventListener('click', () => {
            hamburger.classList.remove('is-active');
            drawer.classList.remove('is-open');
            overlay.classList.remove('is-open');
        });
    }

    /* =========================================
       2. キャラクターモーダルの制御
       ========================================= */
    const modal = document.getElementById('char-modal');
    const modalImg = document.getElementById('modal-img');
    const modalName = document.getElementById('modal-name');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.getElementById('modal-close'); // ここが×ボタン
    const charCards = document.querySelectorAll('.char-card');

    charCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgPath = card.querySelector('img').src;
            const jobTitle = card.querySelector('.job-title').innerText;
            const charName = card.dataset.name;
            const description = card.dataset.desc;

            // 墓守の判定
            const isGraveKeeper = card.querySelector('.char-img').classList.contains('grave-keeper-adjust');

            if (isGraveKeeper) {
                // 墓守なら専用クラスを追加して右に寄せる
                modalImg.classList.add('grave-focus');
            } else {
                // 他のキャラならクラスを消して真ん中に戻す
                modalImg.classList.remove('grave-focus');
            }

            modalImg.src = imgPath;
            modalName.innerHTML = `
                <span class="job-title">${jobTitle}</span><br>
                <span class="char-name">${charName}</span>
            `; 
            modalDesc.innerText = description;
            modal.classList.add('is-visible');
        });
    });

    // 【重要】閉じるボタン（×）のイベント
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // 親要素（modal）へのクリック伝播を防ぐ
            modal.classList.remove('is-visible');
        });
    }

    // 背景部分をクリックした時も閉じる
    if (modal) {
        modal.addEventListener('click', (e) => {
            // クリックしたのが背景（modal自身）であれば閉じる
            if (e.target === modal) {
                modal.classList.remove('is-visible');
            }
        });
    }
});

