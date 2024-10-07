$(document).ready(function(){
    toggleSubmenu();
    handleSide();
});
function applyResponsiveBehavior() {
    var windowWidth = $(window).width(); // Get the window's current width
    if (windowWidth < 768) {
        closeSide();
    } else {
        openSide();
    }
}
$(document).ready(applyResponsiveBehavior);
$(window).on('resize', applyResponsiveBehavior);

function makeSameHeight(containerSelector) {
    let maxHeight = 0;
    $(containerSelector).find('.SameHeight').each(function() {
        maxHeight = Math.max(maxHeight, $(this).height()); // Update maxHeight
    });
    $(containerSelector).find('.SameHeight').height(maxHeight);
}
if($('.customSelect').length > 0){
    $('.customSelect').generateSelect();
}
function toggleSubmenu() {
    // Toggle the submenu on click of .hasSubmenu
    $(".hasSubmenu").on("click", function(e) {
        e.stopPropagation(); // Prevent bubbling up to document
        $(this).toggleClass("active");
        // $(this).children("ul").toggleClass("active");
    });

    // Close the submenu when clicking outside
    $(document).on("click", function() {
        $.each($(".hasSubmenu"),function (){
            if(!$(this).parent().parent().is("aside")) {
                $(this).removeClass("active");
            }
        })
    });

    // Prevent submenu from closing when clicking inside the ul
    // $(".hasSubmenu ul").on("click", function(e) {
    //     e.stopPropagation();
    // });
}
function handleSide(){
    $("aside").height($(window).height()-$("header").height()-10);
    $(".NavToggle").on("click", function(e) {
        sideToggle()
    })
}
function sideToggle(){
    $("aside").toggleClass("notActive");
    $(".content").toggleClass("w-100");
}
function closeSide(){
    $("aside").addClass("notActive");
    $(".content").addClass("w-100");
}
function openSide(){
    $("aside").removeClass("notActive");
    $(".content").removeClass("w-100");
}
function CreateTabs(containerSelector) {
    $(containerSelector).find('.tab-headers li').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
        $(containerSelector).find('.tab-pane').eq($(this).index()).addClass('active').siblings().removeClass('active');
    });
}
$(".custom-file-input .FileGroup").on('click',function (e){
    $(this).siblings('input[type="file"]').trigger('click');
    e.stopPropagation();
})
$(".custom-file-input2").on('click', '.FileGroup, img', function(e) {
    $(this).siblings('input[type="file"]').trigger('click');
    e.stopPropagation();
});
$('.custom-file-input input[type="file"]').on('change',function (){
    let fileName = this.files.length ? this.files[0].name : 'لم يتم اختيار ملف';
    $(this).siblings('.FileGroup').children('.fileName').text(fileName);
})
$('.custom-file-input2 input[type="file"]').on('change',function (elem){
    let file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            let base64String = e.target.result;
           $(elem.target).siblings('img').attr('src',base64String).show();
           $(elem.target).siblings('.FileGroup').hide();
        };
        reader.readAsDataURL(file);
    }
})
$('.SiteLogoContainer input[type="file"]').on('change',function (elem){
    let file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            let base64String = e.target.result;
            $(elem.target).parent().parent().siblings('.ImageContainer').children('img').attr('src',base64String);
        };
        reader.readAsDataURL(file);
    }

})
function makeHeightSameAsWidth(containerSelector){
    $(containerSelector).height($(containerSelector).width())
}
if($(".ImagesScrolledSlider").length > 0){
    $(".ImagesScrolledSlider").mCustomScrollbar({
        axis:"x",
        theme:"dark-3",
        advanced:{autoExpandHorizontalScroll:true}
    });
}
if($("aside").length > 0){
    $("aside").mCustomScrollbar({
        axis:"y",
        theme:"dark-3",
        advanced:{autoExpandVerticalScroll:true}
    });
}
if($(".custom-file-input2").length > 0){
    $.each($(".custom-file-input2"),function (){
        makeHeightSameAsWidth(this);
    })
}
