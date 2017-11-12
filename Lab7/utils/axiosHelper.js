/* Bradford Smith (bsmith8)
 * CS 554 Lab 7 utils/axiosHelper.js
 * 11/12/2017
 */

const axios = require('axios');
const apiRoot = 'https://pixabay.com/api/'
const apiKey = '<pixabay-api-key>';

let instance = axios.create({
    baseURL: apiRoot
});

instance.interceptors.request.use(
    function (config) {
        if (config.url.indexOf('?') >= 0) {
            config.url = config.url + '&key=' + apiKey
        } else {
            config.url = config.url + '?key=' + apiKey
        }

        return config
    },
    function (error) {
        return Promise.reject(error);
    }
);

module.exports = instance;
