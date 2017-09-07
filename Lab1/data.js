/* Bradford Smith
 * CS 554 Lab 1 data.js
 * 09/06/2017
 */

var MongoClient = require('mongodb').MongoClient,
    runStartup = require('./dbStartup.js'),
    settings = require('./dbConfig.js'),
    Guid = require('guid');

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
var exports = module.exports = {};

runStartup().then(function(allTodos) {
    console.log("DB setup has completed with the following todos:");
    console.log(allTodos);
});

/**
 * task object:
 *      {
 *          "id": uuid,
 *          "title": string,
 *          "description": string,
 *          "hoursEstimated": number,
 *          "completed": boolean,
 *          "comments": comment[]
 *      }
 *
 * comment object:
 *      {
 *          "id": uuid,
 *          "name": string,
 *          "comment": string
 *      }
 */
MongoClient.connect(fullMongoUrl)
    .then(function(db) {
        var todoCollection = db.collection("todos");

        //get all todo items
        exports.getAllTodos = function() {
            return todoCollection.find().toArray();
        };

        //get todo by id
        exports.getTodo = function(id) {
            if (!id) return Promise.reject("You need to provide an ID");

            return todoCollection.find({ _id: id }).limit(1).toArray().then(function(listOfTodos) {
                if (listOfTodos.length === 0) throw "Could not find todo with id of " + id;

                return listOfTodos[0];
            });
        };

        //create todo item
        exports.createTodo = function(title, description, hoursEstimated) {
            if (!title) return Promise.reject("Title is required!");
            if (!description) return Promise.reject("Description is required!");
            if (hoursEstimated == null || hoursEstimated === undefined || hoursEstimated <= 0) return Promise.reject("Invalid value for hoursEstimated!");

            return todoCollection.insertOne({ _id: Guid.create().toString(), title: title, description: description, hoursEstimated: hoursEstimated, completed: false, comments: [] }).then(function(newDoc) {
                return newDoc.insertedId;
            }).then(function(newId) {
                return exports.getTodo(newId);
            });
        };

        //update todo item
        exports.updateTodo = function(id, title, description, hoursEstimated, completed) {
            if (!id) return Promise.reject("You need to provide an ID");
            if (!title) return Promise.reject("Title is required!");
            if (!description) return Promise.reject("Description is required!");
            if (hoursEstimated == null || hoursEstimated === undefined || hoursEstimated <= 0) return Promise.reject("Invalid value for hoursEstimated!");
            if (completed == null || completed === undefined || !(typeof(completed) === "boolean")) return Promise.reject("Invalid value for completed status!");

            //use $set so we don't have to do extra work to preseve the comments
            return todoCollection.updateOne({ _id: id }, { $set: { title: title, description: description, hoursEstimated: hoursEstimated, completed: completed }}).then(function() {
                return exports.getTodo(id);
            });
        };

        exports.updateTodoPartial = function(id, title, description, hoursEstimated, completed) {
            if (!id) return Promise.reject("You need to provide an ID");
            if (!title && !description && !hoursEstimated && !completed) return Promise.reject("You must provide at least one of: title, description, hoursEstimated or completed!");
            if (hoursEstimated == null || hoursEstimated === undefined || hoursEstimated <= 0) return Promise.reject("Invalid value for hoursEstimated!");
            if (completed == null || completed === undefined || !(typeof(completed) === "boolean")) return Promise.reject("Invalid value for completed status!");

            //TODO: make sure partial updates work fine
            return todoCollection.updateOne({ _id: id }, { $set: { title: title, description: description, hoursEstimated: hoursEstimated, completed: completed }}).then(function() {
                return exports.getTodo(id);
            });
        };
    });
