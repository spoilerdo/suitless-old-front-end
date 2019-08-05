import { apiCall } from "@/services/api";
import { LOG_URL, NOTIFICATION_HANDLER } from "../../generalconstants"
import { SET_SERVICES, SET_LOGS } from "./mutation-types"

const state = {
    services: [],
    logs: []
}

const getters = {

    getServices: (state) => () => {
        return state.services;
    }
}

const actions = {
    updateServices({ commit, dispatch }) {
        apiCall("GET", `${LOG_URL}/services`)
            .then(data => {
                commit(SET_SERVICES, data.containers);
            }).catch(e => {
                dispatch(NOTIFICATION_HANDLER, { message: e, type: "error" }, { root: true });
            })
    },
    getLogs({ commit, dispatch }, serviceName) {
        apiCall("GET", `${LOG_URL}/${serviceName}`)
            .then(data => {
                commit(SET_LOGS, data.logs);
            }).catch(e => {
                dispatch(NOTIFICATION_HANDLER, { message: e, type: "error" }, { root: true });
            })
    }

}

const mutations = {
    [SET_SERVICES](state, services) {
        state.services = services;
    },
    [SET_LOGS](state, logs) {
        state.logs = logs;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}