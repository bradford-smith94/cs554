/* Bradford Smith (bsmith8)
 * CS 554 Lab 5 server.js
 * 10/19/2017
 */

const express = require('express');
const bluebird = require('bluebird');
const redis = require('redis');

const data = require('./data.js');

const app = express();
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

//most recently used IDs
let mru = [];

/* === routes begin here =================================================== */

/**
 * GET /api/people/history
 *
 * This route will resond with an array of the last 20 users in the cache from
 * the recently viewed list. It may include duplicate users.
 */
app.get("/api/people/history", async function (request, response) {
    let history = [];
    for (let i = 0; i < mru.length && i < 20; i++) {
        history.push(
            JSON.parse(await client.getAsync(mru[i]))
        );
    }
    response.send(history);
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
app.get("/api/people/:id", async function (request, response) {
    const id = request.params.id;
    const cacheResponse = await client.getAsync(id);

    if (cacheResponse) {
        response.json({ person: JSON.parse(cacheResponse) });
        mru.unshift(id);
    } else {
        try {
            person = await data.getById(parseInt(id, 10));
            response.json({ person });
            mru.unshift(id);
            let cacheRequest = await client.setAsync(id,
                                                     JSON.stringify(person));
        } catch (errorMessage) {
            if (typeof(errorMessage) === 'object') {
                response.status(404).json({ error: errorMessage.error });
            } else {
                response.status(400).json({ error: errorMessage });
            }
        }
    }
});

/**
 * Catch anything else and give a 404
 */
app.use("*", function (request, response) {
    response.status(404).json({ error: "Route Not Found" });
});

app.listen(3000, function() {
    console.log("Server is now listening on port 3000.");
});
