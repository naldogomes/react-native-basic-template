import axios from 'axios';

const api = axios.create({
    baseURL: 'http://46.101.4.142:80',
    timeout: 10000
});

export default api;
