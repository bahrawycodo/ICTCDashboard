(function ($) {
    $.fn.courseManager = function (options) {
        const $container = $(this);
        let CourseSectionCount = 0;
        let lang = document.dir;
        // Default Options
        const defaults = {
            data: [],
            // renderType: 'edit', // 'edit' or 'list'
        };
        const settings = $.extend({}, defaults, options);

        // Utility Function to Create Editable Sections
        function createCourseSection(data = {}) {
            CourseSectionCount++;
            const sectionId = `section-${CourseSectionCount}`;
            const headerValue = data.header || `Section ${CourseSectionCount}`;
            const rows = data.rows || [{ text: '', subItems: [] }];
            const newSection = $(`
                <div class="col-md-12 section mb-3" id="${sectionId}">
                    <div class="card box-shadow-0 border-1">
                        <div class="card-header">
                            <div class="row">
                                <div class="col-md-8">
                                    <input type="text" class="form-control section-header" value="${headerValue}" placeholder="${lang === 'rtl' ? 'ادخل اسم السيكشن' : 'Enter Choose Name'}">
                                </div>
                                <div class="col-md-4">
                                    <div class="d-flex gap-2">
                                        <button class="btn btn-primary addCourseSection">${lang === 'rtl' ? 'اضف سيكشن جديد' : 'Add New Section'}</button>
                                        <button class="btn btn-info addCourseItem">${lang === 'rtl' ? 'اضف عنصر' : 'Add Item'} </button>
                                        <button class="btn btn-danger removeCourseSection">${lang === 'rtl' ? 'حذف السيكشن' : 'Delete Section'} </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>${lang === 'rtl' ? 'نص العنصر' : 'Item Text'} </th>
                                                <th>${lang === 'rtl' ? 'الحدث' : 'Action'} </th>
                                                <th>${lang === 'rtl' ? 'العناصر الفرعية' : 'Sub Items'} </th>
                                            </tr>
                                        </thead>
                                        <tbody class="editableList"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);

            const editableList = newSection.find('.editableList');

            rows.forEach(row => {
                let subRowsContent = '';
                row.subItems.forEach(subItem => {
                    subRowsContent += `
                        <div class="d-flex align-items-center gap-2 mb-2">
                            <input type="text" class="form-control item-input" value="${subItem.text}">
                            <button class="btn btn-danger removeCourseSubItem">${lang === 'rtl' ? 'حذف' : 'Delete'} </button>
                        </div>`;
                });

                const rowElement = $(`
                    <tr>
                        <td class="align-middle">
                            <input type="text" class="form-control item-input" value="${row.text}">
                        </td>
                        <td class="align-middle">
                            <div class="d-flex gap-1">
                                <button class="btn btn-secondary addCourseSubItem">${lang === 'rtl' ? 'اضف عنصر فرعي' : 'Add Sub Item'} </button>
                                <button class="btn btn-danger removeCourseItem">${lang === 'rtl' ? 'حذف' : 'Delete'} </button>
                            </div>
                        </td>
                        <td colspan="2">
                            ${subRowsContent}
                        </td>
                    </tr>`);
                editableList.append(rowElement);
            });

            $container.find(".editSection").append(newSection);
            renderAsList(getUpdatedData());
        }
        function getUpdatedData() {
            const data = [];
            $container.find('.section').each(function () {
                const $section = $(this);
                const header = $section.find('.section-header').val();
                const rows = [];
                $section.find('.editableList tr').each(function () {
                    const $row = $(this);
                    const text = $row.find('.item-input').first().val();
                    const subItems = [];
                    $row.find('td:nth-child(3) .item-input').each(function () {
                        subItems.push({ text: $(this).val() });
                    });
                    rows.push({ text, subItems });
                });
                data.push({ header, rows });
            });
            return data;
        }
        // Render Editable Sections
        function createCourseSections(data = []) {
            $container.find(".editSection").empty();
            data.forEach(section => createCourseSection(section));
        }
        $container.on('click', '.addCourseSection', function () {
            createCourseSection();
        });

        $container.on('click', '.removeCourseSection', function () {
            $(this).closest('.section').remove();
            renderAsList(getUpdatedData());

        });

        $container.on('click', '.addCourseItem', function () {
            const newRow = `
            <tr>
                <td><input type="text" class="form-control item-input" value=""></td>
                <td>
                    <div class="d-flex gap-1">
                        <button class="btn btn-secondary addCourseSubItem">${lang === 'rtl' ? 'اضف عنصر فرعي' : 'Add Sub Item'} </button>
                        <button class="btn btn-danger removeCourseItem">${lang === 'rtl' ? 'حذف' : 'Delete'} </button>
                    </div>
                </td>
                <td></td>
            </tr>`;
            $(this).closest('.card-body').find('.editableList').append(newRow);
            renderAsList(getUpdatedData());

        });

        $container.on('click', '.addCourseSubItem', function () {
            const subRow = `
            <div class="d-flex align-items-center gap-2 mb-2">
                <input type="text" class="form-control item-input" value="">
                <button class="btn btn-danger removeCourseSubItem">${lang === 'rtl' ? 'حذف' : 'Delete'} </button>
            </div>`;
            $(this).closest('td').next().append(subRow);
            renderAsList(getUpdatedData());
        });
jj
        $container.on('click', '.removeCourseSubItem', function () {
            $(this).parent().remove();
            renderAsList(getUpdatedData());
        });

        $container.on('click', '.removeCourseItem', function () {
            const $currentRow = $(this).closest('tr');
            const $editableList = $currentRow.closest('.editableList');
            const rows = $editableList.children('tr').length;
            if (rows > 1) {
                $currentRow.remove();
                renderAsList(getUpdatedData());

            } else {
                alert('لا يمكن حذف العنصر الأخير.');
            }

        });
        // Render List Format
        function renderAsList(data = []) {
            $container.find(".originalContent").empty();
            data.forEach(section => {
                const listItems = section.rows.map(row => {
                    const subItems = row.subItems.map(sub => `<li>${sub.text}</li>`).join('');
                    return `
                        <li>${row.text}
                            ${subItems ? `<ul>${subItems}</ul>` : ''}
                        </li>`;
                }).join('');

                const sectionHTML = `
                    <div class="col-md-6">
                        <div class="group full">
                            <h4>${section.header}</h4>
                            <ul class="d-flex column-gap-5 flex-wrap m-0 p-0">${listItems}</ul>
                        </div>
                    </div>`;
                $container.find(".originalContent").append(sectionHTML);
            });
        }
        $container.on('input change', '.section-header, .item-input', function () {
            renderAsList(getUpdatedData()); // Sync with the list view
        });
        this.getUpdatedData = getUpdatedData();
            createCourseSections(settings.data);
            renderAsList(settings.data);
        return this;
    };
})(jQuery);
