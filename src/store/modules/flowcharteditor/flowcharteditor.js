import { asyncApiCall } from '../../../api/api'
import { API_URL } from '../../serverconstants';
import { SET_DIALOG, SET_FLOWCHART, SET_GF, SET_QUESTION, SET_MODULE, SET_NOTIFICATION } from './mutation-types';

const state = {
    dialog: false,
    flowchart: null,
    generalfunctions: true,
    questionfunctions: false,
    modulefunctions: false,
    notificationfunctions: false
}

const getters = {}

const actions = {
    setDialog({commit}, dialogState){
        commit(SET_DIALOG, dialogState);
    },

    /*Sets the different modules to true in order to show them on the screen*/
    setGeneralFunctions({commit}, gfState){
        commit(SET_GF, gfState);
    },
    setQuestionFunctions({commit}, questionState){
        commit(SET_QUESTION, questionState);
    },
    setModuleFunctions({commit}, moduleState){
        commit(SET_MODULE, moduleState);
    },
    setNotificationFunctions({commit}, notificationState){
        commit(SET_NOTIFICATION, notificationState);
    },
    
    async getFlowchartByName({commit}, name){
        try{
            const req = await asyncApiCall('get', `${API_URL}/modules/name/${encodeURI(name)}`);
            commit(SET_FLOWCHART, req);
        }catch (e){
            console.log(e);
        }
    }
}

const mutations = {
    [SET_DIALOG](state, dialogState){
        state.dialog = dialogState;
    },
    [SET_GF](state, gfState){
        state.generalfunctions = gfState;
    },
    [SET_QUESTION](state, questionState) {
        state.questionfunctions = questionState;
    },
    [SET_MODULE](state, moduleState) {
        state.modulefunctions = moduleState;
    },
    [SET_NOTIFICATION](state, notificationState){
        state.notificationfunctions = notificationState
    },
    [SET_FLOWCHART](state, flowchart){
        state.flowchart = flowchart;
    }
}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}