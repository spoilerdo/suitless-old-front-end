import _ from 'lodash';
import { SET_SURVEY, SET_SURVEYS, DELETE_SURVEY_STATE } from './mutation-types';
import { apiCall } from '@/services/api';
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
    all: [],
    survey: {}
}

const getters = {
    /**
     * Gets the first upcoming questionID out of the current state.
     * @memberof store.survey
     */
    getFirstQuestionID: (state) => {
        //get the second node and return its ID
        let id = 0;
        while (typeof state.survey.nodes[id] == 'undefined' || state.survey.nodes[id].value == 'Start' || state.survey.nodes[id].style == '8') {
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
            const modules = await apiCall('get', `${API_URL}/modules`);
            if(modules) commit(SET_SURVEYS, modules);
        } catch (e) {
            dispatch(NOTIFICATION_HANDLER, { message: e, type: "error" }, { root:true });
        }
    },
    /**
     * Retrieves a survey by ID from the server.
     * @memberof store.survey
     */
    getSurveyByID({ commit, dispatch }, surveyID) {
        if(process.env.NODE_ENV == "test" || process.env.NODE_ENV == "testdevelopment"){
            dispatch("getTestSurveyByID", surveyID);
            return;
        }

        apiCall('get', `${API_URL}/modules/${surveyID}`, null)
        .then(req => {
            commit(SET_SURVEY, req.module);
        }).catch(e => {
            dispatch(NOTIFICATION_HANDLER, { message: e, type: "error" }, { root:true });
        });
    },
    /**
     * Retrieves a test survey by ID used in e2e tests
     * @memberof store.survey
     */
    getTestSurveyByID({ commit }, surveyID) {
        apiCall('get', `${API_URL}/modules/test/${surveyID}`, null)
        .then(req => {
            commit(SET_SURVEY, req.module);
        }).catch(e => {
            console.log(e)
        });
    },
    /**
     * Deletes the chose survey to make
     * @memberof store.survey
     */
    deleteChosenSurvey({ commit }) {
        commit(DELETE_SURVEY_STATE);
    },
    /**
     * Set a new survey to make
     * @memberof store.survey
     */
    setSurvey({ commit }, survey) {
        commit(SET_SURVEY, survey);
    }
}

const mutations = {
    [SET_SURVEY](state, survey) {
        state.survey = survey;
        //makes an object array with the node ID as key
        state.survey.nodes = _.mapKeys(survey.nodes, 'id');
    },
    [SET_SURVEYS](state, surveys) {
        state.all = surveys._embedded.moduleList;
    },
    [DELETE_SURVEY_STATE](state) {
        state.survey = {};
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}