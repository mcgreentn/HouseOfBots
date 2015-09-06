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
  