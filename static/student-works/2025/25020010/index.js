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
    
    /* =========================================
       3. マップスライドの制御
       ========================================= */
    const slider = document.getElementById('js-slider');
    const prevBtn = document.getElementById('js-prev');
    const nextBtn = document.getElementById('js-next');
    const mapCards = document.querySelectorAll('.map-card');
    
    let counter = 0; // 今何枚目にいるか数える変数

    // 次へボタンを押したとき
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            counter++;
            // 8枚中、1画面に3枚出ているので、最大5回まで進める（0,1,2,3,4,5）
            if (counter > 5) {
                counter = 0; // 最後まで行ったら最初に戻る
            }
            const cardWidth = document.querySelector('.map-card').clientWidth + 20; // 横幅+隙間
            slider.style.transform = 'translateX(' + (-cardWidth * counter) + 'px)';
        });
    }

    // 前へボタンを押したとき
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            counter--;
            if (counter < 0) {
                counter = 5; // 最初より前に行ったら最後に飛ぶ
            }
            const cardWidth = document.querySelector('.map-card').clientWidth + 20;
            slider.style.transform = 'translateX(' + (-cardWidth * counter) + 'px)';
        });
    }

    /* =========================================
       4. マップ詳細をモーダルで表示
       ========================================= */
    mapCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgPath = card.querySelector('img').src;
            const mapName = card.dataset.name;
            const description = card.dataset.desc;

            // マップの時は墓守の調整（右寄せ）を外す
            modalImg.classList.remove('grave-focus');

            modalImg.src = imgPath;
            // 役職名（job-title）のところに「MAP」と表示させる
            modalName.innerHTML = `
                <span class="job-title">MAP</span><br>
                <span class="char-name">${mapName}</span>
            `; 
            modalDesc.innerText = description;
            modal.classList.add('is-visible');
        });
    });
});

