(function($) {
    $.fn.tabs = function() {
        return this.each(function() {
            var $this = $(this);

            // On clicking a tab header
            $this.find('.tab-headers li').on('click', function() {
                var index = $(this).index();

                // Remove active class from all tab headers and add to clicked one
                $this.find('.tab-headers li').removeClass('active');
                $(this).addClass('active');

                // Hide all tab panes and show the one that matches the index
                $this.find('.tab-pane').eq(index).siblings(".tab-pane").fadeOut(100).removeClass("active");
                $this.find('.tab-pane').eq(index).fadeIn(100).addClass("active");

            });
        });
    };
})(jQuery);

// Initialize the plugin
$(document).ready(function() {
    $('.tabs').tabs();
});
