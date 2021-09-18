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
            if(frame) {
                frame.classList.add('ntm-frame-active');
            }
        });
    });

    jQuery(function ($) {
        var ntmTerms = $('#ntm-terms'),
            items = ntmTerms.children('li');

        for (var i = 0; i < 10; ++i) {
            ntmTerms.append(items[0].outerHTML);
        }

        ntmTerms.on('click', '.ntm-title-wrap', function (e) {
            var wrap  = $(e.currentTarget),
                span = wrap.find('span.ntm-item-toggle'),
                li = wrap.closest('li');

            if(span.hasClass('ntm-icon-chevron-up')) {
                span.removeClass('ntm-icon-chevron-up');
                span.addClass('ntm-icon-chevron-down');
            } else {
                span.removeClass('ntm-icon-chevron-down');
                span.addClass('ntm-icon-chevron-up');
            }

            ntmTerms.children('.current').removeClass('current');
            li.addClass('current');

            span.closest('.ntm-item-wrap').find('.ntm-item-inside').toggle('collapsed');
        })
    });
})(jQuery);
