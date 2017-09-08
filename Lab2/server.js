/* Bradford Smith (bsmith8)
 * CS 554 Lab 2 server.js
 * 09/08/2017
 */

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(function (request, response) {
    response.status(404).send("Not Found");
});

app.listen(3000, function() {
    console.log("Server is now listening on port 3000");
});
