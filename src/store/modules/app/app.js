import { SET_DRAWER, SET_BACKGROUND, SET_FOOTERCOLOR, SET_NEWUSER } from "./mutation-types";

// initial state
const state = {
    drawerOpen: false,
    background: "#eee",
    footerColor: "#fff",
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
    },
    getFooterColor: (state) => () => {
        return state.footerColor;
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
    setFooterColor({commit}, newColor) {
        console.log(newColor);
        commit(SET_FOOTERCOLOR, newColor);
    },
    setNewUser({ commit}, newUser) {
        commit(SET_NEWUSER, newUser);
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
    [SET_FOOTERCOLOR] (state, newColor){
        state.footerColor = newColor;
    },
    [SET_NEWUSER] (state, newUser) {
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