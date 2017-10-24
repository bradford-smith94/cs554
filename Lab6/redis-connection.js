/* Bradford Smith
 * CS 554 Lab 6 redis-connection.js
 * 10/23/2017
 */

const nrp = require('node-redis-pubsub');
const config = {
    port: 6379,
    scope: 'api'
};

module.exports = new nrp(config);
