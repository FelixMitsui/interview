
const carouselFirst = new Carousel('#carousel-first');
const carouselSecond = new Carousel('#carousel-second');
function debounce(fn, delay) {
    let timeId = null;

    return function (...args) {
        if (timeId) clearTimeout(timeId);
        timeId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}


$(document).ready(() => {
    carouselFirst.resetCarousel();
    carouselSecond.resetCarousel();
    $(window).on('resize', debounce(() => {
        carouselFirst.resetCarousel();
        carouselSecond.resetCarousel();

        if ($(window).width() >= 992) {
            console.log($(window).width() >= 992)
            $('#header-navbar').show(500);
        }
    }, 1000));

    $('#menu-icon').click(function () {
        $('#header-navbar').slideToggle(500);
    });

    $(window).scroll(function () {
        if (($(this).scrollTop() >= ($('#about').position().top) / 2)) {
            $('.about-content').css('animation', 'slide-up 1s ease-in-out forwards');
            $(window).off('scroll.aboutAnimation');
        }
    });
    $(window).scroll(function () {
        const scrollTop = $(this).scrollTop();

        if ($('#about').position().top <= scrollTop && scrollTop < $('#project').position().top) {
            $('.navbar-link').removeClass('active');
            $('a[href="#about"]').addClass('active');
        } else if (scrollTop >= $('#project').position().top) {
            $('.navbar-link').removeClass('active');
            $('a[href="#project"]').addClass('active');
        } else {
            $('.navbar-link').removeClass('active');
            $('a[href="#home"]').addClass('active');
        }
    });
})

function expandImage(image, event) {
    $("#project-img").attr('src', image.src);
    $(".expand-img").css('display', 'flex');
}

function CollapseImage() {
    $("#project-img").attr('src', '');
    $(".expand-img").css('display', 'none');
}

function handleFocus(nav) {
    $('.navbar-link').removeClass('active');
    $(nav).addClass('active');
}

function handleScroll() {
    if ($(window).scrollTop() !== 0) {
        $('.navbar-link').removeClass('active');
        $('a[href="#home"]').addClass('active');
        $(window).scrollTop(0)
    }
}

const texts = ["無相關工作經驗", "無參加訓練課程"];
const typingSpeed = 180;
const deletionSpeed = 180;
const pauseDuration = 1500;

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const element = document.getElementById("typing-effect");
    const currentText = texts[textIndex];

    if (isDeleting) {
        element.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        element.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeWriter, pauseDuration);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex++;
        if (textIndex === texts.length) {
            textIndex = 0;
        }
        setTimeout(typeWriter, typingSpeed);
    } else {
        setTimeout(typeWriter, isDeleting ? deletionSpeed : typingSpeed);
    }
}

typeWriter();
