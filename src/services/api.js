import axios from 'axios';
import router from '@/router/router'

export const setToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const apiCall = (method, path, data) => {
    return new Promise((resolve, reject) => {
        return axios[method.toLowerCase()](
            path,
            data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/hal+json'
                }
            }).then(res => {
                return resolve(res.data);
            }).catch(err => {
                checkAuthentication(err);
                return reject(err);
            })
    });
}

export const apiCallWithContentType = (method, path, data, type) => {
    return new Promise((resolve, reject) => {
        return axios[method.toLowerCase()](
            path,
            data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': type
                }
            }).then(res => {
                return resolve(res.data);
            }).catch(err => {
                checkAuthentication(err);
                return reject(err);
            })
    });
}

//Used when the jwt token is outdate, just delete it then
function checkAuthentication(err) {
    if (err.response && err.response.status === 401 || err.message == "Network Error") {
        localStorage.clear();
        axios.defaults.headers.common['Authorization'] = "";
        router.push("/login");
    }
}