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
