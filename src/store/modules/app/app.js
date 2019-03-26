// initial state
const state = {
    drawerOpen: null
}

// getters
const getters = {
    getDrawer: (state) => () => {
        return state.drawerOpen;
    }
}

// actions
const actions = {
    setDrawer ({ commit}, drawerOpen) {
       commit("setDrawer", drawerOpen);
    }
}

// mutations
const mutations = {
    setDrawer (state, drawerOpen) {
        state.drawerOpen = drawerOpen;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}