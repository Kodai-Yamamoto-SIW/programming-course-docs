const btn = document.querySelector(".nav-box");
const container = document.querySelector(".container");

btn.addEventListener('click',() => {
    btn.classList.toggle('active');
    container.classList.toggle('active');
    // activeがついていたら外す、ついていなかったらつける
});

let container1=document.querySelector(".container1");

let menu = document.querySelector(".menu-b");

container1.addEventListener('click',() =>{
    menu.classList.toggle("open"); 
});
let reruit = document.getElementById('recruit');
let menu1 = document.getElementById('menu-1');
reruit.addEventListener('click',() =>{
    menu1.classList.toggle("open"); 
});

const open = document.getElementById('open');
const mask = document.getElementById('mask');
const modalcontent = document.getElementById('modalcontent');

open.addEventListener('click',()=>{
    modalcontent.classList.remove('hidden');
    mask.classList.remove('hidden');
});
// close.addEventListener('click',()=> {
//     modalcontent.classList.add('hidden');
//     mask.classList.add('hidden');
// });
mask.addEventListener('click',()=> {
    modalcontent.classList.add('hidden');
    mask.classList.add('hidden');
});

$('.autoplay').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
});