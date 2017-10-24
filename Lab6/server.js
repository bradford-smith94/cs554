/* Bradford Smith (bsmith8)
 * CS 554 Lab 6 server.js
 * 10/23/2017
 */

const express = require('express');
const bluebird = require('bluebird');
const redis = require('redis');

const app = express();
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

/* === routes begin here =================================================== */

/**
 * GET /api/people/:id
 *
 * This route will publish a message to request a person from the worker, and
 * render JSON of the person (or of an error, should one occur).
 */
app.get("/api/people/:id", async function (request, response) {
});

/**
 * POST /api/people
 *
 * This route will publish a message to request that the worker creates a
 * person, and render JSON of the person created (or of an error, should one
 * occur).
 */
app.post("/api/people", async function (request, response) {
});

/**
 * DELETE /api/people/:id
 *
 * This route will publish a message to request that the worker deletes a
 * person, and render JSON stating that the operation completed (or of an error,
 * should one occur).
 */
app.delete("/api/people/:id", async function (request, response) {
});

/**
 * PUT /api/people/:id
 *
 * This route will publish a message to request that the worker updates a
 * person, and render JSON of the person updated (or of an error, should one
 * occur).
 */
app.put("/api/people/:id", async function (request, response) {
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
