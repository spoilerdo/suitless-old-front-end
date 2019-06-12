import {apiCall, setToken} from '../../../api/api'
import { API_URL } from '../../serverconstants';
import router from '@/router/router'
import { SET_LOGGING_IN, SET_LOGIN_TEXT, SET_ALERT } from './mutation-types';

/**
 * The login module contains the login/ register API calls to the account service
 * and contians feedback of these calls and if the user wants to register or login
 * This submodule is used in the following view:
 * - Login (mapState loggingIn, logginrText, alert and MapActions registerUser, loginUser, switchForms)
 */

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
    /**
     * If an action succeeded or fails the user gets an alert within the form
     */
    
    registerUser ({commit}, registerData) {
        apiCall('post', `${API_URL}/accounts/`, {email: registerData.email, firstName: registerData.firstName, lastName: registerData.lastName, password: registerData.password})
        .then((req => {
            commit(SET_ALERT, {type:"success", message:"Successfully created account!"})
        })).catch(e => {
            commit(SET_ALERT, {type:"error", message:e.message});
        })
    },

    loginUser({commit}, loginData) {
        apiCall('post', `${API_URL}/login`, {email: loginData.email, password: loginData.password})
            .then((req => {
                localStorage.setItem('jwtToken', req.token);
                setToken(req.token);
                router.push("/dashboard");
            })).catch(e => {
                commit(SET_ALERT, {type:"error", message: "email or password invalid"});
            });
    },

    switchForms({commit}, loggingIn) {
        if(state.loggingIn){
            commit(SET_LOGIN_TEXT, "Register");
        } else {
            commit(SET_LOGIN_TEXT, "Login");
        }
        commit(SET_ALERT, {type:null, message: null});
        commit(SET_LOGGING_IN, loggingIn);
    }
}

// mutations
const mutations = {
    [SET_LOGGING_IN](state, loggingIn) {
        state.loggingIn = loggingIn;
    },
    [SET_LOGIN_TEXT](state, loginText) {
        state.loginText = loginText;
    },
    [SET_ALERT](state, payload) {
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