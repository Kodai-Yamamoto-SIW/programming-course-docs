// ハンバーガーメニューの動作
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('overlay');

    

    // --- カルーセル機能の追加 ---
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // アイテムの幅(250px) + gap(30px)
    const itemWidth = 250;
    const gap = 30;
    const slideWidth = itemWidth + gap;

    let isAnimating = false;

    

    // 次へボタンの処理
    nextBtn.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;

        // アニメーション用にCSSを設定
        carousel.style.transition = 'transform 0.3s ease-in-out';
        carousel.style.transform = `translateX(-${slideWidth}px)`;

        // アニメーション終了後の処理
        carousel.addEventListener('transitionend', () => {
            // アニメーションを一時的に無効化
            carousel.style.transition = 'none';
            // 最初の要素を最後に移動(これが無限ループの仕組み)
            carousel.appendChild(carousel.firstElementChild);
            // 位置をリセット(DOM移動によるズレを相殺)
            carousel.style.transform = 'translateX(0)';
            
            // フラグ解除
            setTimeout(() => {
                isAnimating = false;
            }, 0);
        }, { once: true });
    });

    // 前へボタンの処理
    prevBtn.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;

        // アニメーションなしで最後の要素を最初に持ってくる
        carousel.style.transition = 'none';
        carousel.prepend(carousel.lastElementChild);
        // 位置をずらしておく(見た目は変わらないように)
        carousel.style.transform = `translateX(-${slideWidth}px)`;

        // わずかな遅延の後にアニメーションさせて0に戻す
        setTimeout(() => {
            carousel.style.transition = 'transform 0.3s ease-in-out';
            carousel.style.transform = 'translateX(0)';
        }, 20);

        carousel.addEventListener('transitionend', () => {
            isAnimating = false;
        }, { once: true });
    });
    // メニューアイコンをクリックしたとき
        menuIcon.addEventListener('click', function() {
            menuIcon.classList.toggle('active'); // この行を追加
            sideMenu.classList.toggle('active');
            overlay.classList.toggle('active');
        });

        // オーバーレイをクリックしたとき
        overlay.addEventListener('click', function() {
            menuIcon.classList.remove('active'); // この行を追加
            sideMenu.classList.remove('active');
            overlay.classList.remove('active');
        });

const moreButton = document.querySelector('.more-button');
const memberProfiles = document.getElementById('memberProfiles');

moreButton.addEventListener('click', function() {
    memberProfiles.classList.toggle('active');
    
    // プロフィールセクションまでスムーズにスクロール
    if (memberProfiles.classList.contains('active')) {
        memberProfiles.scrollIntoView({ behavior: 'smooth' });
    }
});
});