(function ($) {
    $.fn.lineSlider = function (steps) {
        return this.each(function () {
            var $ul = $(this);

            // Clear any existing content
            $ul.empty();

            // Loop through the steps and create the corresponding li elements
            steps.forEach(function (step, index) {
                var isActive = step.active ? 'active' : ''
                var isCompleted = step.completed? 'completed' : '';
                var li = `
                    <li class="step ${isActive} ${isCompleted}">
                        <div class="step-point"></div>
                        <span class="step-text">${step.name}</span>
                    </li>
                `;
                $ul.append(li);
            });

            // Apply styles to all previous steps before the active one
            $ul.find('.step').each(function (index) {
                if ($(this).hasClass('active')) {
                    $(this).prevAll().addClass('completed');
                }
            });
        });
    };
}(jQuery));
