//Get mock data (NOT PERMINENT!!!)
import survey from '../../../api/survey';
import _ from 'lodash';
import { SET_SURVEY, ADD_ANSWER, DELETE_ANSWER } from './mutation-types';

// initial state
const state = {
    survey: [],
    answers: []
}

// getters
const getters = {
    getFirstQuestionID: (state) => {
        //get the second node and return its ID
        let id = 0;
        while(typeof state.survey.nodes[id] == 'undefined' || state.survey.nodes[id].value == 'Start'){
            id ++;
        }
        return id; //found first ID
    },
    getQuestionByID: (state) => (ID) => {
        return state.survey.nodes.find(node => node.ID === ID);
    }
}

// actions
const actions = {
    //gets the survey from the mock data (survey) 
    //TODO: BUT it needs to make an axios call instead
    getSurvey ({ commit }) {
        survey.getSurvey(json => {
            //filter the survey beceause some data is not needed
            let n = [];
            json.nodes.forEach(q => {
                n.push({
                    "ID": q.ID,
                    "value": q.value,
                    "flows": q.flows
                })
            });

            //change the unfiltered questions by the filtered questions
            json.nodes = n;

            commit(SET_SURVEY, json)
        })
    }
}

//mutations
const mutations = {
    [SET_SURVEY] (state, survey){
        state.survey = survey;

        //makes an object array with the node ID as key
        state.survey.nodes = _.mapKeys(survey.nodes, 'ID');
    },
    [ADD_ANSWER] (state, answer){
        state.answers.push(answer)
    },
    [DELETE_ANSWER] (state, answer){
        const a = state.answers.find(a => a.id === answer.id)
        //TODO 2 options:
        //1: always delete the given answer from the array
        //2: always delete the last answer of the array
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}