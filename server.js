var express = require('express'),
    bodyParser = require('body-parser'),
    port = 3000;


var app = express();
app.use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .post('/feedback', function(request, response) {
        console.log(request.body.recbrnd);
        response.send('Store Number:'+request.body.strnbr);
    })
    .listen(port, function() {
        console.log('Server Started at ' + port);
    });