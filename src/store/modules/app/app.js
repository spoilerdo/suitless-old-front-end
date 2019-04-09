import { SET_DRAWER, SET_BACKGROUND } from "./mutation-types";

// initial state
const state = {
    drawerOpen: false,
    background: "#eee",
    newUser : true
}

// getters
const getters = {
    getDrawer: (state) => () => {
        return state.drawerOpen;
    },
    getBackground: (state) => () => {
        return state.background;
    },
    getNewUser: (state) => () => {
        return state.newUser;
    }
}

// actions
const actions = {
    setDrawer ({ commit}, drawerOpen) {
       commit(SET_DRAWER, drawerOpen);
    },
    setBackground({commit}, newBg) {
        commit(SET_BACKGROUND, newBg);
    },
    setNewUser({ commit}, newUser) {
        commit("setNewUser", newUser);
    }
}

// mutations
const mutations = {
    [SET_DRAWER] (state, drawerOpen) {
        state.drawerOpen = drawerOpen;
    },
    [SET_BACKGROUND] (state, newBg) {
        state.background = newBg;
    },
    setNewUser(state, newUser) {
        state.newUser = newUser;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}