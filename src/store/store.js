import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app/app'
import login from './modules/login/login'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        app,
        login
    },
    strict: debug
})