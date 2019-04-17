import { SET_PROFILES, ADD_PROFILE } from "./mutation-types";
import { apiCall } from "../../../api/api";
import { API_URL } from '../../serverconstants';
import * as jwt_decode from 'jwt-decode';

// initial state
const state = {
    profiles: []
}

const getters = {
    getProfiles: (state) => () => {
        return state.profiles;
    }
}

const actions = {
    getAllProfiles({commit}) {
        var token = getToken();
        if(token !== 0) {
            apiCall('get', `${API_URL}/profiles/account/${token.userID}`).then((req => {
                commit(SET_PROFILES, req);
            }));
        }
            
    },
    addProfile({commit}, name) {
        var token = getToken();
        if(token !== 0) {
            apiCall('post', `${API_URL}/profiles/`, {
                name : name,
                accountID : token
            }).then((req => {
                commit(ADD_PROFILE, req);
                console.log("hoi");
            }));
        }
    }
}

const mutations = {
    [SET_PROFILES](state, profiles) {
        state.profiles = profiles;
    },
    [ADD_PROFILE](state, profile) {
        state.profiles.push(profile);
    }
}

function getToken() {
    let token = localStorage["jwtToken"] || 0;
    if(token !== 0) {
        token = jwt_decode(token);
    }
    return token;
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}