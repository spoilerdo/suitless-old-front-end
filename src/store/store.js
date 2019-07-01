import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app/app';
import cdn from './modules/cdn/cdn';
import login from './modules/login/login'
import survey from './modules/survey/survey';
import answer from './modules/survey/answer/answer';
import progress from './modules/survey/progress/progress';
import flowcharteditor from './modules/flowcharteditor/flowcharteditor';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

/**
 * The store file is the main script that combines all the submodules into one big store.
 * From here you can enter the different submodules by using the standard vuex methods (e.g. mapActions)
 * @name store
 * @namespace
 */
export default new Vuex.Store({
    modules: {
        app,
        cdn,
        login,
        survey,
        answer,
        progress,
        flowcharteditor
    },
    strict: debug
})