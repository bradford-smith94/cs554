/* Bradford Smith (bsmith8)
 * CS 554 Lab 5 server.js
 * 10/18/2017
 */

const express = require('express');
const bluebird = require('bluebird');
const redis = require('redis');

const data = require('./data.js');

const app = express();
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

/* === routes begin here =================================================== */

/**
 * GET /api/people/history
 *
 * This route will resond with an array of the last 20 users in the cache from
 * the recently viewed list. It may include duplicate users.
 */
app.get("/api/people/history", function (request, response) {
    response.json({ success: "Good Route" });
});

/**
 * GET /api/people/:id
 *
 * This route will check if the user has a cache entry in redis. If so it will
 * render that cache entry, else it will query the data module for the person
 * and fail the request if they are not found or send json and cache the result
 * if they are found.
 *
 * If the person is found their ID will be added to a list of recently viewed
 * people ordered by most recently accessed first.
 */
app.get("/api/people/:id", function (request, response) {
    response.json({ success: "Good Route" });
});

/**
 * Catch anything else and give a 404
 */
app.use("*", function (request, response) {
    response.status(404).json({ error: "Not found" });
});

app.listen(3000, function() {
    console.log("Server is now listening on port 3000.");
});
