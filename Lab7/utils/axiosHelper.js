/* Bradford Smith (bsmith8)
 * CS 554 Lab 7 utils/axiosHelper.js
 * 11/12/2017
 */

const axios = require('axios');
const apiKey = '<pixabay-api-key>';

const instance = axios.create({
    baseURL: 'https://pixabay.com/api/?key=' + apiKey
});

module.exports = instance;
