// function getSelectionText() {
//     var text = "";
//     if (window.getSelection) {
//         text = window.getSelection().toString();
//     } else if (document.selection && document.selection.type != "Control") {
//         text = document.selection.createRange().text;
//     }
//     alert(text);
//     return text;
// }

$(document).ready(function(){
  $(".button-wrapper").click(function(){

  //   chrome.tabs.executeScript(null, {file: "js/highlight.js"});
    console.log("clicked");
  var userInput = $(".form-control").val()    
    $.ajax({
      method: "GET",
      url: "http://45.79.172.188:3000/#",
      data: {"message": userInput}
    })
    .done(function(data) 
    {
      data = $.parseJSON(data);
      var result = data.result;
      $(".output").text(result);
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
    });
  });
});
    // $(".output").text($(".form-control").val())
    //   console.log( "success" );
    // })

    // $(".output").text(getSelectionText());
    // console.log(getSelectionText());
 
  /*
  $.get( "test.json", function() {
    console.log( "success" );
  })
  .done(function(data) {
    data = $.parseJSON(data);
    var result = data.result;
    $(".output").text(result);
    console.log( "second success" );
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });*/
 
// Perform other work here ...
 
// Set another completion function for the request above
/*jqxhr.complete(function() {
  console.log( "second complete" );*/
//});
    /*
      $(".output").load("http://45.79.172.188:3000/#", function(responseTxt, statusTxt, xhr){
        if(statusTxt == "success")
            alert("External content loaded successfully!");
        if(statusTxt == "error")
            alert("Error: " + xhr.status + ": " + xhr.statusText);
    });*/
        // alert("Text: " + $("I think it worked!").text());
        // $(".output").load("http://stackoverflow.com/questions/18602331/why-is-this-jquery-click-function-not-working", function(responseTxt, statusTxt, xhr)
        // {
        //   if(statusTxt == "success")
        //     alert("External content loaded successfully!");
        //   if(statusTxt == "error")
        //     alert("Error: " xhr.status + ": " + xhr.statusText);
        // });

/*
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

*/
