"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
var ObjectId = require('mongodb').ObjectId;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    },

    // Get all tweets in `db`, sorted by newest first
    updateTweet: function(tweetUpdate, callback) {
      let o_Id = new ObjectId(tweetUpdate.tweetId);
      db.collection("tweets").updateOne(
        { "_id": o_Id},
        { $set: { likes: tweetUpdate.likes}},
        callback
      );
    }
  };
}
