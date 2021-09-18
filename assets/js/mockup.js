(function ($) {
    $(document).ready(function () {
        var tabs = $('#naran-terms-merger .nav-tab'),
            frames = $('.ntm-tab-frame');

        tabs.on('click', function (e) {
            var frame;

            e.preventDefault();

            $.each(tabs, function (idx, elem) {
                if (elem.classList.contains('nav-tab-active')) {
                    elem.classList.remove('nav-tab-active');
                }
            });
            e.currentTarget.classList.add('nav-tab-active');

            $.each(frames, function (idx, elem) {
                if (elem.classList.contains('ntm-frame-active')) {
                    elem.classList.remove('ntm-frame-active');
                }
            });

            frame = document.getElementById(e.currentTarget.dataset.targetFrame);
            if (frame) {
                frame.classList.add('ntm-frame-active');
            }
        });
    });

    jQuery(function ($) {
        var ul = $('#ntm-terms, #ntm-slots');

        ul.on('click', '.ntm-title-wrap', function (e) {
            var wrap = $(e.currentTarget),
                ul = wrap.closest('ul'),
                li = wrap.closest('li'),
                span = wrap.find('span.ntm-item-toggle');

            ul.children('.current').removeClass('current');

            if (span.hasClass('ntm-icon-chevron-up')) {
                span.removeClass('ntm-icon-chevron-up');
                span.addClass('ntm-icon-chevron-down');
                li.addClass('current');
            } else {
                span.removeClass('ntm-icon-chevron-down');
                span.addClass('ntm-icon-chevron-up');
            }
            span.closest('.ntm-item-wrap').find('.ntm-item-inside').toggleClass('collapsed');
        });

        $('#ntm-slots').on('click', '.ntm-slot-title-action', function (e) {
            var a = $(e.currentTarget),
                li = a.closest('li'),
                tool = li.find('.ntm-slot-tool');

            e.stopPropagation();
            if (tool.hasClass('collapsed')) {
                tool.removeClass('collapsed');
            }
        }).on('click', '.ntm-button-cancel', function (e) {
            var button = $(e.currentTarget),
                tool = button.closest('.ntm-slot-tool');
            tool.addClass('collapsed');
        });
    });
})(jQuery);
