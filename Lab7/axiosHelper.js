/* Bradford Smith
 * CS 554 Lab 7 axiosHelper.js
 * 11/11/2017
 */

const axios = require('axios');
const apiKey = '<pixabay-api-key>';
const instance = axios.create({ baseURL: 'https://pixabay.com/api/' });

axios.interceptors.request.use(function (config) {
    if (config.url.indexOf('?') >= 0) {
        config.url = config.url + '&key=' + apiKey;
    } else {
        config.url = config.url + '?key=' + apiKey;
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

module.exports = instance;
