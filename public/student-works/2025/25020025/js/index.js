// header部分のjsコード
// ゆっくり上に戻る
const topButton = document.querySelector('.top');
topButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// ゆっくり上に戻る
const ueButton = document.querySelector('.ue');
ueButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// about.html専用のjsコード
// ABOUTの説明文の切り替え
const jaguaTab = document.querySelector('.jagua');
const hennaTab = document.querySelector('.henna');
const inkboxTab = document.querySelector('.inkbox');
const jaguaText = document.querySelector('.jagua1');
const hennaText = document.querySelector('.henna1');
const inkboxText = document.querySelector('.inkbox1');

jaguaTab.addEventListener('click', () => {
    jaguaText.style.display = 'block';
    hennaText.style.display = 'none';
    inkboxText.style.display = 'none';
});

hennaTab.addEventListener('click', () => {
    jaguaText.style.display = 'none';
    hennaText.style.display = 'block';
    inkboxText.style.display = 'none';
});

inkboxTab.addEventListener('click', () => {
    jaguaText.style.display = 'none';
    hennaText.style.display = 'none';
    inkboxText.style.display = 'block';
});

// 初期設定
jaguaText.style.display = 'block';
hennaText.style.display = 'none';
inkboxText.style.display = 'none';

// aboutのimgの切り替え
const img1 = document.querySelector('.jagua2');
const img2 = document.querySelector('.henna2');
const img3 = document.querySelector('.inkbox2');
jaguaTab.addEventListener('click', () => {
    img1.style.display = 'block';
    img2.style.display = 'none';
    img3.style.display = 'none';
});

hennaTab.addEventListener('click', () => {
    img1.style.display = 'none';
    img2.style.display = 'block';
    img3.style.display = 'none';
});

inkboxTab.addEventListener('click', () => {
    img1.style.display = 'none';
    img2.style.display = 'none';
    img3.style.display = 'block';
});

// 初期設定
img1.style.display = 'block';
img2.style.display = 'none';
img3.style.display = 'none';

// home.html専用のjsコード
// Q&Aのアコーディオンメニュー
const qaItems = document.querySelectorAll('.qa li');

qaItems.forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.querySelector('p');
        const isOpen = answer.style.display === 'block';

        // すべての回答を閉じる
        qaItems.forEach(i => {
            i.querySelector('p').style.display = 'none';
        });

        // クリックされた項目の回答を開く/閉じる
        if (!isOpen) {
            answer.style.display = 'block';
        }
    });
});
// 初期設定: すべての回答を閉じる
qaItems.forEach(item => {
    item.querySelector('p').style.display = 'none';
});
// Q&Aのアコーディオンメニュー





