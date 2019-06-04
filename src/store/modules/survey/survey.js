
import _ from 'lodash';
import { SET_SURVEY, SET_SURVEYS } from './mutation-types';
import { apiCall } from '../../../api/api';
import { API_URL } from '../../serverconstants';

// initial state
const state = {
    all: []
}

const getters = {
    getFirstQuestionID: (state) => {
        //get the second node and return its ID
        let id = 0;
        while (typeof state.all.nodes[id] == 'undefined' || state.all.nodes[id].value == 'Start' || state.all.nodes[id].style == '8') {
            id++;
        }
        return id; //found first ID
    },

}

const actions = {
    async getAllSurveys({ commit }) {
        try {
            //const modules = await apiCall('get', `${API_URL}/modules`);
            commit(SET_SURVEYS, modules);
        } catch (e) {
            console.log(e);
        }
    },
    getSurveyByID({ commit }, surveyID) {
        apiCall('get', `${API_URL}/modules/${surveyID}`, null)
        .then((req => {
            commit(SET_SURVEY, req.module);
        }));
    },

}

const mutations = {
    SET_SURVEY(state, survey) {
        state.all = survey;
        //makes an object array with the node ID as key
        state.all.nodes = _.mapKeys(survey.nodes, 'id');
    },
    SET_SURVEYS(state, surveys) {
        state.all = surveys._embedded.moduleList;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}