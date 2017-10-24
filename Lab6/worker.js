/* Bradford Smith (bsmith8)
 * CS 554 Lab 6 worker.js
 * 10/23/2017
 */

const request = require('request-promise');

const redisConnection = require('./redis-connection');

const url = 'https://gist.githubusercontent.com/philbarresi/' +
    '5cf15393d245b38a2d86ce8207d5076c/raw/' +
    'd529fb474c1af347702ca4d7b992256237fa2819/lab5.json';

(async function() {
    let data = await request(url, true);

    redisConnection.on('get-person', function (message, channel) {
        let messageText = message.data.message;
    });
    redisConnection.on('create-person', function (message, channel) {
        let messageText = message.data.message;
    });
    redisConnection.on('delete-person', function (message, channel) {
        let messageText = message.data.message;
    });
    redisConnection.on('update-person', function (message, channel) {
        let messageText = message.data.message;
    });
}());
