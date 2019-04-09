import axios from 'axios';

//TODO settoken functie fixen
export const setToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

//Nick's version
/*export const apiCall = (method, path, data) => {
    return new Promise((resolve, reject) => {
        return axios[method.toLowerCase()](path, data, { headers: { 'Access-Control-Allow-Origin': '*' } })
            .then(res => {
                return resolve(res.data);
            })
            .catch(err => {
                return reject(err.response.data.error);
            })
    });
}*/

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