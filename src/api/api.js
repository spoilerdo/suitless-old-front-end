import axios from 'axios';

const instance = axios.create();

//TODO settoken functie fixen
export const setToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete instance.defaults.headers.common['Authorization'];
    }
}

//Martijn's version
export const apiCall = (methods, path, data) => {
    return axios[method.toLowerCase()](path, data, { headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } })
        .then(res => {
            return resolve(res.data);
        })
        .catch(err => {
            return reject(err.response.data.error);
        })
}