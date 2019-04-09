import axios from 'axios';

const instance = axios.create();

//TODO settoken functie fixen
export const setToken = (token) => {
    if(token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete instance.defaults.headers.common['Authorization'];
    }
}

export const apiCall = (method, path, data) => {
    console.log(instance.defaults.headers.common['Authorization']);
    return new Promise((resolve, reject) => {
        return instance[method.toLowerCase()](path, data, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }})
            .then(res => {
                return resolve(res.data);
            })
            .catch(err => {
                return reject(err.response.data.error);
            })
    });
}