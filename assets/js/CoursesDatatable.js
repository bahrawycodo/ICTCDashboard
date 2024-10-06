(function ($) {
    $.fn.customDataTable = function (options) {
        var $datatable = $(this);
        var settings = $.extend({
            afterLoad:function (){},
            loadUrl: '', // URL to load data
            lang:'ar',
            rowTemplate: '', // Template string without foreach loop
            cardTemplate: '' // Template for generating HTML card structures
        }, options);

        function handlePagination(total, length, current) {
            let html = '';
            let pages = Math.ceil(total / length);
            let previousLink = `<li class="paginate_button page-item previous ${current === 1 ? 'disabled' : ''}">
                                    <a href="#" class="page-link" data-page="prev"><i class="fa-solid fa-angle-${settings.lang=='rtl' ?'right' :'left'}"></i></a>
                                </li>`;
            let nextLink = `<li class="paginate_button page-item next ${current === pages ? 'disabled' : ''}">
                                <a href="#" class="page-link" data-page="next"><i class="fa-solid fa-angle-${settings.lang=='rtl' ?'left' :'right'}"></i></a>
                            </li>`;

            html += previousLink;

            for (let i = 1; i <= pages; ++i) {
                html += `<li class="paginate_button page-item ${current === i ? 'active' : ''}">
                            <a href="#" class="page-link" data-page="${i}">${i}</a>
                         </li>`;
            }

            html += nextLink;

            return html;
        }

        function handleInfo(start, length, total) {
            start = total === 0 ? 0 : start;
            let end = total== 0 ?0:start + length - 1;
            end = total < end ? total : end;
            if(settings.lang =='en')
                return ` Show Results ${start} - ${end} From ${total}`;
            else
                return ` عرض نتائج ${start} - ${end} من ${total}`;

        }
        function  handleSelectText(){
            if(settings.lang =='en')
            {
                $datatable.find('.dataTables_length span').text("Number of items per page");
                $datatable.find('.DataHeader .SearchInput .form-label').text("What is the name of the program you are looking for?");
                $datatable.find('.DataHeader .SearchInput .form-control').attr("placeholder","Training program name");
                $datatable.find('.DataHeader .CityLabel').text("Choose City");
                $datatable.find('.DataHeader .MonthLabel').text("Choose Month");
                $datatable.find('.DataHeader .GridTableSearch').text("Search");

            }
            else
            {
                $datatable.find('.dataTables_length span').text("عدد العناصر في الصفحة");
                $datatable.find('.DataHeader .SearchInput .form-label').text("ماهو اسم البرنامج الذي تبحث عنه ؟");
                $datatable.find('.DataHeader .SearchInput .form-control').attr("placeholder","اسم البرنامج التدريبي");
                $datatable.find('.DataHeader .CityLabel').text("اختر المدينة");
                $datatable.find('.DataHeader .MonthLabel').text("اختر الشهر");
                $datatable.find('.DataHeader .GridTableSearch').text("بحث");


            }
        }
        function getDraw(pagination = 1) {
            let draw = 1;
            if (pagination === 'prev') {
                draw = parseInt($datatable.find('.pagination .paginate_button.active .page-link').text()) - 1;
            } else if (pagination === 'next') {
                draw = parseInt($datatable.find('.pagination .paginate_button.active .page-link').text()) + 1;
            } else {
                draw = parseInt(pagination);
            }
            return draw;
        }

        function setZero() {
            $datatable.find('.dataTables_info').text(handleInfo(0, 0, 0));
            handleSelectText();
            $datatable.find('.pagination').html(handlePagination(0, 0, 0, 0));
            $datatable.find('tbody').html('');
        }

        function generateRows(data) {
            let html = '';
            $.each(data, function (key, value) {
                html += settings.rowTemplate
                    .replace(/\{\{title\}\}/g, value.title)
                    .replace(/\{\{location\}\}/g, value.location)
                    .replace(/\{\{dateFrom\}\}/g, value.dateFrom)
                    .replace(/\{\{dateTo\}\}/g, value.dateTo)
                    .replace(/\{\{status\}\}/g, value.status)
                    .replace(/\{\{statusEn\}\}/g, value.status == 'أونلاين'? 'online':'attendance')
                    .replace(/\{\{price\}\}/g, value.price || '0 $')
                    .replace(/\{\{Link\}\}/g, value.Link||'#');
            });
            return html;
        }

        function generateCards(data) {
            let html = '';
            $.each(data, function (key, value) {
                html += settings.cardTemplate
                    .replace(/\{\{imageSrc\}\}/g, value.imageSrc || 'assets/images/Page-Courses/1.png')
                    .replace(/\{\{title\}\}/g, value.title)
                    .replace(/\{\{evaluation\}\}/g, value.evaluation || '0')
                    .replace(/\{\{location\}\}/g, value.location)
                    .replace(/\{\{dateFrom\}\}/g, value.dateFrom)
                    .replace(/\{\{dateTo\}\}/g, value.dateTo)
                    .replace(/\{\{price\}\}/g, value.price || '0 $')
                    .replace(/\{\{link\}\}/g, value.link || '#');
            });
            return html;
        }

        function loadData(pagination = 1) {
            setZero();
            $datatable.find('.loading').fadeIn(1);
            let search = $datatable.find('.searchinput').val();
            let length = parseInt($datatable.find('.dataTables_length select option:selected').val()) || 10;
            let draw = getDraw(pagination);
            let start = length * (draw - 1);

            $.post(settings.loadUrl, { 'mdl': { "search[value]": search, length, draw, start } }, function (res) {
                $datatable.find('.loading').fadeOut(1);
                if (res !== "") {
                    console.log(settings.lang)
                    $datatable.find('.dataTables_info').text(handleInfo(start + 1, length, res.iTotalRecords));
                    handleSelectText();
                    $datatable.find('.pagination').html(handlePagination(res.iTotalRecords, length, draw));
                    $datatable.find(".DataTable").find('tbody').html(generateRows(res.data));
                    $datatable.find('.DataGrid').html(generateCards(res.data)); // Assuming you have a container for cards
                    settings.afterLoad();
                } else {
                    setZero();
                }
            });
        }

        $datatable.on("click", ".pagination .paginate_button:not(.active) .page-link", function (e) {
            e.preventDefault();
            let page = $(e.target).attr('data-page');
            loadData(page);
        });
        $datatable.on("change", ".tblData_length", function (e) {
            e.preventDefault();
            loadData();
        });

        loadData();

        return this;
    };
}(jQuery));
