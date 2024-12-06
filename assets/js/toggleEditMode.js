(function ($) {
    $.fn.toggleEditMode = function () {
        this.each(function () {
            const $container = $(this);
            $container.on('click', '.btn.Edit, .btn.Show', function (e) {
                e.preventDefault();
                $(this).hide();
                $(this).siblings('.btn').show();
                $container.find('.originalContent').toggleClass('d-none');
                $container.find('.editSection').toggleClass('d-none');
            });
        });

        return this; // Allow chaining
    };
})(jQuery);
