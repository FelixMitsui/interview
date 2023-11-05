class Carousel {
    constructor(containerSelector) {
        this.carouselWrap = $(containerSelector);
        this.positionX = 0;
        this.containerWidth = this.carouselWrap.width();
        this.carouselLen = this.carouselWrap.children().length;
        this.totalInnerWidth = this.carouselWrap.children().first().outerWidth() * this.carouselLen;
        this.maxPositionX = this.totalInnerWidth - this.containerWidth;
    }

    resetCarousel() {
        this.currentWidth = 0;
        this.positionX = 0;
        this.containerWidth = this.carouselWrap.width();
        this.carouselLen = this.carouselWrap.children().length;
        this.totalInnerWidth = this.carouselWrap.children().first().outerWidth() * this.carouselLen;
        this.maxPositionX = this.totalInnerWidth - this.containerWidth;
        this.carouselWrap.css('transform', `translateX(0px)`);
        $('.project-carousel button:nth-of-type(2)').css('opacity', '60%').prop('disabled', false);
    }

    handleToggleCarousel(event) {
        const target = event.currentTarget;
        const arrow = target.id;

        if (arrow === 'left') {
            if (Math.abs(this.positionX) <= this.containerWidth) {
                $(target).css('opacity', '40%').prop('disabled', true);

                this.positionX = 0;
            } else {
                this.positionX += this.containerWidth;
            }
            $(target).siblings('button:nth-of-type(2)').css('opacity', '60%').prop('disabled', false);
            this.carouselWrap.css('transform', `translateX(${this.positionX}px)`);
        } else {

            $(target).siblings('button:nth-of-type(1)').css('opacity', '60%').prop('disabled', false);

            if (Math.abs(this.positionX - this.containerWidth) >= this.maxPositionX) {
                $(target).css('opacity', '40%').prop('disabled', true);
                this.positionX = -this.maxPositionX;
            } else {
                this.positionX -= this.containerWidth;
            }
            this.carouselWrap.css('transform', `translateX(${this.positionX}px)`);
        }
    }

    handleTouchCarousel() {

        let startX = 0;
        let deltaX = 0;
        let isDragging = false;
        let currentX = 0;

        this.carouselWrap.on("mousedown touchstart", function (event) {
            event.stopPropagation();
            event.preventDefault();

            isDragging = true;
            //Mouse on the current positionX
            startX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
            $(this).css({
                'transition': 'all 0.8s ease'
            });

            $(this).on("mousemove touchmove", function (event) {

                if (!isDragging) return;

                currentX = event.type === 'mousemove' ? event.clientX : event.touches[0].clientX;

                deltaX = (startX - currentX);


            });

        });

        this.carouselWrap.on("mouseup touchend", (event) => {

            console.log(currentX)
            if (currentX === 0) {
                this.expandImage(event);
                startX = 0;
                currentX = 0;
                return;
            }

            isDragging = false;

            if (Math.abs(this.positionX - this.containerWidth) >= this.maxPositionX && deltaX >= 0) {
                this.positionX = -this.maxPositionX;

            } else if (Math.abs(this.positionX) <= this.containerWidth && deltaX <= 0) {


                this.positionX = 0;

            } else {

                if (deltaX <= -150) {

                    this.positionX += this.containerWidth;

                } else if (deltaX >= 150) {
                    this.positionX -= this.containerWidth;

                }
            }

            deltaX = 0;
            startX = 0;
            currentX = 0;

            this.carouselWrap.css({
                'transform': `translate3d(${this.positionX}px, 0, 0)`,
            });

            this.carouselWrap.off("mousemove touchmove");
        });
    }

    expandImage(event) {

        if (!event.target.src) return;

        $("#project-img").attr('src', event.target.src);
        $(".expand-img").css('display', 'flex');

    }
}