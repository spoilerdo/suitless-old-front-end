import _ from 'lodash';
import { SET_SURVEY, SET_SURVEYS } from './mutation-types';
import { apiCall, asyncApiCall } from '../../../api/api';
import { API_URL, NOTIFICATION_HANDLER } from '../../generalconstants';

/**
 * The survey module contains the survey that the user wants to make 
 * and also the first question that needs to be asked because a flowchart can start with a start node 
 * or something else instead of a question (or multichoice, etc.) node
 * This submodule is used in the following views/ components:
 * - Survey (mapState all and mapGetters getFirstQuestionID and mapActions getSurveyByID)
 * - AllSurveys/ IncompleteSurveys/ LatestReports (mapState all, mapActions getAllSurveys)
 * @memberof store
 * @name survey
 */
const state = {
    all: []
}

const getters = {
    /**
     * Gets the first upcoming questionID out of the current state.
     * @memberof store.survey
     */
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
    /**
     * Retrieves all available surveys from the server.
     * @memberof store.survey
     */
    async getAllSurveys({ commit, dispatch }) {
        try {
            const modules = await asyncApiCall('get', `${API_URL}/modules`);
            if(modules) commit(SET_SURVEYS, modules);
        } catch (e) {
            console.log(e);
            dispatch(NOTIFICATION_HANDLER, { message: e, type: "error" }, { root:true });
        }
    },
    /**
     * Retrieves a survey by ID from the server.
     * @memberof store.survey
     */
    getSurveyByID({ commit, dispatch }, surveyID) {
        apiCall('get', `${API_URL}/modules/${surveyID}`, null)
        .then(req => {
            commit(SET_SURVEY, req.module);
        }).catch(e => {
            console.log(e);
            dispatch(NOTIFICATION_HANDLER, { message: e, type: "error" }, { root:true });
        });
    },

}

const mutations = {
    [SET_SURVEY](state, survey) {
        state.all = survey;
        //makes an object array with the node ID as key
        state.all.nodes = _.mapKeys(survey.nodes, 'id');
    },
    [SET_SURVEYS](state, surveys) {
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