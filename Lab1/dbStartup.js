/* Bradford Smith
 * CS 554 Lab 1 dbStartup.js
 * 09/06/2017
 */

var MongoClient = require('mongodb').MongoClient,
    settings = require('./dbConfig.js'),
    Guid = require('guid');

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;

function runSetup() {
    return MongoClient.connect(fullMongoUrl)
        .then(function(db) {
            return db.createCollection("todos");
        }).then(function(todoCollection) {

            return todoCollection.count().then(function(theCount) {
                if (theCount > 0) {
                    return todoCollection.find().toArray();
                }
            });
        });
}

var exports = module.exports = runSetup;
