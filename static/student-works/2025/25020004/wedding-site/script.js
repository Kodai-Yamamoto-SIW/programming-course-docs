// ========== スムーズスクロール ========== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== フォーム送信 ========== 
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            alert('お問い合わせありがとうございます。\n近日中にご連絡させていただきます。');
            this.reset();
        } else {
            alert('必須項目を入力してください。');
        }
    });
}

// ========== スクロール時のナビゲーション背景 ========== 
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.heder');
    const heroHeight = document.querySelector('.hero').offsetHeight;
    const logo = document.querySelector('.heder-logo h2 img');
    
    // 既存のナビゲーション背景処理
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(75, 55, 40, 0.98)';
            navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(75, 55, 40, 0.95)';
            navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        }
    }
    
    // ヘッダーのぼかし効果とロゴサイズ変更（ヒーロー高さを超えたら適用）
    if (header && logo) {
        if (window.scrollY > heroHeight - 100) {
            header.classList.add('scrolled');
            logo.style.height = '60px';
        } else {
            header.classList.remove('scrolled');
            logo.style.height = '200px';
        }
    }
});
// stray header removal removed to avoid ReferenceError

// ========== 画像の遅延読み込み効果 ========== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const imageObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ギャラリーアイテムを監視
document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    imageObserver.observe(item);
});

// ========== セクションの出現アニメーション ========== 
const sectionObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, sectionObserverOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    sectionObserver.observe(section);
});

// ========== ページ読み込み時のアニメーション ========== 
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// ========== モバイルメニュー対応 ========== 
function handleResponsiveMenu() {
    const navMenu = document.querySelector('.hero-nav');
    if (!navMenu) return;
    if (window.innerWidth <= 768) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.gap = '0.5rem';
    } else {
        navMenu.style.flexDirection = 'row';
        navMenu.style.gap = '2rem';
    }
}

window.addEventListener('resize', handleResponsiveMenu);
handleResponsiveMenu();

// ========== アクティブナビゲーション ========== 
window.addEventListener('scroll', function() {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    const navLinks = document.querySelectorAll('.hero-nav a');
    if (navLinks && navLinks.length) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.style.color = '#d4a574';
            } else {
                link.style.color = 'white';
            }
        });
    }
});

// ========== ページトップスクロール ========== 
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ロゴクリック時にトップへ
const logoEl = document.querySelector('.heder-logo');
if (logoEl) {
    logoEl.addEventListener('click', function() {
        scrollToTop();
        this.style.cursor = 'pointer';
    });
}

// ========== 初期化 ========== 
document.addEventListener('DOMContentLoaded', function() {
    console.log('ウェディングサイトが読み込まれました。');
    
    // ========== Chapel 画像ギャラリー機能 ==========
    const chapelItems = document.querySelectorAll('.chapel-scroll-item');
    const mainImage = document.querySelector('.chapel-main-image');

    // 最初の画像を背景グラデーションで設定（常に cover になるようにする）
    if (chapelItems && chapelItems.length && mainImage) {
        const firstItem = chapelItems[0];
        const scrollImg = firstItem.querySelector('.chapel-scroll-image');
        const firstItemStyle = scrollImg ? scrollImg.getAttribute('style') : '';
        if (firstItemStyle) {
            mainImage.style.cssText = firstItemStyle + '; background-size: cover; background-position: center;';
        }
    }
    
    // 各スクロール項目にクリックリスナーを設定
    chapelItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // 前のactiveを削除
            chapelItems.forEach(i => i.classList.remove('active'));
            
            // 新しいactiveを追加
            this.classList.add('active');
            
            // メイン画像を更新
            const scrollImage = this.querySelector('.chapel-scroll-image');
            const style = scrollImage ? scrollImage.getAttribute('style') : '';
            if (style && mainImage) {
                mainImage.style.cssText = style + '; background-size: cover; background-position: center;';
            }
            
            // スムーズなスクロール位置調整（選択アイテムを中央に）
            const wrapper = document.querySelector('.chapel-scroll-wrapper');
            const itemLeft = item.offsetLeft;
            const itemWidth = item.offsetWidth;
            const wrapperWidth = wrapper.clientWidth;
            
            wrapper.scrollLeft = itemLeft - (wrapperWidth - itemWidth) / 2;
        });
    });
});

