import axios from 'axios';

const apiRoot = 'https://pokeapi.co/api/v2/';

const instance = axios.create({ baseURL: apiRoot });

export default instance;
