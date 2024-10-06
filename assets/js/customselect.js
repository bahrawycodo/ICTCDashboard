(function($) {
    $.fn.customSelect = function(options) {
        const settings = $.extend(
            {
                awesome: '',
                title: ''
            },
            options
        );

        this.each(function() {
            let $selectElement = $(this);
            let selected = $selectElement.find('option:selected');

            function generate() {
                emptyContainer();
                generateLabel();
                generateListContainer();
                $selectElement.find('select').remove();
            }

            function emptyContainer() {
                $selectElement.find('label').remove();
                $selectElement.find('ul').remove();
                $selectElement.find('input.search').remove();
            }

            function generateLabel() {
                $selectElement.append(
                    `<label class="cp" data-id="${selected.val()}">
            <span>
              <i class="${settings.awesome} ml-2"></i>
              <span class="mainText">
                <span class="ml-1">${settings.title} :</span>
                <span class="b">${selected.text()}</span>
              </span>
            </span>
            <i class="fa-solid fa-chevron-down updown"></i>
          </label>`
                );
            }
            function generateListContainer() {
                // Create the list container that includes the search input and the list
                let $listContainer = $(
                    `<div class="listContainer" style="display:none;">
                        ${generateSearch()}
                        ${generateList()}
                    </div>`
                );
                $selectElement.append($listContainer);
            }
            function generateSearch() {
                return `<input type="text" class="search form-control" placeholder="${document.documentElement.dir == 'rtl' ? 'بحث':'Search'}">`
            }

            function generateList() {
                let html = "<ul>";
                $selectElement.find('option').each(function() {
                    html += `<li data-id="${$(this).val()}" class="cp" ${
                        selected.val() == $(this).val() ? 'selected="selected"' : ''
                    }>${$(this).text()}</li>`;
                });
                html += "</ul>";
                return html;
            }

            function slideToggle() {
                $selectElement.find('.listContainer').toggle();
                $selectElement.toggleClass("open");
                $selectElement.find('label .updown')
                    .toggleClass('fa-chevron-down')
                    .toggleClass('fa-chevron-up');
            }

            $selectElement.on('click', 'label', function() {
                slideToggle();
            });

            $selectElement.on('click', 'ul li', function() {
                $(this)
                    .parent('ul')
                    .parent(".listContainer")
                    .siblings('label')
                    .data('id', $(this).data('id'));
                $(this)
                    .parent('ul')
                    .parent(".listContainer")
                    .siblings('label')
                    .children('span')
                    .children('span')
                    .children('span.b')
                    .text($(this).text());
                $(this).attr("selected",true).siblings("li").attr("selected",false)

                slideToggle();
            });

            $selectElement.on('keyup', 'input.search', function() {
                let searchTerm = $(this).val().toLowerCase();
                $selectElement.find('ul li').each(function() {
                    let text = $(this).text().toLowerCase();
                    $(this).toggle(text.indexOf(searchTerm) > -1);
                });
            });

            $(document).on('click', function(e) {
                if ($selectElement.has(e.target).length === 0) {
                    $selectElement.find('.listContainer').hide();
                    $selectElement.removeClass("open");
                }
            });

            generate();
        });

        return this;
    };

    $.fn.getSelectVal = function() {
        return this.find('label').data('id');
    };

    $.fn.getSelectText = function() {
        return this.find('label .mainText span.b').text();
    };

    $.fn.generateSelect = function() {
        return this.each(function() {
            $(this).customSelect({
                awesome: $(this).data('awesome'),
                title: $(this).data('title')
            });
        });
    };
})(jQuery);
