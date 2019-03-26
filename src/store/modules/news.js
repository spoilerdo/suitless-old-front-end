import news from '../../api/news'

// initial state
const state = {
    items: []
}

// getters
const getters = {
    getNewsById: (state) => (id) => {
        return state.items.find(item => item.id === id);
    }
}

// actions
const actions = {
    getAllNews ({ commit }) {
        news.getNewsArticles(items => {
            commit('setItems', items)
        })
    }
}

// mutations
const mutations = {
    setItems (state, items) {
        state.items = items;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}