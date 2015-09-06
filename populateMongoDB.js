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
