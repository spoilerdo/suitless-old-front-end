import { apiCall } from '../../../api/api'
import { API_URL } from '../../serverconstants';
import { SET_DIALOG, SET_FLOWCHART } from './mutation-types';

const state = {
    dialog: false,
    flowchart: null,
}

const getters = {}

const actions = {
    setDialog({commit}, dialogState){
        commit(SET_DIALOG, dialogState);
    },
    getFlowchartByName({commit}, name){
        apiCall('get', `${API_URL}/modules/name/${encodeURI(name)}`)
            .then((req => {
                commit(SET_FLOWCHART, req);
            })).catch(e => {
                console.log(e);
            })
    }
}

const mutations = {
    [SET_DIALOG](state, dialogState){
        state.dialog = dialogState;
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