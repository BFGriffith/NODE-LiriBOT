// node.js “Liri” BOT — version 0.2
/** INSTRUCTIONS:
* node liri.js TASK REQUEST
* TASKS:
  * @param my-tweets
  * @param spotify-this-song
  * @param movie-this
  * @param do-what-it-says
*/
/* DEPENDENCIES: */
var fs = require('fs'); //fs node library allows file-system functionality
var request = require('request'); //request node library
var LiriTwitterBOT = require("./keys.js"); //store data from keys.js
var twitter = require('twitter'); //twitter node library

var task = process.argv[2]; //captures user TASK selection
var inquiry = process.argv.slice(3).join('+'); //captures user inputs after task selection for use as parameters for API requests

//TwitterAPI calls (using keys.js):
var tweets = new twitter(LiriTwitterBOT.LiriTwitterBOT);
var tSearch = { //Twitter search params
  screen_name: 'ForbesGriffith',
  count: 20,
}

//initialize string variable to be written to log.txt
var logObject = "";
/* WRITE to log.txt */
function writeLog(textLog) {
  fs.appendFile('log.txt', textLog, function(err) {
    if (err) {
      return console.log(err);
    };
    console.log('log.txt has been updated!'); //informs user of log update
  });
}; //END-writeLog

/* SWITCH statement to select desired task */
switch (task) {
  case 'my-tweets':
    fetchTweets();
    break;
  case 'spotify-this-song':
    spotifySongInfo(inquiry);
    break;
  case 'movie-this':
    fetchMovieInfo(inquiry);
    break;
  default: //user mistake error handler
    console.log('The prompt you typed for the requested task was not recognized; please double-check your spelling and try again.');
}; //END-SWITCH

/* TWITTER function: last 20 tweets from user based on set parameters */
function fetchTweets() {
  tweets.get('statuses/user_timeline', tSearch, function(err, response) {
    if (err) {
      console.log(err);
    };
    console.log('These are my last ' + response.length + ' tweets.')
    for (var i = 0; i < response.length; i++) {
      console.log('#' + (i + 1) + " = " + response[i].text); //log tweet message
      console.log('posted on: ' + response[i].created_at); //log creation date
      logObject += ', ' + '#' + (i + 1) + " = " + response[i].text + response[i].created_at; //concatenation to log.txt
    };
    logObject = task + "" + logObject + "\n"; //task to beginning
    writeLog(logObject); //write to log.txt
  });
}; //END-fetchTweets
