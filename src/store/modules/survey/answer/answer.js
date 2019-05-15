import _ from 'lodash';
import { ADD_ANSWER, DELETE_LAST_ANSWER } from '../mutation-types';

//initial state
const state = {
    all: []
}

const getters = {
    getAnswers: (state) => () => {
        return state.all;
    },
    getAnswerByQuestionID: (state) => (question) => {
        var pa = _.find(state.all, (a) => a.targetID === question.ID);
        if (pa == null) {
            return _.last(state.all);
        } else {
            return pa;
        }
    }
}

const actions = {
    answerQuestion({ commit }, { answer, question }) {
        //check if the answer given is multiple choice (an array)
        if(Array.isArray(answer)) {
            //multi choice question answered
            //create temp array for storing created answer objects
            let temp = [];
            answer.forEach(ans => {
                let a = {
                    questionID: question.id,
                    questionValue: question.value,
                    lincData: question.lincData,
                    targetID: ans.targetID,
                    answerValue: ans.value
                };

                temp.push(a);
            });
            
            //push the array to the main answer store.
            commit(ADD_ANSWER, temp);

        } else {
            //single choice question answered
            //fill the answer in on the answers array
            var a = {
                questionID: question.id,
                questionValue: question.value,
                lincData: question.lincData,
                targetID: answer.targetID,
                answerValue: answer.value
            };
            commit(ADD_ANSWER, a);
        }
    },
    deleteLastAnswer({ commit }) {
        commit(DELETE_LAST_ANSWER);
    }
}

const mutations = {
    [ADD_ANSWER](state, answer) {
        state.all.push(answer);
    },
    [DELETE_LAST_ANSWER](state) {
        state.all.pop();
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}