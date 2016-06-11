// node.js “Liri” BOT — version 1.0 ¯\_(ツ)_/¯
// props to http://1lineart.kulaone.com/ for some ASCII character-art to visually spice up this node app a bit
// ()==[:::::::::::::>
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

var logObject = ""; //initialize string variable to be written to log.txt
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

/* SPOTIFY: */
function spotifySongInfo(inquiry) {
  if (!inquiry) {
    inquiry = "what's+my+age+again"; //assigned default in case no inquiry entered after task
  };
  var queryUrl = 'https://api.spotify.com/v1/search?q=' + inquiry + '&limit=5&type=track';
  request(queryUrl, function(err, response, body) { //SpotifyAPI-call
    if (err) {
      console.log(err);
    };
    body = JSON.parse(body);
    console.log('♬♩♪♫|̲̅̅●̲̅̅|̲̅̅=̲̅̅|̲̅̅●̲̅̅|̲̅̅♫♪♩♬');
    console.log('The best rated five matches for your search are:');
    for (var i = 0; i < body.tracks.items.length; i++) {
      console.log('artist(s) = ' + body.tracks.items[i].artists[0].name);
      console.log('song title = ' + body.tracks.items[i].name);
      console.log('preview = ' + body.tracks.items[i].preview_url);
      console.log('album = ' + body.tracks.items[i].album.name);
      console.log('♬♩♪♫|̲̅̅●̲̅̅|̲̅̅=̲̅̅|̲̅̅●̲̅̅|̲̅̅♫♪♩♬');      
      //inquiry request and response concatenation to log.txt
      logObject = task + ", " + inquiry + ", " + body.tracks.items[i].artists[0].name + ", " + body.tracks.items[i].name + ", " + body.tracks.items[i].preview_url + ", " + body.tracks.items[i].album.name + "\n";
    }; //END-for-loop
    writeLog(logObject); //write to log.txt
  }); //END-SpotifyAPI-call
}; //END-spotifySongInfo

/* OMDB function */
function fetchMovieInfo(inquiry) {
  if (!inquiry) { // cxxxxx][========================>
    inquiry = 'Sword+Of+Doom'; //default if no inquiry is typed into the request argv
  };
  var queryUrl = 'http://www.omdbapi.com/?t=' + inquiry + '&y=&plot=short&r=json&tomatoes=true';
  request(queryUrl, function(err, response, body) { //OMDB-call
    if (err) {
      console.log(err);
    }
    body = JSON.parse(body);
    console.log('✪ ✦ ✧ ✩ ✫ ✬ ✭ ✮ ✯ ✰ ★ ✪');
    console.log('title = ' + body.Title);
    console.log('year released = ' + body.Year);
    console.log('actors = ' + body.Actors);
    console.log('plot summary = ' + body.Plot);
    console.log('countries = ' + body.Country);
    console.log('languages = ' + body.Language);
    console.log('IMDB rating = ' + body.imdbRating);
    console.log('Rotten Tomatoes RATING = ' + body.tomatoRating);
    console.log('Rotten Tomatoes URL = ' + body.tomatoURL);
    console.log('✪ ✦ ✧ ✩ ✫ ✬ ✭ ✮ ✯ ✰ ★ ✪');
    //inquiry request and response concatenation to log.txt
    logObject = task + ", " + inquiry + ", " + body.Title + ", " + body.Year + ", " + body.Actors + ", " + body.Plot + ", " + body.Country + ", " + body.Language + ", " + body.imdbRating + ", " + body.tomatoRating + ", " + body.tomatoURL + "\n";
    writeLog(logObject); //write to log.txt
  }); //END-OMDB-call
}; //END-fetchMovieInfo
