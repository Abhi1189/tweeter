$(document).ready(function() {
  $('#tweetContent').on('keyup', function(event) {
    const count = 140 - this.value.length;

    //we want to diplay the counter, which is why, pass count
    //as a parameter to our .text()
    $('span.counter').text(count);
    
    if (count < 0) {
      $('span.counter').css('color', 'red');
    } else {
      $('span.counter').css('color', 'black');
    }
  });
});
  