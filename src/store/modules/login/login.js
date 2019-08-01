import {apiCall, setToken} from '@/services/api'
import { API_URL, NOTIFICATION_HANDLER } from '../../generalconstants';
import router from '@/router/router'
import { SET_LOGGING_IN, SET_LOGIN_TEXT, SET_ALERT } from './mutation-types';

/**
 * The login module contains the login/ register API calls to the account service
 * and contians feedback of these calls and if the user wants to register or login
 * This submodule is used in the following view:
 * - Login (mapState loggingIn, logginrText, alert and MapActions registerUser, loginUser, switchForms)
 * @name login
 * @memberof store
 */

// initial state
const state = {
    loggingIn: true,
    loginText: "Login",
    alert: {
        type: "info",
        message: ""
    },
    token: localStorage.getItem('jwtToken') || ""
}

// getters
const getters = {
    /**
     * Returns the isLogging in boolean which is false if the user is attempting to register.
     * @memberof store.login
     */
    GetloggingIn: (state) => () => {
        return state.loggingIn;
    },
    isAuthenticated: state => !!state.token
}

// actions
const actions = {
    
     /**
      * Attempts to create a new account at the server from the user data
      * @memberof store.login
      */
    registerUser ({ commit, dispatch }, registerData) {
        apiCall('post', `${API_URL}/accounts/`, {email: registerData.email, firstName: registerData.firstName, lastName: registerData.lastName, password: registerData.password})
        .then(() => {
            commit(SET_ALERT, {type:"success", message: "Successfully created account!"})
            dispatch(NOTIFICATION_HANDLER, { message: "Successfully created account", type: "success", noSnackbar: true }, { root:true });
        }).catch(e => {
            commit(SET_ALERT, {type:"error", message: e.response.data.message});
            dispatch(NOTIFICATION_HANDLER, { message: e, type: "error", noSnackbar: true }, { root:true });
        })
    },

    /**
     * Attempts to log the user in based on the entered information.
     * @memberof store.login
     */
    loginUser({ commit, dispatch }, loginData) {
        apiCall('post', `${API_URL}/login`, {email: loginData.email, password: loginData.password})
            .then((req => {
                localStorage.setItem('jwtToken', req.token);
                setToken(req.token);
                router.push("/dashboard");
            })).catch(e => {
                commit(SET_ALERT, {type:"error", message: "Email or password invalid"});
                dispatch(NOTIFICATION_HANDLER, { message: e, type: "error", noSnackbar: true }, { root:true });
            });
    },

    /**
     * Displays the correct form based on the loggingIn boolean.
     * @memberof store.login
     */
    switchForms({ commit }, loggingIn) {
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