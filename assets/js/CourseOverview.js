(function ($) {
    $.fn.courseOverview = function (options) {
        const $container = $(this);
        let lang = document.dir;

        // Default Options
        const defaults = {
            Methodology:'',
                TargetGroups:'',
                CourseGoals:[],
                CourseTargets:[]
            // renderType: 'edit', // 'edit' or 'list'
        };
        const settings = $.extend({}, defaults, options);

        function renderCourseGoalsForm(){
            let rowsContent = '';
            settings.CourseGoals.forEach(row => {
                rowsContent+=`   <tr>
                        <td class="align-middle">
                            <input type="text" class="form-control item-input" value="${row}">
                        </td>
                        <td class="align-middle">
                            <div class="d-flex gap-1">
                                <button class="btn btn-danger removeCourseGoal">${lang === 'rtl' ? 'حذف' : 'Delete'} </button>
                            </div>
                        </td>`;
            })
            $container.find('.editSection .CourseGoals').html(rowsContent);
        }
        function renderTargetCompetenciesForm(){
            let rowsContent = '';
            settings.CourseTargets.forEach(row => {
                rowsContent+=`   <tr>
                        <td class="align-middle">
                            <input type="text" class="form-control item-input" value="${row}">
                        </td>
                        <td class="align-middle">
                            <div class="d-flex gap-1">
                                <button class="btn btn-danger removeCourseTarget">${lang === 'rtl' ? 'حذف' : 'Delete'} </button>
                            </div>
                        </td>`;
            })
            $container.find('.editSection .TargetCompetencies').html(rowsContent);
        }

        $container.on('click', '.addCourseGoal', function () {
            const newRow = `
            <tr>
                <td><input type="text" class="form-control item-input" value=""></td>
                <td>
                    <div class="d-flex gap-1">
                        <button class="btn btn-danger removeCourseGoal">${lang === 'rtl' ? 'حذف' : 'Delete'} </button>
                    </div>
                </td>
            </tr>`;
            $container.find('.editSection .CourseGoals').append(newRow);

        });
        $container.on('click', '.removeCourseGoal', function () {
            const $currentRow = $(this).closest('tr');
            const $editableList = $currentRow.closest('.CourseGoals');
            const rows = $editableList.children('tr').length;
            if (rows > 1) {
                $currentRow.remove();
            } else {
                alert('لا يمكن حذف العنصر الأخير.');
            }
        });

        $container.on('click', '.addCourseTarget', function () {
            const newRow = `
            <tr>
                <td><input type="text" class="form-control item-input" value=""></td>
                <td>
                    <div class="d-flex gap-1">
                        <button class="btn btn-danger removeCourseTarget">${lang === 'rtl' ? 'حذف' : 'Delete'} </button>
                    </div>
                </td>
            </tr>`;
            $container.find('.editSection .TargetCompetencies').append(newRow);
        });
        $container.on('click', '.removeCourseTarget', function () {
            const $currentRow = $(this).closest('tr');
            const $editableList = $currentRow.closest('.TargetCompetencies');
            const rows = $editableList.children('tr').length;
            if (rows > 1) {
                $currentRow.remove();
            } else {
                alert('لا يمكن حذف العنصر الأخير.');
            }
        });
        function  renderCourseGoals(data=[]){

            let rowsContent = '';
            data.forEach(row => {
                rowsContent+=`   <li>${row}</li>`;
            })
            $container.find('.originalContent .CourseGoals').html(rowsContent);
        }
        function  renderTargetCompetencies(data=[]){

            let rowsContent = '';
            data.forEach(row => {
                rowsContent+=`   <li>${row}</li>`;
            })
            $container.find('.originalContent .TargetCompetencies').html(rowsContent);
        }


        function  renderAsForm(){
            $container.find('.editSection .methodology').val(settings?.Methodology)
            $container.find('.editSection .TargetGroups').val(settings?.TargetGroups)
            renderCourseGoalsForm();
            renderTargetCompetenciesForm();
        }
        function  renderAsList(data={}){
            $container.find('.originalContent .methodology').text(data?.Methodology)
            $container.find('.originalContent .TargetGroups').text(data?.TargetGroups)
            renderCourseGoals(data.CourseGoals);
            renderTargetCompetencies(data.CourseTargets);
        }
        function getUpdatedData(){
            const data = {
                Methodology:'',
                TargetGroups:'',
                CourseGoals:[],
                CourseTargets:[]
            };
            data.Methodology = $container.find('.editSection .methodology').val();
            data.TargetGroups = $container.find('.editSection .TargetGroups').val();
            $container.find('.editSection .CourseGoals input').each(function () {
                const goal = $(this).val().trim();
                if (goal) {
                    data.CourseGoals.push(goal);
                }
            });
            $container.find('.editSection .TargetCompetencies input').each(function () {
                const target = $(this).val().trim();
                if (target) {
                    data.CourseTargets.push(target);
                }
            });

            return data;
        }
        this.getUpdatedData = getUpdatedData();
        $container.on('input change', '.item-input', function () {
            renderAsList(getUpdatedData()); // Sync with the list view
        });

        renderAsForm();
        renderAsList(settings);
        return this;
    }
})(jQuery);
