$(function() {
    var baseUrl = "http://test-api.kuria.tshdev.io/?";

    function apiModel() {
        var self = this;
        //Data
        self.ratings = ko.observableArray([1, 2, 3, 4, 5]);

        //Observables
        self.currentRating = ko.observable();
        self.currentPage = ko.observable();
        self.currentText = ko.observable();
        self.modalHtml = ko.observable();
        self.payments = ko.observable();
        self.icons = ko.observable();

        //Set up
        self.currentRating('');
        self.currentText('');
        self.currentPage(1);

        self.ProcessRequest = function(url) {

            if (self.currentPage() !== undefined) {
                var data = $.parseJSON(
                    $.ajax({
                        url: url,
                        async: false,
                        dataType: 'json'
                    }).responseText
                );
                self.payments(data.payments);
            }
        };

        //buttons
        self.setCurrentText = function() {
            var url = baseUrl + 'query=' + self.currentText();

            self.ProcessRequest(url);
        };

        self.resetCurrentText = function() {
            self.currentText('');
            var url = baseUrl + 'page=1';
            self.ProcessRequest(url);
        };

        $(".bootpag").on('click', '*', function(event) {
            var page = $(this).attr('data-lp');
            self.currentPage(page);
        });

        //Modal
        self.showModal = function(item) {
            self.modalHtml('<div id="modal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"><div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Details</h4></div><div class="modal-body"><div class="row"><div class="col-xs-6 left-column">SUPPLIER:</div><div class="col-xs-6 right-column">' + item.payment_supplier + '</div></div><div class="row"><div class="col-xs-6 left-column">REFERENCE:</div><div class="col-xs-6 right-column">' + item.payment_ref + '</div></div><div class="row"><div class="col-xs-6 left-column">POUND RATING:</div><div class="col-xs-6 right-column">' + item.payment_cost_rating + '</div></div><div class="row"><div class="col-xs-6 left-column">VALUE:</div><div class="col-xs-6 right-column">' + item.payment_amount + '</div></div></div></div></div>');

        };

        //Listener
        ko.computed(function() {
            self.currentPage();
            self.currentRating();

            var url = baseUrl +
                'rating=' + self.currentRating() + '&' +
                'page=' + self.currentPage();
            self.ProcessRequest(url);
        });
    }
    ko.applyBindings(new apiModel());
});

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
