import axios from 'axios';
const URL = 'http://localhost:3093/api/';

export default axios.create({
    baseURL: URL,
});

export const axiosPrivate = axios.create({
    baseURL: URL,
    headers: { 'Content-Type': 'application/json' },
    // withCredentials: true
});