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

                self.modalHtml = ko.observable();
        self.showModal = function(item){
          console.log(item);
          console.log(item.payment_supplier);
          self.modalHtml('<div id="modal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"><div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="gridSystemModalLabel">Modal title</h4><p>'+item.payment_supplier+'</p><p>'+item.payment_ref+'</p><p>'+item.payment_cost_rating+'</p><p>'+item.payment_amount+'</p></div></div></div>');

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
