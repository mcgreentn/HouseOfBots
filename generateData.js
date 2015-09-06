var Twit  = require('twit');

//Cmd line args
var parodyHandle;
var originHandles = [];
var breakvar = 0;
process.argv.some(function (val, index, array) {
    switch(val)
    {
        case '-h':
            console.log("Make a parody twitter!\nUse:\n-h help\n-t \"parodytwitterhandle\" \"[originHandles]\"");
            breakvar = 1;
            break;
        case '-t':
            console.log("Generating chains...");
            parodyHandle = array[index+1];
            if(parodyHandle == null)
            {
                console.log("Need more args! See -h for help.");
                return false;
            }
            breakvar = 1;
            for(var i = 0; i < array.length -4; i++)
            {
                originHandles.push(array[index+2+i]);
            }
            if(originHandles[0] == null)
            {
                console.log("Need more args! See -h for help.");
            }
            break;
    }
    if(breakvar == 1) {
        return true;
    }
  //console.log(index + ': ' + val);
});

var creds       = require('./.creds');
var activeCreds = {};

if(parodyHandle === "RealDonaldBush") {
    activeCreds = creds.RealDonaldBush;
} else if (parodyHandle === "HillarySanders") {
    activeCreds = creds.HillarySanders;
} else {
    exit(1);
}

var T = new Twit(activeCreds);

/*
 *{
 *    "name": "Donald Trump",
 *    "handle": "realDonaldTrump",
 *    "sequences": [
 *        {
 *            prev: null,
 *            next: "The",
 *            count: 34
 *        },
 *        ...
 *    ]
 *}
 */

var max_id_f = 0;
function trimLeft(s, c) {
    var i = 0;
    while (i < s.length && s[i] === c) {
        i++;
    }

    return s.substring(i);
}

function seed(parodyHandle, originHandles) {

    function upsert(sequences, prev, next) {
        var done = false;
        sequences.forEach(function(sequence) {
            if(sequence.prev === prev && sequence.next === next && !done) {
                sequence.count = sequence.count + 1;
                done = true;
            }
        });
        if(!done) {
            sequences.push( {
                prev: prev,
                next: next,
                count: 1
            } );
        }

        return sequences;
    }

    var sequences = [];

    originHandles.forEach(function(originHandle) {
        T.get('statuses/user_timeline', { screen_name: originHandle, count: 200, include_rts: true}, function(err, data, response) {

                //for(var i = 0; i < 200; i++) {
                data.forEach(function(item) {
                    var currentTweet  = item.text;
                    var words         = currentTweet.split(" ");
                    var wordsFiltered = [null];
                    var re            = new RegExp(".*@.*");
                    var re2           = new RegExp("-+");
                    words.forEach(function(word) {
                        if(word.search(re) && word.search(re2) && word != '') {
                            wordsFiltered.push(word);
                        }
                    });
                    wordsFiltered.push(null);

                    for (var j = 1; j < wordsFiltered.length; j++) {
                        var prev = wordsFiltered[j - 1];
                        var next = wordsFiltered[j];

                        sequences = upsert(sequences, prev, next);
                    };
                });
        });
    });

    return sequences;
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
            if(index < secondSum && !found) {
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

        if((output + " " + nextWord).length >= maxLength) {
            return output;
        }

        output += " " + nextWord;
        words = withPrev(source, nextWord);
    }
    return output;
}


var sequences = seed(parodyHandle, originHandles);
setTimeout(function() {
    var content = {
        sequences: sequences
    };

    for (var i = 0; i < 1; i++) {
        T.post('statuses/update', { status: generate(content, 140) }, function(err, data, response) {
          console.log(data)
        });
    };

}, 5000);
