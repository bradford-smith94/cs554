/* Bradford Smith (bsmith8)
 * CS 554 Lab 6 server.js
 * 10/25/2017
 */

const bluebird = require('bluebird');
const bodyParser = require('body-parser');
const express = require('express');

const nrpSender = require('./nrp-sender-shim');
const redisConnection = require('./redis-connection');

const app = express();

app.use(bodyParser.json());

/* === routes begin here =================================================== */

/**
 * GET /api/people/:id
 *
 * This route will publish a message to request a person from the worker, and
 * render JSON of the person (or of an error, should one occur).
 */
app.get("/api/people/:id", async function (request, response) {
    try {
        let msgResponse = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: 'get-person',
            data: {
                id: request.params.id
            },
            expectsResponse: true
        });

        response.json(msgResponse);
    } catch (e) {
        response.status(e.errorCode).json({ error: e.message });
    }
});

/**
 * POST /api/people
 *
 * This route will publish a message to request that the worker creates a
 * person, and render JSON of the person created (or of an error, should one
 * occur).
 */
app.post("/api/people", async function (request, response) {
    try {
        let msgResponse = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: 'create-person',
            data: {
                person: request.body.message
            },
            expectsResponse: true
        });

        response.json(msgResponse);
    } catch (e) {
        response.status(e.errorCode).json({ error: e.message });
    }
});

/**
 * DELETE /api/people/:id
 *
 * This route will publish a message to request that the worker deletes a
 * person, and render JSON stating that the operation completed (or of an error,
 * should one occur).
 */
app.delete("/api/people/:id", async function (request, response) {
    try {
        let msgResponse = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: 'delete-person',
            data: {
                id: request.params.id
            },
            expectsResponse: true
        });

        response.json(msgResponse);
    } catch (e) {
        response.status(e.errorCode).json({ error: e.message });
    }
});

/**
 * PUT /api/people/:id
 *
 * This route will publish a message to request that the worker updates a
 * person, and render JSON of the person updated (or of an error, should one
 * occur).
 */
app.put("/api/people/:id", async function (request, response) {
    try {
        let msgResponse = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: 'update-person',
            data: {
                id: request.params.id,
                person: request.body.message
            },
            expectsResponse: true
        });

        response.json(msgResponse);
    } catch (e) {
        response.status(e.errorCode).json({ error: e.message });
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
