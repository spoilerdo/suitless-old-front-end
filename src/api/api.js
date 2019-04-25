import axios from 'axios';

//TODO settoken functie fixen
export const setToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const apiCall = (method, path, data) => {
    return new Promise((resolve, reject) => {
        return axios[method.toLowerCase()](path, data, { headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } })
        .then(res => {
            return resolve(res.data);
        })
        .catch(err => {
            return reject(err.response.data.error);
        })
    });
}

export const asyncApiCall = (method, path, data) => {
    return axios[method.toLowerCase()](path, data, {headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}})
        .then(res => {
            return res.data;
        })
        .catch(e => {
            return e.response.data.error;
        })
}