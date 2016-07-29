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
        self.tescik = ko.observable();

        //Behaviours
        self.setCurrentText = function() {
            self.currentText(self.tescik());
        };

        self.resetCurrentText = function() {
            self.currentText('');
        };

        self.currentRating('');
        self.currentText('');
        self.currentPage(1);

        self.ProcessRequest = function() {
            var url = baseUrl +
                'rating=' + self.currentRating() + '&' +
                'page=' + self.currentPage();



            var data = $.parseJSON(
                $.ajax({
                    url: url,
                    async: false,
                    dataType: 'json'
                }).responseText
            );
            console.log(url);
            console.log(data);
        };

        $(".bootpag").on('click','*', function (event) {
          var page = $(this).attr('data-lp');
          self.currentPage(page);
        });

        ko.computed(function() {
            self.currentPage();
            self.currentRating();
            self.ProcessRequest();
        });

    }
    ko.applyBindings(new apiModel());
});







//
// self.show = function(){
//         var data = $.parseJSON(
//           $.ajax({
//               url: currentUrl+'rating='+self.currentRating(),
//               async: false,
//               dataType: 'json'
//           }).responseText
//       );
//     };
//
