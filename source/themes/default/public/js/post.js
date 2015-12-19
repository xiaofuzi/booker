/*更多文章查看*/
var Post = {
    init: function() {
        this.showContent();
        this.codeTheme();
        this.themeInit();
        this.upToTop();
    },
    //show more content
    showContent: function() {
        var $postMoreContent = $(".post-more");
        $postMoreContent.hide();
        $(".postMore").on('click', function() {
            $this = $(this);
            $this.parent().find('.post-more').toggle();
            if ($this.attr("data-show") == 'false') {
                $this.text('查看文章摘要');
                $this.attr("data-show", 'true');
            } else {
                $this.text('......查看全文');
                $this.attr("data-show", 'false');
            }
        })
    },
    //代码块主题修改
    codeTheme: function() {
        var themes = {
            agate: '//cdn.bootcss.com/highlight.js/8.9.1/styles/agate.min.css',
            atelier: "//cdn.bootcss.com/highlight.js/8.9.1/styles/atelier-dune.light.min.css",
            monokai: "//cdn.bootcss.com/highlight.js/8.9.1/styles/monokai.min.css",
            sulphurpool: "//cdn.bootcss.com/highlight.js/8.9.1/styles/atelier-sulphurpool.dark.min.css"
        }
        var $highlights = $('.highlight');
        $highlights.each(function() {
            var $this = $(this);
            $this.on("mouseenter", function() {
                var str = '<div id="highlightTheme"><span data-id="agate" style="background:#66d9ef;"></span><span data-id="atelier" style="background:#fefbec;"></span><span data-id="monokai" style="background:#222;"></span><span data-id="sulphurpool" style="background:#202746;"></span></div>';
                $(this).append(str);

                $highlightTheme = $("#highlightTheme span");
                $highlightTheme.each(function() {
                    var $this = $(this);
                    $this.on("click", function() {
                        for (var t in themes) {
                            if ($this.attr("data-id") == t) {
                                themeChange(themes[t])
                                return;
                            }
                        }
                    })
                })
            })
            $this.on("mouseleave", function() {
                $('#highlightTheme').remove();
            })
        })

        //改变link以及设置localstorge
        function themeChange(link) {
            var $theme = $("#theme-highlight");
            if ($theme.attr("href") != link) {
                $theme.attr("href", link);
                localStorage.highlightTheme = link;
            }
        }
    },
    //theme init
    themeInit: function() {
        var $theme = $("#theme-highlight");
        if (localStorage.highlightTheme) {
            $theme.attr("href", localStorage.highlightTheme);
        }
    },
    //up to top
    upToTop: function() {
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
}


$(function() {
    Post.init();
    var lazyLoad = function() {
        /*图片延迟加载实现*/
        [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.onload = function() {
                /*图片加载完成后data-src属性就可以去掉了*/
                img.removeAttribute('data-src');
            };
        });
        /*css延迟加载，解决CDN速度不稳定的问题*/
        [].forEach.call(document.querySelectorAll('link[data-href]'), function(link) {
            link.setAttribute('href', link.getAttribute('data-href'));
            window.onload = function() {
                /*样式加载完成后data-href属性就可以去掉了*/
                link.removeAttribute('data-href');
            };
        });
    };
    
    lazyLoad();
})

