// initial state
const state = {
    drawerOpen: false,
    newUser : true
}

// getters
const getters = {
    getDrawer: (state) => () => {
        return state.drawerOpen;
    },
    getNewUser: (state) => () => {
        return state.newUser;
    }
}

// actions
const actions = {
    setDrawer ({ commit}, drawerOpen) {
       commit("setDrawer", drawerOpen);
    },

    setNewUser({ commit}, newUser) {
        commit("setNewUser", newUser);
    }
}

// mutations
const mutations = {
    setDrawer (state, drawerOpen) {
        state.drawerOpen = drawerOpen;
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