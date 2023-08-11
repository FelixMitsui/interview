class Carousel {
    constructor(containerSelector) {
        this.carouselWrap = $(containerSelector);
        this.currentWidth = 0;
        this.containerWidth = this.carouselWrap.width();
        this.carouselVisibleCount = this.getVisibleCount();
        this.carouselLen = this.carouselWrap.children().length;
    }

    getVisibleCount() {
        switch (true) {
            case $(window).width() > 768:
                return this.carouselVisibleCount = 2;
                break;
            default:
                return this.carouselVisibleCount = 1;
        }
    }

    resetCarousel() {
        this.currentWidth = 0;
        this.containerWidth = this.carouselWrap.width();
        this.carouselLen = this.carouselWrap.children().length;
        this.carouselWrap.css('transform', `translateX(0px)`);
        $('.project-carousel button:nth-of-type(2)').css('opacity', '60%').prop('disabled', false);
        this.carouselVisibleCount = this.getVisibleCount();
    }

    handleToggleCarousel(event) {
        const target = event.currentTarget;
        const arrow = target.id;
        const totalWidth = (this.containerWidth * this.carouselLen) / this.carouselVisibleCount;

        if (arrow === 'left') {
            if (Math.abs(this.currentWidth) <= 0) {
                $(target).css('opacity', '40%').prop('disabled', true);
                return;
            }
            this.currentWidth += Number(this.containerWidth);
            $(target).siblings('button:nth-of-type(2)').css('opacity', '60%').prop('disabled', false);
            this.carouselWrap.css('transform', `translateX(${this.currentWidth}px)`);
        } else {
            this.currentWidth -= Number((this.containerWidth));
            console.log("currentWidth" + this.currentWidth);
            console.log("totalWidth" + totalWidth);
            console.log("this.carouselVisibleCount" + this.carouselVisibleCount);
            $(target).siblings('button:nth-of-type(1)').css('opacity', '60%').prop('disabled', false);
            if (Math.abs(this.currentWidth) >= totalWidth) {
                $(target).css('opacity', '40%').prop('disabled', true);
                return;
            }
            this.carouselWrap.css('transform', `translateX(${this.currentWidth}px)`);
        }
    }
}
