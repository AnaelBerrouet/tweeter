$(document).ready(function() {

  function createTweetElement(tweet) {
    // BUILD ARTICLE ELEMENT
    var $tweet = $("<article>").addClass("tweet");

    // BUILD HEADER
    var header = `
      <header>
        <img class="avatar" src="${tweet.user.avatars.small}">
        <h3 class="name">${tweet.user.name}</h3>
        <span class="handle">${tweet.user.handle}</span>
      </header>
    `;

    // BUILD CONTENT
    var content = `<p class="content">${tweet.content.text}</p>`;

    // BUILD FOOTER
    const now = new Date();
    const then = new Date(tweet.created_at);
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const timestamp = Math.floor((now - then) / millisecondsInADay);

    var footer = `
      <footer>
        <p class="timestamp">${timestamp} days ago</p>
      </footer>
    `;

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
    console.log('Loading Tweets!')
    const tweets = $.getJSON('/tweets/')
      .done( (data) => {
        $('#tweets-container').empty();
        renderTweets(data.reverse());
      })
      .fail( () => {
        console.log("Request failed:");
      });
  }


  //AJAX CONTROLLER FOR TWEEET SUBMIT
  const $form = $('#tweet-submit').submit( function(event) {
    event.preventDefault();
    const data = $(this).serialize();

    //CHECK VALID TWEET STATUS
    const tweetCharsRemaining = Number($(this).find('.counter').text());
    if(tweetCharsRemaining < 0) {
      alert("Over character limit!");
    } else if(tweetCharsRemaining === 140) {
      alert("Empty tweet!");
    } else {
      //SUBMIT POST REQUEST AND REFRESH TWEET FEED
      $.ajax('/tweets/', {method: 'POST', data: data}).done(loadTweets);
      $(this).find('textarea').val("");
      $(this).find('.counter').text("140");
    }
  });

  loadTweets();
});









