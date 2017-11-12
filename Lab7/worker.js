/* Bradford Smith (bsmith8)
 * CS 554 Lab 7 worker.js
 * 11/12/2017
 */

const axiosInstance = require('./utils/axiosHelper.js');
const redisConnection = require('./utils/redisConnection.js');

redisConnection.on('lookup:request:*', async function (message, channel) {
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
            data: {
                message: 'Name is required'
            }
        });
    } else if (search == null || search === undefined || search == '') {
        redisConnection.emit(failedEvent, {
            requestId,
            eventName,
            data: {
                message: 'Search query is required'
            }
        });
    }

    console.log('<' + name + '> requested: "' + search + '" and said "' + msg + '"');
    try {
        let results = await axiosInstance.get('&q=' + encodeURIComponent(search));

        redisConnection.emit(successEvent, {
            requestId,
            eventName,
            data: {
                name,
                message: msg,
                results: results.data
            }
        });
    } catch (e) {
        redisConnection.emit(failedEvent, {
            requestId,
            eventName,
            data: e
        });
    }
});

console.log('Worker started.');
