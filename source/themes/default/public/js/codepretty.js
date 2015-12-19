$(document).ready(function() {
    $('pre').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    //up to top
    var upToTop = function() {
        var $upTop = $("#upToTop");
        $(window).scroll(function() {
            if ($(window).scrollTop() > 1200) {
                $upTop.css("display", "block");
            } else {
                $upTop.css("display", "none");
            }
        })
        $upTop.on("click", function() {
            $('body,html').animate({
                scrollTop: 0
            }, 500);
        })
    }
    upToTop();
});
