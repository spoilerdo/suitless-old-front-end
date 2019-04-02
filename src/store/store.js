import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app/app'
import survey from './modules/survey/survey';
import answer from './modules/survey/answer/answer';
import progress from './modules/survey/progress/progress';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        app,
        survey,
        answer,
        progress
    },
    strict: debug
})