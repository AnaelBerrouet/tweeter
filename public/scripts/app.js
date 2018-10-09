$(document).ready(function() {

  // Fake data taken from tweets.json
  const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function renderTweets(tweets) {

  for(let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }

}
  function createTweetElement(tweet) {

    // BUILD ARTICLE ELEMENT
    var $tweet = $("<article>").addClass("tweet");

    // BUILD HEADER
    var header = `<header> <img id="avatar" src="${tweet.user.avatars.small}"><h3 id="name">${tweet.user.name}</h3><span id="handle">${tweet.user.handle}</span></header>`;

    // BUILD CONTENT
    var content = `<p id="content">${tweet.content.text}</p>`;

    // BUILD FOOTER
    let now = new Date();
    let then = new Date(tweet.created_at);
    var timestamp = Math.floor((now - then) / (1000 * 60 * 60 * 24));

    timestamp = `${timestamp} days ago`;
    var footer = `<footer><p id="timestamp">${timestamp} days ago</p></footer>`;

    // ASSEMBLE PIECES
    $tweet.append(header + content + footer);

    return $tweet;
  }

renderTweets(data);

});