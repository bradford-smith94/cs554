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

        let id = parseInt(message.data.id, 10);

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
                data: person,
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
        let requestId = message.requestId;
        let eventName = message.eventName;

        let successEvent = `${eventName}:success:${requestId}`;
        let failedEvent = `${eventName}:failed:${requestId}`;

        let person = message.data.person;
        let errorMessage = '';

        //error check given fields
        if (person.id === null || person.id === undefined) {
            errorMessage = 'ID is required';
        } else if (person.first_name === null || person.first_name === undefined) {
            errorMessage = 'first_name is required';
        } else if (person.last_name === null || person.last_name === undefined) {
            errorMessage = 'last_name is required';
        } else if (person.email === null || person.email === undefined) {
            errorMessage = 'email is required';
        } else if (person.gender === null || person.gender === undefined) {
            errorMessage = 'gender is required';
        } else if (person.ip_address === null || person.ip_address === undefined) {
            errorMessage = 'ip_address is required';
        } else if (typeof(person.id) !== 'number' || isNaN(person.id) || person.id <= 0) {
            errorMessage = 'Invalid value for ID';
        } else if (typeof(person.first_name) !== 'string') {
            errorMessage = 'Invalid value for first_name';
        } else if (typeof(person.last_name) !== 'string') {
            errorMessage = 'Invalid value for last_name';
        } else if (typeof(person.email) !== 'string') {
            errorMessage = 'Invalid value for email';
        } else if (typeof(person.gender) !== 'string') {
            errorMessage = 'Invalid value for gender';
        } else if (typeof(person.ip_address) !== 'string') {
            errorMessage = 'Invalid value for ip_address';
        }

        for (let i = 0; i < data.length; i++) {
            if (data[i]['id'] == person.id) {
                errorMessage = 'Invalid value for ID';
            }
        }

        if (errorMessage == '') {
            data.push(person);
            redisConnection.emit(successEvent, {
                requestId: requestId,
                data: person,
                eventName: eventName
            });
        } else {
            redisConnection.emit(failedEvent, {
                requestId: requestId,
                data: {
                    message: errorMessage,
                    errorCode: 400
                },
                eventName: eventName
            });
        }
    });

    //DELETE /api/people/:id
    redisConnection.on('delete-person:request:*', function (message, channel) {
        let requestId = message.requestId;
        let eventName = message.eventName;

        let id = parseInt(message.data.id, 10);

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

        let found = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i]['id'] == id) {
                data.splice(i, 1);
                found = true;
                break;
            }
        }

        if (found) {
            redisConnection.emit(successEvent, {
                requestId: requestId,
                data: {
                    success: 'Person deleted'
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

    //PUT /api/people/:id
    redisConnection.on('update-person:request:*', function (message, channel) {
        let requestId = message.requestId;
        let eventName = message.eventName;

        let successEvent = `${eventName}:success:${requestId}`;
        let failedEvent = `${eventName}:failed:${requestId}`;

        let id = parseInt(message.data.id, 10);
        let person = message.data.person;
        let errorMessage = '';

        //error check given fields, use id from route not body
        if (id === null || id === undefined) {
            errorMessage = 'ID is required';
        } else if (person.first_name === null || person.first_name === undefined) {
            errorMessage = 'first_name is required';
        } else if (person.last_name === null || person.last_name === undefined) {
            errorMessage = 'last_name is required';
        } else if (person.email === null || person.email === undefined) {
            errorMessage = 'email is required';
        } else if (person.gender === null || person.gender === undefined) {
            errorMessage = 'gender is required';
        } else if (person.ip_address === null || person.ip_address === undefined) {
            errorMessage = 'ip_address is required';
        } else if (typeof(id) !== 'number' || isNaN(id) || id <= 0) {
            errorMessage = 'Invalid value for ID';
        } else if (typeof(person.first_name) !== 'string') {
            errorMessage = 'Invalid value for first_name';
        } else if (typeof(person.last_name) !== 'string') {
            errorMessage = 'Invalid value for last_name';
        } else if (typeof(person.email) !== 'string') {
            errorMessage = 'Invalid value for email';
        } else if (typeof(person.gender) !== 'string') {
            errorMessage = 'Invalid value for gender';
        } else if (typeof(person.ip_address) !== 'string') {
            errorMessage = 'Invalid value for ip_address';
        }

        let found = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i]['id'] == id) {
                data.splice(i, 1, person);
                found = true;
                break;
            }
        }

        if (errorMessage == '' && found) {
            redisConnection.emit(successEvent, {
                requestId: requestId,
                data: person,
                eventName: eventName
            });
        } else {
            if (!found) {
                redisConnection.emit(failedEvent, {
                    requestId: requestId,
                    data: {
                        message: 'Person not found',
                        errorCode: 404
                    },
                    eventName: eventName
                });
            } else {
                redisConnection.emit(failedEvent, {
                    requestId: requestId,
                    data: {
                        message: errorMessage,
                        errorCode: 400
                    },
                    eventName: eventName
                });
            }
        }
    });
}());
