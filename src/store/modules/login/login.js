import {apiCall, setToken} from '../../../api/api'
import { API_URL } from '../../serverconstants';

// initial state
const state = {
    loggingIn: true,
    loginText: "Login",

    loginForm: {
        Email: null,
        Password: null
    },

    registerForm: {
        Email: null,
        FirstName: null,
        LastName: null,
        Password: null,
        ConfirmPassword: null
    },
    emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    nameRules: [v => !!v || "Name is required"],
    passwordRules: [
        v => !!v || "Password is required",
        v => (v || "").length >= 8 || `A minimum of 8 characters is required`
    ],
    alert: {
        type: null,
        Message: null
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
    registerUser ({commit}, registerForm) {
        commit(apiCall('post', `${API_URL}/accounts/`, {registerForm}));
    },

    loginUser({commit}, loginForm) {
            commit(apiCall('post', `${API_URL}/login`, {loginForm})
            .then((req => {
                localStorage.setItem('jwtToken', req.token);
                setToken(req.token);
            })).catch(e => {
                commit("setAlert", "error", e.message);
            }));
    }
}

// mutations
const mutations = {
    setloggingIn(loggingIn) {
        state.loggingIn = loggingIn;
    },

    setAlert(type, message) {
        state.alert.type = type;
        state.alert.message = message;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}