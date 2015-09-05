document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementsByClassName('btn btn-primary');
  checkPageButton[0].addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      d = document;


      var f = d.createElement('form');
      //insert backend page here
      //f.action = 'http://getwreckt.com/home/insult/264';
      var output = d.getElementsByClassName('output');
      output[0].innerText = 'You dumb fat shit. No really you are a dumb piece of shit.';
      //f.method = 'post';
      //var i = d.createElement('input');
      //i.type = 'hidden';
      //i.name = 'url';
      //i.value = "you dumb fat shit.";
      //f.appendChild(i);
      //d.body.appendChild(f);
      //var h = d.createElement("H1");
      //var t = d.createTextNode("You dumb fat shit");
      //h.appendChild(t);
      //f.submit();
      //d.body.appendChild(h);

    });
  }, false);
}, false);

$("#button-wrapper").click(function(){
        alert("Text: " + $("#btn btn-primary").text());
    });

