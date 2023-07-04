// let { debounce } = require("./tools");


function debounce(fn, delay) {
    let timeId = null;

    return function (...args) {
        if (timeId) clearTimeout(timeId);

        timeId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}
class Carousel {
    constructor(containerSelector) {
        this.carouselWrap = $(containerSelector);
        this.currentWidth = 0;
        this.containerWidth = this.carouselWrap.width();
        this.carouselVisibleCount = 1;
        this.carouselLen = this.carouselWrap.children().length;
    }

    resetCarousel() {
        this.currentWidth = 0;
        this.containerWidth = this.carouselWrap.width();
        this.carouselLen = this.carouselWrap.children().length;
        this.carouselWrap.css('transform', `translateX(0px)`);
        $('.project-carousel button:nth-of-type(2)').css('opacity', '60%').prop('disabled', false);

        switch (true) {
            case $(window).width() > 768:
                this.carouselVisibleCount = 2;
                break;
            default:
                this.carouselVisibleCount = 1;
        }
    }

    handleToggleCarousel(event) {
        const target = event.currentTarget;
        const arrow = target.id;
        const totalWidth = this.containerWidth * this.carouselLen / this.carouselVisibleCount;
        if (arrow === 'left') {
            if (Math.abs(this.currentWidth) <= 0) {
                $(target).css('opacity', '40%').prop('disabled', true);
                return;
            }
            this.currentWidth = Number((this.currentWidth + this.containerWidth).toFixed(3));
            $(target).siblings('button:nth-of-type(2)').css('opacity', '60%').prop('disabled', false);
            this.carouselWrap.css('transform', `translateX(${this.currentWidth}px)`);
        } else {
            this.currentWidth = Number((this.currentWidth - this.containerWidth).toFixed(3));

            $(target).siblings('button:nth-of-type(1)').css('opacity', '60%').prop('disabled', false);
            if (Math.abs(this.currentWidth) >= totalWidth) {
                $(target).css('opacity', '40%').prop('disabled', true);
                return;
            }
            this.carouselWrap.css('transform', `translateX(${this.currentWidth}px)`);
        }
    }
}

const carouselFirst = new Carousel('#carousel-first');
const carouselSecond = new Carousel('#carousel-second');
$(document).ready(() => {
    carouselFirst.resetCarousel();
    carouselSecond.resetCarousel();
    $(window).on('resize', debounce(() => {
        carouselFirst.resetCarousel();
        carouselSecond.resetCarousel();
    }, 1000));

    $('#menu-icon').click(function () {
        event.preventDefault();
        $('#header-navbar').slideToggle(500);
    });

    $(window).scroll(function () {
        // console.log($(this).scrollTop())
        // console.log('about-top: ' + $('#about').position().top)
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


// let carouselVisibleCount = 1;
// let currentWidth = 0;
// const projectCarousel = $('.carousel-wrap');
// let containerWidth = projectCarousel.width();
// let carouselLen = projectCarousel.children().length;

// function resetCarousel() {
//     console.log('resize')
//     currentWidth = 0;
//     containerWidth = projectCarousel.width();
//     carouselLen = projectCarousel.children().length;
//     projectCarousel.css('transform', `translateX(0px)`);
//     $('.project-carousel button:nth-of-type(2)').css('opacity', '60%').prop('disabled', false);
//     switch (true) {
//         case $(window).width() > 768:
//             carouselVisibleCount = 2;
//             break;
//         default:
//             carouselVisibleCount = 1;
//     }
// }

// function handleToggleCarousel(event) {

//     const target = event.currentTarget;
//     const arrow = target.id;
//     const totalWidth = containerWidth * carouselLen / carouselVisibleCount;

//     if (arrow === 'left') {
//         if (Math.abs(currentWidth) <= 0) {
//             $('.project-carousel button:nth-of-type(1)').css('opacity', '40%').prop('disabled', true);
//             return;
//         }
//         currentWidth = Number((currentWidth + containerWidth).toFixed(3));
//         $('.project-carousel button:nth-of-type(2)').css('opacity', '60%').prop('disabled', false);
//         projectCarousel.css('transform', `translateX(${currentWidth}px)`);
//     } else {
//         currentWidth = Number((currentWidth - containerWidth).toFixed(3));
//         console.log(currentWidth);
//         console.log(totalWidth);
//         $('.project-carousel button:nth-of-type(1)').css('opacity', '60%').prop('disabled', false);
//         if (Math.abs(currentWidth) >= totalWidth) {
//             $('.project-carousel button:nth-of-type(2)').css('opacity', '40%').prop('disabled', true);
//             return;
//         }
//         projectCarousel.css('transform', `translateX(${currentWidth}px)`);
//     }
// }


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

const texts = ["無相關工作的經驗", "以網頁開發為目標"];
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
