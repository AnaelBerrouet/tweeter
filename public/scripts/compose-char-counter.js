// composer-char-counter.js

$(document).ready(function() {

  console.log("loaded!");

  let counter = 140;
  $('.new-tweet textarea').bind("keyup", function(event) {
    count = 140 - $(this).val().length;

    let counter = $(this).parent().children('.counter');
    counter.text(count);
    if(count < 0){
      counter.css('color','red');
    }
    else{
      counter.css('color', '#00a087');
    }

  });

});