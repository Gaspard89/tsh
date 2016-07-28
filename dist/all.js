
// var data = $.ajax({
//   dataType: "json",
//   url: 'http://test-api.kuria.tshdev.io/',
//   data: data,
// });
//
// console.log(data);
// var myArr = JSON.parse(data.responseText);
// console.log(myArr);


// var url = 'http://test-api.kuria.tshdev.io/';
// var j = [];
// $.ajax({
//   type: 'GET',
//   url: url,
//   dataType: 'json',
//   success: function(data) { j = data;},
//   async: false
// });
//
// alert(j.Users[0].Name);
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
ko.applyBindings(data);
    });
