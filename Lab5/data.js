/* Bradford Smith
 * CS 554 Lab 5 data.js
 * 10/18/2017
 */

var exports = module.exports = {};

exports.getById = function(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
            reject();
        }, 5000);
    });
};
