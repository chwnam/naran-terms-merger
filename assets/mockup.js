(function ($) {
    $(document).ready(function () {
        var selectedTerms = $('#selected-terms');

        $('#all-terms > li').on('click', function (e) {
            $('#selected-terms').append(
                '<li>' + e.target.innerText + ' <span class="remove">&times;</span></li>'
            );
        });

        selectedTerms.on('click', '.remove', function (e) {
            $(e.currentTarget).closest('li').remove();
        });

        selectedTerms.on('click', 'li:not(.pivot)', function (e) {
            selectedTerms.find('li.pivot').removeClass('pivot');
            e.currentTarget.classList.add('pivot');
        });
    });
})(jQuery);

// TODO: UI BLOCK, notice text block.
