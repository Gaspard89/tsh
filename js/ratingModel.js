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
        self.temporaryValue = ko.observable();
        self.payments = ko.observable();
        self.icons = ko.observable();

        //Behaviours
        self.currentRating('');
        self.currentText('');
        self.currentPage(1);

        self.ProcessRequest = function(url) {

            if(self.currentPage() !== undefined) {
                var data = $.parseJSON(
                  $.ajax({
                      url: url,
                      async: false,
                      dataType: 'json'
                  }).responseText
              );
              self.payments(data.payments);
              console.log(data);
              console.log(url);
          }
        };

        self.setCurrentText = function() {
            self.currentText(self.temporaryValue());
            var url = baseUrl + 'query=' + self.currentText();

            self.ProcessRequest(url);
        };

        self.resetCurrentText = function() {
            self.currentText('');
            self.temporaryValue('');
            var url = baseUrl + 'page=1';
            self.ProcessRequest(url);
        };

        $(".bootpag").on('click','*', function (event) {
          var page = $(this).attr('data-lp');
          self.currentPage(page);
        });

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
