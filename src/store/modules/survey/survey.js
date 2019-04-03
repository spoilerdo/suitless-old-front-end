//Get mock data (NOT PERMINENT!!!)
import survey from '../../../api/survey';
import _ from 'lodash';
import { SET_SURVEY } from './mutation-types';

// initial state
const state = {
    all: []
}

const getters = {
    getFirstQuestionID: (state) => {
        //get the second node and return its ID
        let id = 0;
        while(typeof state.all.nodes[id] == 'undefined' || state.all.nodes[id].value == 'Start'){
            id ++;
        }
        return id; //found first ID
    },
    
}

const actions = {
    getAllSurveys({ commit }){
        //get all surveys from the back-end
        //TODO: do you need want to obtain all the nodes from all surveys??
    },
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
                    "flows": q.flows,
                    "lincData": q.lincData
                })
            });

            //change the unfiltered questions by the filtered questions
            json.nodes = n;

            commit(SET_SURVEY, json)
        })
    }
}

const mutations = {
    [SET_SURVEY] (state, survey){
        state.all = survey;

        //makes an object array with the node ID as key
        state.all.nodes = _.mapKeys(survey.nodes, 'ID');
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}