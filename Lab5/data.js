/* Bradford Smith
 * CS 554 Lab 5 data.js
 * 10/18/2017
 */

const fs = require('fs');
const dataFile = './data.json';

var exports = module.exports = {};

exports.getById = function(id) {
    if (id === null || id === undefined)
        return Promise.reject('You must provide id!');
    if (typeof(id) !== 'number' || isNaN(id) || id < 0)
        return Promise.reject('Invalid value for id!');

    let people = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    let person = null
    for (let i = 0; i < people.length; i++) {
        if (people[i]['id'] == id) {
            person = people[i];
            break;
        }
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (person) {
                resolve(person);
            } else {
                reject({ error: 'Person Not Found' });
            }
        }, 5000);
    });
};
