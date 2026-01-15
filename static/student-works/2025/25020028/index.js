// スムーズスクロール機能
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// スライダーの設定
let currentSlide = 0;
const slides = document.querySelectorAll('.product-slide');
const totalSlides = slides.length;
const slider = document.getElementById('productSlider');
const dotsContainer = document.getElementById('sliderDots');

// ドットを生成
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
}

// スライダーの表示を更新
function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // ドットの更新
    document.querySelectorAll('.slider-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });

    // ボタンの有効/無効
    document.getElementById('prevBtn').disabled = currentSlide === 0;
    document.getElementById('nextBtn').disabled = currentSlide === totalSlides - 1;
}

// スライドを変更（前/次ボタン用）
function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;
    updateSlider();
}

// 特定のスライドへ移動（ドット用）
function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

// 初期状態を設定
updateSlider();

// スクロール位置に応じてナビゲーションのアクティブ状態を更新（オプション）
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.opacity = '1';
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.style.opacity = '0.7';
        }
    });
});