const swiper = new Swiper(".swiper",{
    slidesPerView:4,
    loop:true,
    autoplay:{
        delay:1,
    },
    pagination:{
        el:".swiper-pagination"
    },
    navigation:{
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev"
    },
});

let hambtnyouso = document.querySelector(".ham-btn");
let draweryouso = document.querySelector(".drawer");
let hamiconyouso = document.querySelector(".ham-icon");

hambtnyouso.addEventListener("click",()=>{
    draweryouso.classList.toggle("open");
    hamiconyouso.classList.toggle("open");
});

overlayyouso.addEventListener("click",()=>{
    draweryouso.classList.remove("open");
    hamiconyouso.classList.remove("open")
})
