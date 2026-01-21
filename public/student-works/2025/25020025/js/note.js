// ※ここから先はAIさんとても助けていただいています。
// DOMが読み込まれてから実行
document.addEventListener('DOMContentLoaded', () => {
    const yodan = document.querySelector('.yodan');
    const content = document.querySelector('.yodan-content');
    
    if (yodan && content) {
        yodan.addEventListener('click', () => {
            content.classList.toggle('show');
            yodan.classList.toggle('open');
        });
    }
});