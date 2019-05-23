import { asyncApiCall } from '../../../api/api'
import { API_URL } from '../../serverconstants';
import { SET_DIALOG, SET_FLOWCHART, SET_FORMATBAR, SET_CELL } from './mutation-types';

const state = {
    dialog: false,
    flowchart: null,
    formatBarType: null,
    selectedCell: {
        value: null,
        lincData: [],
        children: []
    }
}

const getters = {}

const actions = {
    setDialog({commit}, dialogState){
        commit(SET_DIALOG, dialogState);
    },

    setFormatBarType({commit}, newType){
        commit(SET_FORMATBAR, newType);
    },

    setSelectedCell({commit}, newCell) {
        commit(SET_CELL, newCell);
    },
    
    async getFlowchartByName({commit}, name){
        try{
            const req = await asyncApiCall('get', `${API_URL}/modules/name/${encodeURI(name)}`);
            commit(SET_FLOWCHART, req);
        }catch (e){
            console.log(e);
        }
    },

    async saveFlowchart({commit}, flowchart) {
        try {
            return await asyncApiCall('post', `${API_URL}/modules/`, flowchart);
        } catch(e) {
            return e;
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
    },
    [SET_CELL](state, cellState) {
        state.selectedCell = {
            value: cellState.value,
            lincData: [],
            children: null
        };
        if(cellState.children != null){
            state.selectedCell.children = cellState.children.length;
        }
        if(cellState.lincData != null){
            state.selectedCell.lincData = cellState.lincData;
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}