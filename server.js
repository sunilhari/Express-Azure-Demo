var express = require('express'),
    bodyParser = require('body-parser'),
    azure = require('azure-storage'),
    port = 3000,
    path = require('path'),
    hbs = require('express-handlebars'),
    axios = require('axios'),
    newsURL = "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=97e945c75f414d02934d3b5705286304"


var app = express();
app.engine('handlebars', hbs({
    defaultLayout: 'index'
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .get('/', function (request, response) {
        response.sendFile(path.join(__dirname + '/index.html'));
    })
    .post('/feedback', function (request, parentResponse) {
        console.log('Feedback');
        axios
            .get(newsURL)
            .then(function (response) {
                console.log('Response received from News API'+request.body.recbrnd);
                console.log(request);
                parentResponse.render('response', {
                    articles: response.data.articles,
                    storeNum:request.body.strnbr,
                    brand:request.body.recbrand
                });
            })
            .catch(function (error) {
                parentResponse.render('error');
            });
    })
    .get('/news', function (request, parentResponse) {
        axios
            .get(newsURL)
            .then(function (response) {
                parentResponse.render('response', {
                    articles: response.data.articles
                });
            })
            .catch(function (error) {
                parentResponse.render('error');
            });
    })
    .listen(port, function () {
        console.log('Server Started at ' + port);
    });