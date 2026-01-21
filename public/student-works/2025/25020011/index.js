let menuWrapYoso = document.querySelector('.menuWrap');
let subMenuYoso = document.querySelector('.subMenu');

menuWrapYoso.addEventListener('mouseenter', function() {
    subMenuYoso.classList.add('show');
});

menuWrapYoso.addEventListener('mouseleave', function() {
    subMenuYoso.classList.remove('show');
});