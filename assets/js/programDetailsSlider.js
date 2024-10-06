(function ($) {
    $.fn.imageSlider = function (options) {
        // Default settings
        var settings = $.extend({
            autoMove: false,  // Default value for auto move
            interval: 3000    // Default interval for auto move (in milliseconds)
        }, options);

        return this.each(function () {
            var $slider = $(this);
            var $items = $slider.find('.slider-item');
            var totalItems = $items.length;
            var autoMoveInterval;
            var isAnimating = false; // Prevent double animations
            var currentIndex = 0; // Track the current slide

            // Wrap items in a container for sliding effect
            $slider.wrapInner('<div class="slider-inner"></div>');
            var $sliderInner = $slider.find('.slider-inner');
            var $sliderItems = $slider.find('.slider-item');

            // Initial setup
            $sliderInner.css({
                'width': (totalItems * 100) + '%',  // Set width of inner container
                'display': 'flex',  // Ensure flexbox layout for sliding
                'transition': 'transform 0.8s ease-in-out'  // Smoother transition
            });
            $items.css('width', (100 / totalItems) + '%');  // Set width of each item

            // Generate indicators
            var $indicators = $('<ol class="slider-indicators"></ol>');

            for (var i = 0; i < totalItems; i++) {
                var indicator = $('<li data-slide-to="' + i + '"></li>');
                if (i === 0) indicator.addClass('active');
                $indicators.append(indicator);
            }

            $slider.append($indicators);

            // Generate navigation arrows
            var $prevArrow = $('<a class="slider-prev" href="#"><i class=" fa-solid fa-chevron-left"></i></a>');
            var $nextArrow = $('<a class="slider-next" href="#"><i class=" fa-solid fa-chevron-right"></i></a>');
            $slider.append($prevArrow).append($nextArrow);

            //From Img to background img
            for (var i = 0; i < totalItems; i++) {
                $sliderItems[i].style.backgroundImage  = 'url(' + $sliderItems[i].querySelector('img').src + ')';
                $sliderItems[i].querySelector('img').remove()
            }
            // Handle slide change with animation
            function goToSlide(index) {
                if (isAnimating) return; // Prevent animation overlap
                isAnimating = true;

                // Update active classes
                $indicators.find('li').removeClass('active').eq(index).addClass('active');

                // Animate the slider using transform
                var newTransform = -index * 100/totalItems + '%';
                $sliderInner.css('transform', 'translateX(' + newTransform + ')');

                setTimeout(function() {
                    isAnimating = false;  // Reset animation flag after animation ends
                }, 800); // Match the transition duration

                currentIndex = index; // Update current index
            }

            // Handle previous and next arrows
            $prevArrow.click(function (e) {
                e.preventDefault();
                if (isAnimating) return; // Prevent double clicks during animation
                var newIndex = (currentIndex === 0) ? totalItems - 1 : currentIndex - 1;
                goToSlide(newIndex);
            });

            $nextArrow.click(function (e) {
                e.preventDefault();
                if (isAnimating) return; // Prevent double clicks during animation
                var newIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
                goToSlide(newIndex);
            });

            // Handle indicator click
            $indicators.find('li').click(function () {
                var index = $(this).data('slide-to');
                goToSlide(index);
            });

            // Auto move functionality
            if (settings.autoMove) {
                autoMoveInterval = setInterval(function () {
                    var newIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
                    goToSlide(newIndex);
                }, settings.interval);
            }

            // Pause auto move on hover
            $slider.hover(
                function () {
                    clearInterval(autoMoveInterval);
                },
                function () {
                    if (settings.autoMove) {
                        autoMoveInterval = setInterval(function () {
                            var newIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
                            goToSlide(newIndex);
                        }, settings.interval);
                    }
                }
            );
        });
    };
}(jQuery));
