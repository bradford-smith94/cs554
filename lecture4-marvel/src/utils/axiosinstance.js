import axios from "axios";
import qs from "qs";

const apiRoot = "https://gateway.marvel.com:443/v1/public/";
const apiKey = "<m-api-key>";
//const url = `${apiRoot}/characters?nameStartsWith={searchQuery}&${apiKey}`

const instance = axios.create();

axios.interceptors.request.use(function (config) {
  if (config.url.indexOf("?") >= 0) {
    config.url = `${apiRoot}${config.url}&apikey=${apikey}`
  } else {
    config.url = `${apiRoot}${config.url}&apikey=${apikey}`
  }
  console.log(config);
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default instance;
