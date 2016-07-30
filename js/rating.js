$(function(){
var costam = function(){
  var ratingElements = $(".ratingValue");

  for(var i = 0; i < ratingElements.length; i++) {
    var el = ratingElements[i];
    var ratingValue = $(el).html();
    $(el).html('');

    for (var j = 0; j < 5; j++){

      if(ratingValue > 0) {
        //tutaj daje kolorowa
        $(el).append('<span>k</span>');
        ratingValue--;
        console.log(el);
      }
      else {
        //szara
        $(el).append('<span>c</span>');
        console.log(el);
      }
    }
  }

  // console.log(ratingValue);
  // console.log(ratingElements);
};

$(".bootpag").on('click','*', function (event) {
  var page = $(this).attr('data-lp');
  costam(page);
});
window.onload = costam;
$("#searchButton").click(costam);
$("#dropdown").change(costam);

});
