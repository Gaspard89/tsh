$(function (){
var url = "http://test-api.kuria.tshdev.io/";
var data = $.parseJSON(
        $.ajax({
            url: url,
            async: false,
            dataType: 'json'
        }).responseText
    );


console.log(data.payments);
ko.applyBindings(data, document.getElementById('listingTable'));
});
