/*jshint esversion : 6 */

function likeButtonClickHandler()  {
  $(this).toggleClass('clicked');
  $(this).effect( "bounce",500);
  let $likeCounter = $(this).parent().siblings('.like-counter');
  let increment = 0;
  if($(this).attr('class') === 'material-icons clicked'){
    increment = Number($likeCounter.text()) + 1;
  } else {
    increment = Number($likeCounter.text()) - 1;
  }
  $likeCounter.text(increment);

  //SEND AJAX PUT REQUEST TO UPDATE LIKES IN DATABASE
  let $tweetId = $(this).closest('.tweet').attr('id');
  let data = {
    tweetId: $tweetId,
    likes:increment
  };
  $.ajax(`/tweets/${$tweetId}`, {method: 'PUT', data: data});
}

function attachLikeListeners() {
  $('button.like-symbol-wrapper .material-icons').on('click', likeButtonClickHandler);
}

function buildTweetHeader(tweet) {
  let header = `
      <header>
        <img class="avatar" src="${tweet.user.avatars.small}">
        <h3 class="name">${tweet.user.name}</h3>
        <span class="handle">${tweet.user.handle}</span>
      </header>
    `;
  return header;
}

function buildTweetContent(tweet) {
  return `<p class="content">${tweet.content.text}</p>`;
}

function buildTweetFooter(tweet) {
  const now = new Date();
  const then = new Date(tweet.created_at);
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const timestamp = Math.floor((now - then) / millisecondsInADay);

  let footer = `
    <footer>
      <p class="timestamp">${timestamp} days ago</p>
      <div class="likes">
        <p class="like-counter">
          ${tweet.likes}
        </p>
        <button class="like-symbol-wrapper">
          <i class="material-icons">
          favorite
          </i>
        </button>
      </div>
    </footer>
  `;

  return footer;
}

function createTweetElement(tweet) {
    // BUILD ARTICLE ELEMENT
    var $tweet = $("<article>").addClass("tweet").attr('id', `${tweet._id}`);

    // BUILD HEADER
    let header = buildTweetHeader(tweet);

    // BUILD CONTENT
    let content = buildTweetContent(tweet);

    // BUILD FOOTER
    let footer = buildTweetFooter(tweet);

    // ASSEMBLE PIECES
    $tweet.append(header + content + footer);

    return $tweet;
  }

function renderTweets(tweets) {
  for(let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
}

function loadTweets() {
  console.log('Loading Tweets!');
  const tweets = $.getJSON('/tweets/')
    .done( (data) => {
      $('#tweets-container').empty();
      renderTweets(data.reverse());
      //LIKE BUTTON TOGGLE ON OR OFF TO SHOW IF LIKED OR NOT AND INCREMENT COUNTER
      attachLikeListeners();
    })
    .fail( () => {
      console.log("Request failed:");
    });
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(function() {

  //AJAX CONTROLLER FOR TWEEET SUBMIT
  $('#tweet-submit').submit( function(event) {
    event.preventDefault();

    //CLEAR ANY ERROR PREVIOUS MESSAGE
    $('#tweet-submit .error-wrapper').slideUp(100, () => {
        $('#tweet-submit .error').empty();

        //ESCAPE DANGEROUS CHARACTERS
        const safeTweet = escape($(this).children('textarea').val());
        $(this).children('textarea').val(safeTweet);
        const data = $(this).serialize();

        //CHECK VALID TWEET STATUS
        const tweetCharsRemaining = Number($(this).find('.counter').text());
        if(tweetCharsRemaining < 0) {
          $('#tweet-submit .error').append(`
            <i class="material-icons">
              clear
            </i>
            Over character limit!
            `);
          $('#tweet-submit .error-wrapper').slideDown(300);
        } else if(tweetCharsRemaining === 140) {
            $('#tweet-submit .error').append(`
              <i class="material-icons">
                clear
              </i>
              Empty tweet!`);
            $('#tweet-submit .error-wrapper').slideDown(300);
        } else {
          //SUBMIT POST REQUEST AND REFRESH TWEET FEED
          $.ajax('/tweets/', {method: 'POST', data: data}).done(loadTweets);
          $(this).find('textarea').val("");
          $(this).find('.counter').text("140");
        }
      });
  });

  //COMPOSE BUTTON TOGGLE ON OR OFF TO HIDE NEW TWEET CONTAINER
  $('#compose-button').on('click', function(event) {
    $('.new-tweet').slideToggle();
    $('#tweet-submit textarea').focus();
  });

  loadTweets();

});









