var express = require('express'),
    bodyParser = require('body-parser'),
    azure = require('azure-storage'),
    port = 3000;


var app = express(),
    blobSvc = azure.createBlobService();
app.use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .post('/feedback', function(request, response) {
        console.log(request.body.recbrnd);
        var blob = blobSvc.listBlobsSegmented('appfiles', null, function(error, result, response) {
            if (!error) {
                // result.entries contains the entries
                // If not all blobs were returned, result.continuationToken has the continuation token.
                response.write('<p>Blob Token</p>');
            }
            else{
                response.send('Error')
            }

        });
    })
    .listen(port, function() {
        console.log('Server Started at ' + port);
    });