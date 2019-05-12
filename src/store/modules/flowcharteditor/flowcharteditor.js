import { asyncApiCall } from '../../../api/api'
import { API_URL } from '../../serverconstants';
import { SET_DIALOG, SET_FLOWCHART, SET_FORMATBAR } from './mutation-types';

const state = {
    dialog: false,
    flowchart: null,
    formatBarType: null,
}

const getters = {}

const actions = {
    setDialog({commit}, dialogState){
        commit(SET_DIALOG, dialogState);
    },

    setFormatBarType({commit}, newType){
        commit(SET_FORMATBAR, newType);
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
    [SET_FORMATBAR](state, formatBarState) {
        state.formatBarType = formatBarState;
    },
    [SET_FLOWCHART](state, flowchartState) {
        state.flowchart = flowchartState;
    }
}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}