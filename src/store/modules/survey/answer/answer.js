import _ from 'lodash';
import { ADD_ANSWER, DELETE_LAST_ANSWER } from '../mutation-types';
import { SURVEY_NOTIFICATION_HANDLER } from '../../../generalconstants';

/**
 * The answer module contians all the answers of the survey that has been made
 * These answers will be used for the PDF generation and can be stored in the questionaire service
 * This submodule is used in the following views:
 * - Survey (mapState all and mapActions deleteLastAnswer, answerQuestion)
 * @name answer
 * @memberof store
 */

//initial state
const state = {
    //all the answers in 1 array
    all: []
}

const getters = {
    /**
     * Retrieves all answeres from the store
     * @memberof store.answer
     */
    getAnswers: (state) => () => {
        return state.all;
    },
    /**
     * Retrieves a question from the store with a specific ID
     * @memberof store.answer
     */
    getAnswerByQuestionID: (state) => (question) => {
        var pa = _.find(state.all, (a) => a.targetID === question.id);
        if (pa == null) {
            return _.last(state.all);
        } else {
            return pa;
        }
    }
}

const actions = {
    /**
     * Pushes an answere to the store. This should also contain the user's entered data.
     * @memberof store.answer
     */
    answerQuestion({ commit, dispatch }, { answer, question }) {
        //check if the answer given is multiple choice (an array)
        if(Array.isArray(answer)) {
            //multi choice question answered
            //create temp array for storing created answer objects
            let temp = [];

            answer.forEach(ans => {
                //if a multi choice is answered without a follow up flow, be sure to save it seperately. otherwise it will be skipped
                if(ans.flows.length === 0) {
                    let a = {
                        questionID: question.id,
                        questionValue: question.lincData.find(data => data.key === "question").value,
                        lincData: question.lincData,
                        targetID: null,
                        answerValue: ans.value,
                        implications: ans.implications
                    }

                    temp.push(a);
                }

                ans.flows.forEach(flow => {
                    let a = {
                        questionID: question.id,
                        questionValue: question.lincData.find(data => data.key === "question").value,
                        lincData: question.lincData,
                        targetID: flow.targetID,
                        answerValue: ans.value,
                        implications: ans.implications
                    };

                    //Notify the user of the implication they just received from the survey.
                    if(a.answerImplication != null){
                        dispatch(SURVEY_NOTIFICATION_HANDLER, { message: a.answerImplication, type: a.answerImplicationLevel }, { root:true });
                    }
    
                    temp.push(a);
                })
            });
            
            //push the array to the main answer store.
            commit(ADD_ANSWER, temp);

        } else {
            //single choice question answered
            //fill the answer in on the answers array
            var a = {
                questionID: question.id,
                questionValue: question.lincData.find(data => data.key === "question").value,
                lincData: question.lincData,
                targetID: answer.targetID,
                answerValue: answer.value,
                implications: answer.implications
            };

            //Notify the user of the implication they just received from the survey.
            if(a.answerImplication != null){
                dispatch(SURVEY_NOTIFICATION_HANDLER, { message: a.answerImplication, type: a.answerImplicationLevel }, { root:true });
            }

            commit(ADD_ANSWER, a);
        }
    },
    /**
     * Removes the last pushed answere from the store.
     * @memberof store.answer
     */
    deleteLastAnswer({ commit }) {
        commit(DELETE_LAST_ANSWER);
    }
}

const mutations = {
    [ADD_ANSWER](state, answer) {
        state.all.push(answer);
        console.log(state.all);
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