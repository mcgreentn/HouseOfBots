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
// T.get('statuses/user_timeline', { screen_name: 'realDonaldTrump', count: 2, include_rts: true}, function(err, data, response) {
//   	//console.log(data)
//   	max_id_f = data[0].id;
//   	console.log(max_id_f);

// 	for(var i = 0; i < 4; i++)
// 	{		
// 		//var maxer = max_id_f - (1 * i);
// 		//console.log(maxer);
// 		T.get('statuses/user_timeline', { screen_name: 'realDonaldTrump', count: 5, include_rts: true, max_id: max_id_f}, function(err, data2, response) {
//   		//console.log(data);

//   		max_id_f = data2[4].id - 1;
//   		console.log(max_id_f);
// 		});

// 	}	 
// });	
function decrementHugeNumberBy1(n) {
    // make sure s is a string, as we can't do math on numbers over a certain size
    n = n.toString();
    var allButLast = n.substr(0, n.length - 1);
    var lastNumber = n.substr(n.length - 1);

    if (lastNumber === "0") {
        return decrementHugeNumberBy1(allButLast) + "9";
    }
    else {      
        var finalResult = allButLast + (parseInt(lastNumber, 10) - 1).toString();
        return trimLeft(finalResult, "0");
    }
}function trimLeft(s, c) {
    var i = 0;
    while (i < s.length && s[i] === c) {
        i++;
    }

    return s.substring(i);
}

T.get('statuses/user_timeline', { screen_name: 'realDonaldTrump', count: 200, include_rts: true}, function(err, data, response) {
  	console.log(data[0].id)
  	console.log(data[199].id);
  	console.log(data[0].id - data[199].id)
  	// var maxer = data[199].id;
  	// T.get('statuses/user_timeline', { screen_name: 'realDonaldTrump', count: 200, include_rts: true, max_id: maxer}, function(err, data2, response) {
 		// maxer = data2[199].id;
  	// 	T.get('statuses/user_timeline', { screen_name: 'realDonaldTrump', count: 200, include_rts: true, max_id: maxer}, function(err, data3, response) {

  		var feedString = "";
  		for(var i = 0; i < 200; i++)
  		{
  			feedString = feedString + data[i].text + " ";
  		} 
  		// for(var i = 0; i < 200; i++)
  		// {
  		// 	feedString = feedString + data2[i].text + " ";
  		// }
  		// for(var i = 0; i < 200; i++)
  		// {
  		// 	feedString = feedString + data3[i].text + " ";
  		// }  
  		//console.log(feedString);
  		feedString = feedString.split(" ");
  		var stringArray = new Array();
  		var re = new RegExp(".*@.*")
		var re2 = new RegExp("-+")
		for(var j = 0; j < feedString.length; j++)
		{ 
			if(feedString[j].search(re) && feedString[j].search(re2) && feedString[j] != '')
			{
				stringArray.push(feedString[j]);
			}
		}
  	//console.log(stringArray);
  	console.log(stringArray.length)
  });
  // });
  // });

