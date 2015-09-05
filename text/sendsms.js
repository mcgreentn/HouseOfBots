// Your accountSid and authToken from twilio.com/user/account
var accountSid = 'ACdc663a2e420e0ea49ea5042473ae24a8';
var authToken = "6b9354895c504bfa1db8b00fe3aae752";
var client = require('twilio')(accountSid, authToken);

 
client.messages.create({
    body: "Testing!",
    to: "+19016062270",
    from: "+19013093234"
}, function(err, message) {
    process.stdout.write(message.sid);
});