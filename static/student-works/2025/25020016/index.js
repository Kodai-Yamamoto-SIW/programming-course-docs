let hamBtnYoso = document.querySelector('.ham-btn');
let drawerYoso = document.querySelector('.drawer');
let overlayYoso = document.querySelector('.overlay');
let hamIconYoso = document.querySelector('.ham-icon');

hamBtnYoso.addEventListener('click', () => {
    drawerYoso.classList.toggle('open');
    overlayYoso.classList.toggle('open');
    hamIconYoso.classList.toggle('open');
});

overlayYoso.addEventListener('click', () => {
    drawerYoso.classList.remove('open');
    overlayYoso.classList.remove('open');
    hamIconYoso.classList.remove('open');
});