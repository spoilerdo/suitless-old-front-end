import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app/app'
import survey from './modules/survey/survey';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        app,
        survey,
    },
    strict: debug
})