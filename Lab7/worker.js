/* Bradford Smith (bsmith8)
 * CS 554 Lab 7 worker.js
 * 11/11/2017
 */

const axiosInstance = require('./axiosHelper.js');
const redisConnection = require('./redisConnection.js');

redisConnection.on('lookup:request:*', function (message, channel) {
    let requestId = message.requestId;
    let eventName = message.eventName;

    let successEvent = eventName + ':success:' + requestId;
    let failedEvent = eventName + ':failed:' + requestId;

    let name = message.data.name;
    let search = message.data.search;
    let msg = message.data.message;

    if (name == null || name === undefined || name == '') {
        redisConnection.emit(failedEvent, {
            requestId,
            eventName,
            data: 'Name is required'
        });
    } else if (search == null || search === undefined || search == '') {
        redisConnection.emit(failedEvent, {
            requestId,
            eventName,
            data: 'Search query is required'
        });
    }

    console.log('<' + name + '> requested: "' + search + '" and said "' + msg + '"');
});
