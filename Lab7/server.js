/* Bradford Smith
 * CS 554 Lab 7 server.js
 * 11/09/2017
 */

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const usersToSocket = {};

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.use('*', function (request, response) {
    response.status(404).sendFile(__dirname + '/404.html');
});

http.listen(3000, function () {
    console.log('Server is now listening on port 3000.');
});
