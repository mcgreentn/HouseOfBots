alert("this just ran");
var text = "";
console.log("text");

if (window.getSelection) 
{
    text = window.getSelection().toString();
    console.log(text);
} 
else if (document.selection && document.selection.type != "Control") 
{
    text = document.selection.createRange().text;
}
alert(text);
return text;