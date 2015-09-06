var Twit = require('twit');
var creds = require('./.creds');
var T = new Twit(creds);

var max_id_f = 0;
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

