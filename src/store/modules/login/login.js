import {apiCall, setToken} from '../../../api/api'
import { API_URL } from '../../serverconstants';
import router from '@/router/router'

// initial state
const state = {
    loggingIn: true,
    loginText: "Login",
    alert: {
        type: null,
        message: null
    }
}

// getters
const getters = {
    GetloggingIn: (state) => () => {
        return state.loggingIn;
    }
}

// actions
const actions = {
    registerUser ({commit}, registerData) {
        apiCall('post', `${API_URL}/accounts/`, {email: registerData.email, firstName: registerData.firstName, lastName: registerData.lastName, password: registerData.password})
        .then((req => {
            commit("setAlert", {type:"success", message:"Successfully created account!"})
        })).catch(e => {
            commit("setAlert", {type:"error", message:e.message});
        })
    },

    loginUser({commit}, loginData) {
        apiCall('post', `${API_URL}/login`, {email: loginData.email, password: loginData.password})
            .then((req => {
                localStorage.setItem('jwtToken', req.token);
                setToken(req.token);
                router.push("/dashboard");
            })).catch(e => {
                commit("setAlert", {type:"error", message: "email or password invalid"});
            });
    },

    switchForms({commit}, loggingIn) {
        if(state.loggingIn){
            commit("setLoginText", "Register");
        } else {
            commit("setLoginText", "Login");
        }
        commit("setAlert", {type:null, message: null});
        commit("setloggingIn", loggingIn);
    }
}

// mutations
const mutations = {
    setloggingIn(state, loggingIn) {
        state.loggingIn = loggingIn;
    },
    setLoginText(state, loginText) {
        state.loginText = loginText;
    },
    setAlert(state, payload) {
        state.alert.type = payload.type;
        state.alert.message = payload.message;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}