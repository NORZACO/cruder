var request = require('request');
var options = {
    'method': 'POST',
    'url': 'http://127.0.0.1:3000/users',
    'headers': {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "username": "JohnDoe",
        "email": "johndoe@example.com",
        "password": "password123",
        "biograph": "I am a software developer",
        "descriptions": "I love coding and solving problems"
    })

};
request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
});
