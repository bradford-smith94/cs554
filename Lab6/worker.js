/* Bradford Smith (bsmith8)
 * CS 554 Lab 6 worker.js
 * 10/25/2017
 */

const request = require('request-promise');

const redisConnection = require('./redis-connection');

const url = 'https://gist.githubusercontent.com/philbarresi/' +
    '5cf15393d245b38a2d86ce8207d5076c/raw/' +
    'd529fb474c1af347702ca4d7b992256237fa2819/lab5.json';

(async function() {
    let data = await request(url, true);
    data = JSON.parse(data);

    // GET /api/people/:id
    redisConnection.on('get-person:request:*', function (message, channel) {
        let requestId = message.requestId;
        let eventName = message.eventName;

        let messageText = message.data.id;
        let id = parseInt(messageText, 10);

        let successEvent = `${eventName}:success:${requestId}`;
        let failedEvent = `${eventName}:failed:${requestId}`;

        if (id <= 0 || isNaN(id)) {
            redisConnection.emit(failedEvent, {
                requestId: requestId,
                data: {
                    message: 'Invalid value for ID',
                    errorCode: 400
                },
                eventName: eventName
            });
        }

        let person = null;
        for (let i = 0; i < data.length; i++) {
            if (data[i]['id'] == id) {
                person = data[i];
                break;
            }
        }

        if (person !== null) {
            redisConnection.emit(successEvent, {
                requestId: requestId,
                data: {
                    person
                },
                eventName: eventName
            });
        } else {
            redisConnection.emit(failedEvent, {
                requestId: requestId,
                data: {
                    message: 'Person not found',
                    errorCode: 404
                },
                eventName: eventName
            });
        }
    });

    //POST /api/people/
    redisConnection.on('create-person:request:*', function (message, channel) {
        let messageText = message.data.message;
        console.log(messageText);
    });

    //DELETE /api/people/:id
    redisConnection.on('delete-person:request:*', function (message, channel) {
        let messageText = message.data.message;
        console.log(messageText);
    });

    //PUT /api/people/:id
    redisConnection.on('update-person:request:*', function (message, channel) {
        let messageText = message.data.message;
        console.log(messageText);
    });
}());
