let items =document.querySelector(".items-botom");
let items2 =document.querySelector(".items-haruto")
items.addEventListener("click",function(){
    items2.classList.toggle("open");
})

let menus = document.querySelectorAll(".items-p1")
for(let menu of menus){
let title =menu.querySelector(".items-p")
let menuB = menu.querySelector(".items-i")
menu.addEventListener("mouseenter", function () {
    menuB.classList.add("open");
});
menu.addEventListener("mouseleave", function () {
    menuB.classList.remove("open");
});
}


var slide = document.getElementById('slider1');
var prev = document.getElementById('prev1');
var next = document.getElementById('next1');
var list1 = document.getElementById('list1');
var list2 = document.getElementById('list2');
var list3 = document.getElementById('list3');
var list4 = document.getElementById('list4');

// クリックイベント

next.addEventListener('click', nextClick);
prev.addEventListener('click', prevClick);

function nextClick() {
  if (slide.classList.contains('slider1') === true) {
    slide.classList.remove('slider1');
    slide.classList.add('slider2');
    list1.style.backgroundColor = 'transparent';
    list2.style.backgroundColor = '#000';
    count = 0;
  } else if (slide.classList.contains('slider2') === true) {
    slide.classList.remove('slider2');
    slide.classList.add('slider3');
    list2.style.backgroundColor = 'transparent';
    list3.style.backgroundColor = '#000';
    count = 0;
  } else if (slide.classList.contains('slider3') === true) {
    slide.classList.remove('slider3');
    slide.classList.add('slider4');
    list3.style.backgroundColor = 'transparent';
    list4.style.backgroundColor = '#000';
    count = 0;
  } else {
    slide.classList.remove('slider4');
    slide.classList.add('slider1');
    list4.style.backgroundColor = 'transparent';
    list1.style.backgroundColor = '#000';
    count = 0;
  }
};

function prevClick() {
  if (slide.classList.contains('slider1') === true) {
    slide.classList.remove('slider1');
    slide.classList.add('slider4');
    count = 0;
  } else if (slide.classList.contains('slider2') === true) {
    slide.classList.remove('slider2');
    slide.classList.add('slider1');
    count = 0;
  } else if (slide.classList.contains('slider3') === true) {
    slide.classList.remove('slider3');
    slide.classList.add('slider2');
    count = 0;
  } else {
    slide.classList.remove('slider4');
    slide.classList.add('slider3');
    count = 0;
  }
};


