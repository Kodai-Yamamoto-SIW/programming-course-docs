// KVとアルバムのスクロール設定

$('.kv').slick({
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
});

$('.album').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
});


// ---------------------------
// nav 内のリンクだけ active を付ける
// ---------------------------
$(function () {
    const path = location.pathname;

    $("header nav a").each(function () {
        const href = $(this).attr("href");

        // 空リンクは除外（Live や sample の空 href 防止）
        if (!href || href === "#") return;

        // 現在のページとリンク先が一致したら active を付ける
        if (path.includes(href)) {
            $("header nav a").removeClass("active");
            $(this).addClass("active");
        }
    });
});



//アルバム収録曲の表示 / 非表示 

function checkAllClosed() {
    if ($(".detail > div:visible").length === 0) {
        $(".detail").removeClass("show");
    }
}

$(".albums img").on("click", function () {
    const target = $(this).data("target");

    $(".detail > div").not("." + target).slideUp(checkAllClosed);
    $("." + target).slideToggle(checkAllClosed);

    $(".detail").addClass("show");
});


// シングル / アルバム　切り替え

$(".tab-single").on("click", function () {

    // 表示切り替え
    $("#album").removeClass("look").addClass("none");
    $("#single").removeClass("none").addClass("look");

    // active 切り替え
    $(".tab-single").addClass("active").addClass("bc");
    $(".tab-album").removeClass("active").removeClass("bc");

});


$(".tab-album").on("click", function () {

    // 表示切り替え
    $("#single").removeClass("look").addClass("none");
    $("#album").removeClass("none").addClass("look");

    // active 切り替え
    $(".tab-album").addClass("active").addClass("bc");
    $(".tab-single").removeClass("active").removeClass("bc");
});



// Live 系ページならリンク無効化
if (location.pathname.includes("live")) {
    const liveLink = document.querySelector('nav a[href="live.html"]');
    if (liveLink) {
        liveLink.classList.add("no-click");
        liveLink.removeAttribute("href"); // 完全に無効化
    }
}


document.querySelectorAll('h1').forEach(h1 => {

    // 文字を span に包む
    let text = h1.textContent;
    h1.innerHTML = `<span>${text}</span>`;
    let span = h1.querySelector("span");

    // hover でフォント変更
    span.addEventListener("mouseenter", () => {
        span.classList.add("fade");
        setTimeout(() => {
            span.style.fontFamily = '"Zen Old Mincho", serif';
            span.classList.remove("fade");
        }, 300);
    });

    span.addEventListener("mouseleave", () => {
        span.classList.add("fade");
        setTimeout(() => {
            span.style.fontFamily = 'Evefont';
            span.classList.remove("fade");
        }, 300);
    });

});


document.querySelectorAll('h2').forEach(h2 => {

    // 文字を span に包む（自動処理）
    let text = h2.textContent;
    h2.innerHTML = `<span>${text}</span>`;
    let span = h2.querySelector("span");

    span.addEventListener("mouseenter", () => {
        span.classList.add("fade");
        setTimeout(() => {
            span.style.fontFamily = '"Zen Old Mincho", serif';
            span.classList.remove("fade");
        }, 300);
    });

    span.addEventListener("mouseleave", () => {
        span.classList.add("fade");
        setTimeout(() => {
            span.style.fontFamily = 'Evefont';
            span.classList.remove("fade");
        }, 300);
    });

});

document.querySelectorAll('h3').forEach(h3 => {

    // 文字を span に包む
    let text = h3.textContent;
    h3.innerHTML = `<span>${text}</span>`;
    let span = h3.querySelector("span");

    // hover でフォント変更
    span.addEventListener("mouseenter", () => {
        span.classList.add("fade");
        setTimeout(() => {
            span.style.fontFamily = '"Zen Old Mincho", serif';
            span.classList.remove("fade");
        }, 300);
    });

    span.addEventListener("mouseleave", () => {
        span.classList.add("fade");
        setTimeout(() => {
            span.style.fontFamily = 'Evefont';
            span.classList.remove("fade");
        }, 300);
    });

});

// 
//  UC切り替え
// 

$(".tab-Day1").on("click", function () {

    // 表示切り替え
    $(".day2").removeClass("look").addClass("none");
    $(".day1").removeClass("none").addClass("look");

    // active 切り替え
    $(".tab-Day1").addClass("active");
    $(".tab-Day2").removeClass("active");

});


$(".tab-Day2").on("click", function () {

    // 表示切り替え
    $(".day1").removeClass("look").addClass("none");
    $(".day2").removeClass("none").addClass("look");

    // active 切り替え
    $(".tab-Day2").addClass("active");
    $(".tab-Day1").removeClass("active");
});

// 
//  UB切り替え
// 

// 対象クラス一覧
const displayList = [
    "NAGOYA-day1",
    "NAGOYA-day2",
    "OSAKA-day1",
    "OSAKA-day2",
    "FUKUOKA-day1",
    "FUKUOKA-day2",
    "SENDAI-day1",
    "SENDAI-day2",
    "KANAGAWA-day1",
    "KANAGAWA-day2"
];

$(".tab-Day1").on("click", function () {

    // 表示切り替え（ifでまとめる）
    displayList.forEach(function (cls) {
        if (cls === "NAGOYA-day1") {
            $("." + cls).removeClass("none").addClass("look").addClass("active");  // 表示
            $(".NAGOYA").addClass("active");
        } else {
            $("." + cls).removeClass("look").addClass("none");  // 非表示
            $(".OSAKA, .FUKUOKA, .SENDAI, .KANAGAWA").removeClass("active");
        }
    });

    // active 切り替え（ifでまとめる）
    for (let i = 1; i <= 10; i++) {
        if (i === 1) {
            $(".tab-Day1").addClass("active");   // Day1 を active
        } else {
            $(".tab-Day" + i).removeClass("active");  // ほかは非 active
        }
    }

});

$(".tab-Day2").on("click", function () {

    displayList.forEach(function (cls) {
        if (cls === "NAGOYA-day2") {
            $("." + cls).removeClass("none").addClass("look");
            $(".NAGOYA").addClass("active");
        } else {
            $("." + cls).removeClass("look").addClass("none");
            $(".OSAKA, .FUKUOKA, .SENDAI, .KANAGAWA").removeClass("active");
        }
    });

    for (let i = 1; i <= 10; i++) {
        if (i === 2) $(".tab-Day2").addClass("active");
        else $(".tab-Day" + i).removeClass("active");
    }

});

$(".tab-Day3").on("click", function () {

    displayList.forEach(function (cls) {
        if (cls === "OSAKA-day1") {
            $("." + cls).removeClass("none").addClass("look");
            $(".OSAKA").addClass("active");
        } else {
            $("." + cls).removeClass("look").addClass("none");
            $(".NAGOYA, .FUKUOKA, .SENDAI, .KANAGAWA").removeClass("active");
        }
    });

    for (let i = 1; i <= 10; i++) {
        if (i === 3) $(".tab-Day3").addClass("active");
        else $(".tab-Day" + i).removeClass("active");
    }

});

$(".tab-Day4").on("click", function () {

    displayList.forEach(function (cls) {
        if (cls === "OSAKA-day2") {
            $("." + cls).removeClass("none").addClass("look");
            $(".OSAKA").addClass("active");
        } else {
            $("." + cls).removeClass("look").addClass("none");
            $(".NAGOYA, .FUKUOKA, .SENDAI, .KANAGAWA").removeClass("active");
        }
    });

    for (let i = 1; i <= 10; i++) {
        if (i === 4) $(".tab-Day4").addClass("active");
        else $(".tab-Day" + i).removeClass("active");
    }

});

$(".tab-Day5").on("click", function () {

    displayList.forEach(function (cls) {
        if (cls === "FUKUOKA-day1") {
            $("." + cls).removeClass("none").addClass("look");
            $(".FUKUOKA").addClass("active");
        } else {
            $("." + cls).removeClass("look").addClass("none");
            $(".NAGOYA, .OSAKA, .SENDAI, .KANAGAWA").removeClass("active");
        }
    });

    for (let i = 1; i <= 10; i++) {
        if (i === 5) $(".tab-Day5").addClass("active");
        else $(".tab-Day" + i).removeClass("active");
    }

});

$(".tab-Day6").on("click", function () {

    displayList.forEach(function (cls) {
        if (cls === "FUKUOKA-day2") {
            $("." + cls).removeClass("none").addClass("look");
            $(".FUKUOKA").addClass("active");
        } else {
            $("." + cls).removeClass("look").addClass("none");
            $(".NAGOYA, .OSAKA, .SENDAI, .KANAGAWA").removeClass("active");
        }
    });

    for (let i = 1; i <= 10; i++) {
        if (i === 6) $(".tab-Day6").addClass("active");
        else $(".tab-Day" + i).removeClass("active");
    }

});

$(".tab-Day7").on("click", function () {

    displayList.forEach(function (cls) {
        if (cls === "SENDAI-day1") {
            $("." + cls).removeClass("none").addClass("look");
            $(".SENDAI").addClass("active");
        } else {
            $("." + cls).removeClass("look").addClass("none");
            $(".NAGOYA, .OSAKA, .FUKUOKA, .KANAGAWA").removeClass("active");
        }
    });

    for (let i = 1; i <= 10; i++) {
        if (i === 7) $(".tab-Day7").addClass("active");
        else $(".tab-Day" + i).removeClass("active");
    }

});

$(".tab-Day8").on("click", function () {

    displayList.forEach(function (cls) {
        if (cls === "SENDAI-day2") {
            $("." + cls).removeClass("none").addClass("look");
            $(".SENDAI").addClass("active");
        } else {
            $("." + cls).removeClass("look").addClass("none");
            $(".NAGOYA, .OSAKA, .FUKUOKA, .KANAGAWA").removeClass("active");
        }
    });

    for (let i = 1; i <= 10; i++) {
        if (i === 8) $(".tab-Day8").addClass("active");
        else $(".tab-Day" + i).removeClass("active");
    }

});

$(".tab-Day9").on("click", function () {

    displayList.forEach(function (cls) {
        if (cls === "KANAGAWA-day1") {
            $("." + cls).removeClass("none").addClass("look");
            $(".KANAGAWA").addClass("active");
        } else {
            $("." + cls).removeClass("look").addClass("none");
            $(".NAGOYA, .OSAKA, .FUKUOKA, .SENDAI").removeClass("active");
        }
    });

    for (let i = 1; i <= 10; i++) {
        if (i === 9) $(".tab-Day9").addClass("active");
        else $(".tab-Day" + i).removeClass("active");
    }

});

$(".tab-Day10").on("click", function () {

    displayList.forEach(function (cls) {
        if (cls === "KANAGAWA-day2") {
            $("." + cls).removeClass("none").addClass("look");
            $(".KANAGAWA").addClass("active");
        } else {
            $("." + cls).removeClass("look").addClass("none");
            $(".NAGOYA, .OSAKA, .FUKUOKA, .SENDAI").removeClass("active");
        }
    });

    for (let i = 1; i <= 10; i++) {
        if (i === 10) $(".tab-Day10").addClass("active");
        else $(".tab-Day" + i).removeClass("active");
    }

});

const displayLists = [
    "Hong-Kong-day",
    "Korea-day",
    "Singapore-day",
    "Malaysia-day",
    "Indonesia-day",
    "Taiwan-day",
    "Yokohama-day"
];

$(".tab-Day1").on("click", function () {

    // 表示切り替え（ifでまとめる）
    displayLists.forEach(function (cls) {
        if (cls === "Hong-Kong-day") {
            $("." + cls).removeClass("none").addClass("look").addClass("active");  // 表示
            $(".Hong-Kong").addClass("active");
        } else {
            $("." + cls).removeClass("look").addClass("none");  // 非表示
            $(".Korea, .Singapore, .Malaysia, .Indonesia, .Taiwan, .Yokohama").removeClass("active");
        }
    });

    // active 切り替え（ifでまとめる）
    for (let i = 1; i <= 10; i++) {
        if (i === 1) {
            $(".tab-Day1").addClass("active");   // Day1 を active
        } else {
            $(".tab-Day" + i).removeClass("active");  // ほかは非 active
        }
    }

});

$(".tab-Day2").on("click", function () {

    displayLists.forEach(function (cls) {
        if (cls === "Korea-day") {
            $("." + cls).removeClass("none").addClass("look");
            $(".Korea").addClass("active");
        } else {
            $("." + cls).removeClass("look").addClass("none");
            $(".Hong-Kong, .Singapore, .Malaysia, .Indonesia, .Taiwan, .Yokohama").removeClass("active");
        }
    });

    for (let i = 1; i <= 10; i++) {
        if (i === 2) $(".tab-Day2").addClass("active");
        else $(".tab-Day" + i).removeClass("active");
    }

});

$(".tab-Day3").on("click", function () {

    displayLists.forEach(function (cls) {
        if (cls === "Singapore-day") {
            $("." + cls).removeClass("none").addClass("look");
            $(".Singapore").addClass("active");
        } else {
            $("." + cls).removeClass("look").addClass("none");
            $(".Hong-Kong, .Korea, .Malaysia, .Indonesia, .Taiwan, .Yokohama").removeClass("active");
        }
    });

    for (let i = 1; i <= 10; i++) {
        if (i === 3) $(".tab-Day3").addClass("active");
        else $(".tab-Day" + i).removeClass("active");
    }

});

$(".tab-Day4").on("click", function () {

    displayLists.forEach(function (cls) {
        if (cls === "Malaysia-day") {
            $("." + cls).removeClass("none").addClass("look");
            $(".Malaysia").addClass("active");
        } else {
            $("." + cls).removeClass("look").addClass("none");
            $(".Hong-Kong, .Korea, .Singapore, .Indonesia, .Taiwan, .Yokohama").removeClass("active");
        }
    });

    for (let i = 1; i <= 10; i++) {
        if (i === 4) $(".tab-Day4").addClass("active");
        else $(".tab-Day" + i).removeClass("active");
    }

});

$(".tab-Day5").on("click", function () {

    displayLists.forEach(function (cls) {
        if (cls === "Indonesia-day") {
            $("." + cls).removeClass("none").addClass("look");
            $(".Indonesia").addClass("active");
        } else {
            $("." + cls).removeClass("look").addClass("none");
            $(".Hong-Kong, .Korea, .Singapore, .Malaysia, .Taiwan, .Yokohama").removeClass("active");
        }
    });

    for (let i = 1; i <= 10; i++) {
        if (i === 5) $(".tab-Day5").addClass("active");
        else $(".tab-Day" + i).removeClass("active");
    }

});

$(".tab-Day6").on("click", function () {

    displayLists.forEach(function (cls) {
        if (cls === "Taiwan-day") {
            $("." + cls).removeClass("none").addClass("look");
            $(".Taiwan").addClass("active");
        } else {
            $("." + cls).removeClass("look").addClass("none");
            $(".Hong-Kong, .Korea, .Singapore, .Malaysia, .Indonesia, .Yokohama").removeClass("active");
        }
    });

    for (let i = 1; i <= 10; i++) {
        if (i === 6) $(".tab-Day6").addClass("active");
        else $(".tab-Day" + i).removeClass("active");
    }

});

$(".tab-Day7").on("click", function () {

    displayLists.forEach(function (cls) {
        if (cls === "Yokohama-day") {
            $("." + cls).removeClass("none").addClass("look");
            $(".Yokohama").addClass("active");
        } else {
            $("." + cls).removeClass("look").addClass("none");
            $(".Hong-Kong, .Korea, .Singapore, .Malaysia, .Indonesia, .Taiwan").removeClass("active");
        }
    });

    for (let i = 1; i <= 10; i++) {
        if (i === 7) $(".tab-Day7").addClass("active");
        else $(".tab-Day" + i).removeClass("active");
    }

});



// 都市クラスをまとめて取得
let city = document.querySelectorAll('.NAGOYA, .OSAKA, .FUKUOKA, .SENDAI, .KANAGAWA, .Hong-Kong, .Korea, .Singapore, .Malaysia, .Indonesia, .Taiwan, .Yokohama');

for (let cities of city) {

    cities.addEventListener('mouseenter', function () {
        let days = cities.querySelector('.days');
        days.classList.add('open');
    });

    cities.addEventListener('mouseleave', function () {
        let days = cities.querySelector('.days');
        days.classList.remove('open');
    });
}