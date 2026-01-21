document.addEventListener("DOMContentLoaded", function () {
    let menus = document.querySelectorAll(".menu");

    menus.forEach(menu => {
        let submenu = menu.querySelector(".submenu");

        // 🌟 メニューまたはサブメニューにカーソルを当てると表示
        menu.addEventListener("mouseenter", function () {
            submenu.classList.add("open");
        });

        // 🌟 メニュー全体から完全にカーソルが外れたら非表示
        menu.addEventListener("mouseleave", function (event) {
            if (!menu.contains(event.relatedTarget)) {
                submenu.classList.remove("open");
            }
        });
    });
});









    // 🌟 バブルメニューの開閉（ここは変更なし）
    let menuButton = document.querySelector(".menu-button");
    let navMenu = document.querySelector(".nav-menu");
    let pageOverlay = document.createElement("div");

    // 背景用オーバーレイを追加
    pageOverlay.classList.add("menu-overlay");
    document.body.appendChild(pageOverlay);

    // バブルメニューを開閉するボタンのクリックイベント
    menuButton.addEventListener("click", function () {
        navMenu.classList.toggle("active");
        pageOverlay.classList.toggle("active");
    });

    // 背景クリックでバブルメニューを閉じる
    pageOverlay.addEventListener("click", function () {
        navMenu.classList.remove("active");
        pageOverlay.classList.remove("active");
    });





    //game history

    document.addEventListener("DOMContentLoaded", function () {
        const gameList = document.querySelector(".game-list");
        const leftBtn = document.querySelector(".left-btn-game");
        const rightBtn = document.querySelector(".right-btn-game");
        const gameContainer = document.querySelector(".game-container");
    
        // 37個のゲームデータを作成
        const totalItems = 37;
        let index = 0;
        let visibleItems = window.innerWidth <= 768 ? 2 : 4; // スマホなら2つ表示
        let autoSlide;
    
        for (let i = 1; i <= totalItems; i++) {
            const gameItem = document.createElement("div");
            gameItem.classList.add("game-item");
    
            const gameYear = document.createElement("p");
            gameYear.classList.add("game-year");
            gameYear.textContent = 1990 + i; // 1991年から開始
    
            const gameImg = document.createElement("img");
            gameImg.src = `img/game${i}.png`;
            gameImg.alt = `ゲーム ${i}`;
    
            gameItem.appendChild(gameYear);
            gameItem.appendChild(gameImg);
            gameList.appendChild(gameItem);
        }
    
        // `.game-item` の正確な幅を取得
        const firstItem = document.querySelector(".game-item");
        let itemWidth = firstItem.offsetWidth + 10; // 余白込みの正確な幅
        gameList.style.width = `${itemWidth * totalItems}px`;
    
        // 自動スライド関数
        function startAutoSlide() {
            autoSlide = setInterval(() => {
                if (index < totalItems - visibleItems) {
                    index++;
                } else {
                    index = 0; // 最後まで行ったら最初に戻る
                }
                gameList.style.transform = `translateX(-${index * itemWidth}px)`;
            }, 2000); // 2秒ごとにスライド
        }
    
        // 自動スライド開始
        startAutoSlide();
    
        // 左ボタンの動作（1つずつスライド）
        leftBtn.addEventListener("click", function () {
            if (index > 0) {
                index--;
            } else {
                index = totalItems - visibleItems; // 最初まで行ったら最後に戻る
            }
            gameList.style.transform = `translateX(-${index * itemWidth}px)`;
        });
    
        // 右ボタンの動作（1つずつスライド）
        rightBtn.addEventListener("click", function () {
            if (index < totalItems - visibleItems) {
                index++;
            } else {
                index = 0; // 最後まで行ったら最初に戻る
            }
            gameList.style.transform = `translateX(-${index * itemWidth}px)`;
        });
    
        // マウスホバーで自動スライドを一時停止
        gameContainer.addEventListener("mouseenter", () => clearInterval(autoSlide));
        gameContainer.addEventListener("mouseleave", startAutoSlide);
    
        // ウィンドウサイズ変更時に表示数を変更
        window.addEventListener("resize", () => {
            visibleItems = window.innerWidth <= 768 ? 2 : 4;
            itemWidth = firstItem.offsetWidth + 10;
            gameList.style.width = `${itemWidth * totalItems}px`;
        });
    });
    



    //  puti

    document.addEventListener("DOMContentLoaded", function () {
        let currentIndex = 0;
        const slider = document.querySelector(".slider");
        const items = document.querySelectorAll(".sweet-item");
        const totalItems = items.length;
        let visibleItems = window.innerWidth <= 768 ? 2 : 3; // スマホでは2つ、PCでは3つ
        let itemWidth = items[0].offsetWidth + 10; // 画像の幅 + 余白
    
        function updateSliderWidth() {
            itemWidth = items[0].offsetWidth + 10;
            let wrapperWidth = visibleItems * itemWidth; // 3つ分の幅
            document.querySelector(".slider-wrapper").style.width = `${wrapperWidth}px`;
            slider.style.width = `${itemWidth * totalItems}px`; 
            updateSlider();
        }
    
        function updateSlider() {
            let offset = (totalItems - visibleItems) * itemWidth / 2; // スライダーの中央調整
            let translateValue = -currentIndex * itemWidth + offset;
            slider.style.transform = `translateX(${translateValue}px)`;
        }
    
        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = totalItems - visibleItems; // 最後の位置に戻る
            }
            updateSlider();
        }
    
        function nextSlide() {
            if (currentIndex < totalItems - visibleItems) {
                currentIndex++;
            } else {
                currentIndex = 0; // 最初に戻る
            }
            updateSlider();
        }
    
        // ウィンドウサイズ変更時に表示数を再計算
        window.addEventListener("resize", () => {
            visibleItems = window.innerWidth <= 768 ? 2 : 3;
            updateSliderWidth();
        });
    
        // 初回ロード時に幅を正しく設定
        window.addEventListener("load", updateSliderWidth);
    
        // ボタンイベントを登録
        document.querySelector(".slider-btn.left").addEventListener("click", prevSlide);
        document.querySelector(".slider-btn.right").addEventListener("click", nextSlide);
    });
    





    // modal

    document.addEventListener("DOMContentLoaded", function () {
        const modal = document.getElementById("modal");
        const openModalBtn = document.getElementById("openModalBtn"); // 手動開閉ボタン
        const closeModalBtn = document.querySelector(".modalclose-btn");
        const cafeSection = document.querySelector(".cafe");
        const xSection = document.querySelector(".x");
        let modalShown = false; // モーダルが表示されたかどうかのフラグ
        let hasScrolled = false; // スクロールしたかどうかを記録
    
        // 🌟 特定のセクションが画面内に入ったかチェックする関数
        function isElementInViewport(element) {
            const rect = element.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom >= 0;
        }
    
        function checkSectionsInView() {
            if (!modalShown && hasScrolled) {
                if (isElementInViewport(cafeSection) || isElementInViewport(xSection)) {
                    modal.style.display = "flex";
                    modalShown = true; // 1回だけ開く
                }
            }
        }
    
        // 🌟 スクロール時にセクションが表示されたかチェック
        window.addEventListener("scroll", function () {
            hasScrolled = true; // 初回スクロール時にフラグを立てる
            checkSectionsInView();
        });
    
        // 🌟 手動でモーダルを開く
        openModalBtn.addEventListener("click", function () {
            modal.style.display = "flex";
        });
    
        // ❌ モーダルを閉じる
        closeModalBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });
    
        // 🌟 モーダルの外側をクリックしたら閉じる
        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
    
    