/* Bradford Smith (bsmith8)
 * CS 554 Lab 7 server.js
 * 11/11/2017
 */

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const search = io.of('/search');
const usersToSocket = {};

const nrpSender = require('./nrpSender.js');

app.use(express.static(__dirname + '/public'));

app.use('*', function (request, response) {
    response.status(404).sendFile(__dirname + '/404.html');
});

search.on('connection', function (socket) {
    socket.on('request', async function (request) {
        if (request.name == '') {
            socket.emit('name-fail', 'Name is required');
        } else if (usersToSocket[request.name] &&
            usersToSocket[request.name] !== socket) {
            socket.emit('name-fail', 'Name already in use');
        } else {
            usersToSocket[request.name] = socket;
            console.log(request.name);
            try {
                let response = await nrpSender.sendMessage({
                    eventName: 'lookup',
                    data: request
                });
                socket.emit('result', response);
            } catch (errorMessage) {
                socket.emit('request-fail', errorMessage);
            }
        }
    });
});

http.listen(3000, function () {
    console.log('Server is now listening on port 3000.');
});
