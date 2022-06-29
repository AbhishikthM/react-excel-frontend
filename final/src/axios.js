import axios from 'axios';

const instance = axios.create({
    baseURL : 'locahost:8001'
});

export default instance