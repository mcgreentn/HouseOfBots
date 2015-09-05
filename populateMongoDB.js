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
var max_id_f = 0;
T.get('statuses/user_timeline', { screen_name: 'realDonaldTrump', count: 2, include_rts: true}, function(err, data, response) {
  	//console.log(data)
  	max_id_f = data[0].id;
  	console.log(max_id_f);

	for(var i = 0; i < 4; i++)
	{		
		//var maxer = max_id_f - (1 * i);
		//console.log(maxer);
		T.get('statuses/user_timeline', { screen_name: 'realDonaldTrump', count: 5, include_rts: true, max_id: max_id_f}, function(err, data2, response) {
  		//console.log(data);
  		max_id_f = data2[4].id - 1;
  		console.log(max_id_f);
		});

	}	
});	

