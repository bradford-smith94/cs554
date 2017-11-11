/* Bradford Smith (bsmith8)
 * CS 554 Lab 7 redisConnection.js
 * 11/11/2017
 */

const nrp = require('node-redis-pubsub');
const config = {
    port: 6379,
    scope: 'api'
};

module.exports = new nrp(config);
