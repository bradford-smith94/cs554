/* Bradford Smith (bsmith8)
 * CS 554 Lab 7 server.js
 * 11/09/2017
 */

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const search = io.of('/search');
const usersToSocket = {};

app.use(express.static(__dirname + '/public'));

app.use('*', function (request, response) {
    response.status(404).sendFile(__dirname + '/404.html');
});

search.on('connection', function (socket) {
    socket.on('request', function (request) {
        if (usersToSocket[request.name] &&
            usersToSocket[request.name] !== socket) {
            socket.emit('name-fail');
        } else {
            usersToSocket[request.name] = socket;
            socket.emit('name-good');
        }
    });
});

http.listen(3000, function () {
    console.log('Server is now listening on port 3000.');
});
