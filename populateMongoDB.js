var Twit  = require('twit');
var creds = require('./.creds');
var T     = new Twit(creds);

var max_id_f = 0;
function trimLeft(s, c) {
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

        var feedString = "";
        for(var i = 0; i < 200; i++) {
            feedString = feedString + data[i].text + " ";
        }

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
    console.log(stringArray.length)
});

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

//generate(trumpContentNew, 140);
