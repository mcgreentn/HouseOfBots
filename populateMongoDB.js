var Twit = require('twit');
var creds = require('./.creds');
var T = new Twit(creds);

//  tweet 'hello world!'
//
//T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
//  console.log(data)
//});

//
//  search twitter for all tweets containing the word 'banana' since Nov. 11, 2011
//
//T.get('search/tweets', { q: 'banana since:2011-11-11', count: 100 }, function(err, data, response) {
//  console.log(data)
//});

for(var i = 0; i < 10; i++)
{
	T.get('statuses/user_timeline', { screen_name: 'realDonaldTrump', count: 100, include_rts: false}, function(err, data, response) {
  	console.log(data)
	});
	
}