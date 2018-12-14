/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {

  function renderTweets(tweets) {
    tweets.forEach(function (tweet) {
      let $tweet = createTweetElement(tweet);
      $('#tweetContainer').prepend($tweet);
    });
  }


  function createTweetElement(tweetData){

    let $tweet = $('<article>').addClass("tweet");
    let $header = $('<header>').addClass('tweetHeader');

    //append image, handle and h1 to our header now
    $('<img>').attr('src', tweetData.user.avatars.small).appendTo($header);
    $('<h1>').text(tweetData.user.name).appendTo($header);
    $('<span>').text(tweetData.user.handle).appendTo($header);

    $tweet.append($header);

    //create <div> tag and add body of the tweet to it
    $('<div>').addClass('tweetBody').text(tweetData.content.text).appendTo($tweet);

    //span tag for date & appendTo footer. 
    let $span = $('<span>').text(tweetData.created_at);
    let $footer = $('<footer>').append($span);

    $tweet.append($footer);

    return $tweet;
  }

  
  //function for form validation
  function formValidate(){
    $('.errorMsg').text('');
    if($('#tweetContent').val() === ''){
      $('.errorMsg').text("Empty form. Humm a little more!");
      return false;
    } else if ($('#tweetContent').val().length > 140) {
      $('.errorMsg').text('>140 chars. Please humm a little less.');
      return false;
    } else {
      return true;
    }
  }

  function submitHandler(event){
    event.preventDefault();

    //take form content and change it into a string.
    let $form = $('form').serialize();

    //make an ajax POST request
    if(formValidate()){
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $form
      })
      .then(function(data){
        loadTweets();
        $('.counter').text('140');
        $('#tweetContent').val('').empty();
      })
    }
    
  }

  //this is where I attach the button to the event.
  //when button is pressed, invoke the function to handle the event.
  $('form').submit(submitHandler);

  function loadTweets(){
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: function(data){
        renderTweets(data);
      }
    });

  }
  loadTweets();

  $(function(){
    $('section.new-tweet').hide();
    $('#nav-bar button').on('click', function(){
      $('.new-tweet').slideToggle();
      $('#tweetContent').focus();
    })
  })
})

