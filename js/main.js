$(function (){
// var url = "http://test-api.kuria.tshdev.io/";
// var data = $.parseJSON(
//         $.ajax({
//             url: url,
//             async: false,
//             dataType: 'json'
//         }).responseText
//     );
//
//
// console.log(data.payments);
// ko.applyBindings(data, document.getElementById('listingTable'));

  $('.page-navigation').bootpag({
     total: 8,
     page: 2,
     maxVisible: 4
  }).on('page', function(event, num){
      // $(".content2").html("Page " + num); // or some ajax content loading...
  });
});
