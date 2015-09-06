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

//T.get('statuses/user_timeline', { screen_name: 'realDonaldTrump', count: 100, include_rts: false}, function(err, data, response) {
//  console.log(data)
//});

var trumpContentNew = {
    "name": "Donald Trump",
    "handle": "realDonaldTrump",
    "sequences": [
        {
            prev: null,
            next: "The",
            count: 34
        },
        {
            prev: "The",
            next: "quick",
            count: 6
        },
        {
            prev: "The",
            next: "slow",
            count: 5
        },
        {
            prev: "quick",
            next: null,
            count: 3
        }
    ]
};

function seed() {
    return;
}

function generate(source, maxLength) {
    function withPrev(source, prev) {
        var out = [];
        source.sequences.forEach(function(item){
            if(item.prev === prev) {
                out.push(item);
            }
        });
        return out;
    }

    function withNext(source, next) {
        var out = [];
        source.sequences.forEach(function(item){
            if(item.next === next) {
                out.push(item);
            }
        });
        return out;
    }

    function withPrevAndNext(source, prev, next) {
        var out = [];
        source.sequences.forEach(function(item){
            if(item.prev === prev && item.next === next) {
                out.push(item);
            }
        });
        return out;
    }

    function selectWeighted(sequences) {
        var sum = 0;
        sequences.forEach(function(item) {
            sum += item.count;
        });

        var index     = Math.floor((Math.random() * sum));
        var secondSum = 0;
        var output    = null;
        var found     = false;
        sequences.forEach(function(item) {
            secondSum += item.count;
            console.log(index + " | " + secondSum);
            if(index < secondSum && !found) {
                console.log(">>>>>" + item.next);
                output = item;
                found = true;
            }
        });

        return output;
    }


    var words  = withPrev(source, null);
    var output = "";
    while(words.length !== 0) {
        var nextWord = selectWeighted(words).next;

        if(nextWord === null) {
            break;
        }

        output += " " + nextWord;
        words = withPrev(source, nextWord);
    }
    console.log(output);




//    console.log(withPrev(source, "The"));
//    console.log(withNext(source, null));
//    console.log(withPrevAndNext(source, "The", "slow"));
}

generate(trumpContentNew, 140);
