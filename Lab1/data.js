/* Bradford Smith
 * CS 554 Lab 1 data.js
 * 09/07/2017
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

        /**
         * getAllTodos()
         *
         * Return list of all todo items in the collection
         */
        exports.getAllTodos = function() {
            return todoCollection.find().toArray();
        };

        /**
         * getTodo(id)
         *
         * Return a todo item by given id
         */
        exports.getTodo = function(id) {
            if (id == null || id === undefined) return Promise.reject("You must provide id!");

            if (typeof(id) !== "string") return Promise.reject("Invalid value for id!");

            return todoCollection.find({ _id: id }).limit(1).toArray().then(function(listOfTodos) {
                if (listOfTodos.length === 0) throw "Could not find todo with id of " + id;

                return listOfTodos[0];
            });
        };

        /**
         * createTodo(title, description, hoursEstimated)
         *
         * Create a new todo item with given title, description and
         * hoursEstimated. Initial completed status will be false, comments will
         * be empty and an id will be generated.
         *
         * Return the new todo item.
         */
        exports.createTodo = function(title, description, hoursEstimated) {
            if (title == null || title === undefined) return Promise.reject("You must provide title!");
            if (description == null || description === undefined) return Promise.reject("You must provide description!");
            if (hoursEstimated == null || hoursEstimated === undefined) return Promise.reject("You must provide hoursEstimated!");

            if (typeof(title) !== "string") return Promise.reject("Invalid value for title!");
            if (typeof(description) !== "string") return Promise.reject("Invalid value for description!");
            if (hoursEstimated <= 0 || typeof(hoursEstimated) !== "number") return Promise.reject("Invalid value for hoursEstimated!");

            return todoCollection.insertOne({ _id: Guid.create().toString(), title: title, description: description, hoursEstimated: hoursEstimated, completed: false, comments: [] }).then(function(newDoc) {
                return newDoc.insertedId;
            }).then(function(newId) {
                return exports.getTodo(newId);
            });
        };

        /**
         * updateTodo(id, title, description, hoursEstimated, completed)
         *
         * Update todo item by given id with given title, description,
         * hoursEstimated and completed. Comments will be unchanged.
         *
         * Return the updated todo item.
         */
        exports.updateTodo = function(id, title, description, hoursEstimated, completed) {
            if (id == null || id === undefined) return Promise.reject("You must provide id!");
            if (title == null || title === undefined) return Promise.reject("You must provide title!");
            if (description == null || description === undefined) return Promise.reject("You must provide description!");
            if (hoursEstimated == null || hoursEstimated === undefined) return Promise.reject("You must provide hoursEstimated!");
            if (completed == null || completed === undefined) return Promise.reject("You must provide completed!");

            if (typeof(id) !== "string") return Promise.reject("Invalid value for id!");
            if (typeof(title) !== "string") return Promise.reject("Invalid value for title!");
            if (typeof(description) !== "string") return Promise.reject("Invalid value for description!");
            if (hoursEstimated <= 0 || typeof(hoursEstimated) != "number") return Promise.reject("Invalid value for hoursEstimated!");
            if (typeof(completed) !== "boolean") return Promise.reject("Invalid value for completed status!");

            //use $set so we don't have to do extra work to preseve the comments
            return todoCollection.updateOne({ _id: id }, { $set: { title: title, description: description, hoursEstimated: hoursEstimated, completed: completed }}).then(function() {
                return exports.getTodo(id);
            });
        };

        /**
         * updateTodoPartial(id, title, description, hoursEstimated, completed)
         *
         * Update todo item by given id. Other parameters are optional with the
         * exception that at least one must be present. Otherwise the same as
         * 'updateTodo()'.
         *
         * Return the updated todo item.
         */
        exports.updateTodoPartial = function(id, title, description, hoursEstimated, completed) {
            if (id == null || id === undefined) return Promise.reject("You must provide id!");

            if ((title == null || title === undefined) &&
                (description == null || description === undefined) &&
                (hoursEstimated == null || hoursEstimated === undefined) &&
                (completed == null || completed === undefined)) {
                return Promise.reject("You must provide at least one of: title, description, hoursEstimated or completed!");
            }

            if ((hoursEstimated != null && hoursEstimated !== undefined) &&
                (hoursEstimated <= 0 || typeof(hoursEstimated) !== "number")) {
                return Promise.reject("Invalid value for hoursEstimated!");
            }
            if ((completed != null && completed !== undefined) &&
                typeof(completed) !== "boolean") {
                return Promise.reject("Invalid value for completed status!");
            }

            //setup an object for what fields are to be updated
            let updateObject = {}
            if (title) updateObject["title"] = title;
            if (description) updateObject["description"] = description;
            if (hoursEstimated) updateObject["hoursEstimated"] = hoursEstimated;
            if (completed != null && completed !== undefined) updateObject["completed"] = completed;

            //use $set to do a partial update on the updateObject
            return todoCollection.updateOne({ _id: id }, { $set: updateObject}).then(function() {
                return exports.getTodo(id);
            });
        };

        /**
         * createComment(id, name, comment)
         *
         * Add a comment to the todo item of the given id with the given name
         * and comment. An id will be generated for the comment.
         *
         * Return the updated todo item.
         */
        exports.createComment = function(id, name, comment) {
            if (id == null || id === undefined) return Promise.reject("You must provide id!");
            if (name == null || name === undefined) return Promise.reject("You must provide name!");
            if (comment == null || comment === undefined) return Promise.reject("You must provide comment!");

            if (typeof(id) !== "string") return Promise.reject("Invalid value for id!");
            if (typeof(name) !== "string") return Promise.reject("Invalid value for name!");
            if (typeof(comment) !== "string") return Promise.reject("Invalid value for comment!");

            //create an object to hold the comment
            newComment = {
                "id": Guid.raw(),
                "name": name,
                "comment": comment
            };

            //$push the newComment object onto the list of comments
            return todoCollection.updateOne({ _id: id }, { $push: { comments: newComment }}).then(function() {
                return exports.getTodo(id);
            });
        };

        /**
         * deleteComment(id, commentId)
         *
         * Remove the comment matching commentId from the todo item of the given
         * id.
         *
         * Return true.
         */
        exports.deleteComment = function(id, commentId) {
            if (id == null || id === undefined) return Promise.reject("You must provide id!");
            if (commentId == null || commentId === undefined) return Promise.reject("You must provide commentId!");

            if (typeof(id) !== "string") return Promise.reject("Invalid value for id!");
            if (typeof(commentId) !== "string") return Promise.reject("Invalid value for commentId!");

            //$pull out comments with 'id: commentId'
            return todoCollection.updateOne({ _id: id }, { $pull: { comments: { id: commentId }}}).then(function() {
                return true
            });
        };
    });
