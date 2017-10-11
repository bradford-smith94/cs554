import axios from 'axios';

const apiRoot = 'https://pokeapi.co/api/v2/';

const instance = axios.create();

axios.interceptors.request.use(function (config) {
  config.url = `${apiRoot}${config.url}`;
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default instance;
