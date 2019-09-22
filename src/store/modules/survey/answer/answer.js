import _ from 'lodash';
import { createImplicationArray } from "@/services/flowchartHelper";
import { ADD_ANSWER, DELETE_LAST_ANSWER, CLEAR_ANSWER } from '../mutation-types';
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
        if (Array.isArray(answer)) {
            //multi choice question answered
            //create temp array for storing created answer objects
            let temp = [];

            answer.forEach(ans => {
                let implications = createImplicationArray(ans, true);

                let answerClass = null;

                //if a multi choice is answered without a follow up flow, be sure to save it seperately. otherwise it will be skipped
                if (ans.flows.length === 0) {
                    answerClass = {
                        questionID: question.id,
                        questionValue: question.lincData.find(data => data.key === "question" || data.key === "notify").value,
                        lincData: question.lincData,
                        targetID: null,
                        answerValue: ans.lincData.find(data => data.key === "choice").value,
                        implications: implications
                    }
                } else {
                    ans.flows.forEach(flow => {
                        answerClass = {
                            questionID: question.id,
                            questionValue: question.lincData.find(data => data.key === "question" || data.key === "notify").value,
                            lincData: question.lincData,
                            targetID: flow.targetID,
                            answerValue: ans.lincData.find(data => data.key === "choice").value,
                            implications: implications
                        };
                    })
                }

                //Notify the user of the implication they just received from the survey.
                if (answerClass.answerImplication != null) {
                    dispatch(SURVEY_NOTIFICATION_HANDLER, { message: a.answerImplication, type: a.answerImplicationLevel }, { root: true });
                }

                if(answerClass) {
                    temp.push(answerClass);
                }
            });

            //push the array to the main answer store.
            commit(ADD_ANSWER, temp);

        } else {
            //single choice question answered
            //fill the answer in on the answers array
            let implications = createImplicationArray(answer, true);
            var a = {
                questionID: question.id,
                questionValue: question.lincData.find(data => data.key === "question" || data.key === "notify").value,
                lincData: question.lincData,
                targetID: answer.targetID,
                answerValue: answer.lincData.find(data => data.key === "answer").value,
                implications: implications
            };

            //Notify the user of the implication they just received from the survey.
            if (a.answerImplication != null) {
                dispatch(SURVEY_NOTIFICATION_HANDLER, { message: a.answerImplication, type: a.answerImplicationLevel }, { root: true });
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
    },
    /**
     * Clears all the answers made.
     * @memberof store.answer
     */
    clearAnswers({ commit }) {
        commit(CLEAR_ANSWER);
    }
}

const mutations = {
    [ADD_ANSWER](state, answer) {
        state.all.push(answer);
    },
    [DELETE_LAST_ANSWER](state) {
        state.all.pop();
    },
    [CLEAR_ANSWER](state) {
        state.all = [];
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}