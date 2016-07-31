$(function() {
    var ratingFunction = function() {
        var ratingElements = $(".ratingValue");

        for (var i = 0; i < ratingElements.length; i++) {
            var el = ratingElements[i];
            var ratingValue = $(el).html();
            $(el).html('');

            for (var j = 0; j < 5; j++) {

                if (ratingValue > 0) {
                    $(el).append('<span class="rating-pound active">&pound</span>');
                    ratingValue--;
                } else {
                    $(el).append('<span class="rating-pound disabled">&pound</span>');
                }
            }
        }
    };

    $(".bootpag").on('click', '*', function(event) {
        var page = $(this).attr('data-lp');
        ratingFunction(page);
    });
    window.onload = ratingFunction;
    $("#searchButton").click(ratingFunction);
    $("#dropdown").change(ratingFunction);

});
