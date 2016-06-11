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

//TwitterAPI calls (using keys):
var tweets = new twitter(LiriTwitterBOT.LiriTwitterBOT);
var tSearch = { //Twitter search params
  screen_name: 'ForbesGriffith',
  count: 20
}
