import { SET_CURRENTQUESTION, SET_PROGRESS, SET_DEPTH, SET_NOTIFICATION, SET_OPTIONS, PUSH_OPTION, ADD_CURRENTQBACKLOG, DELETE_FIRST_CURRENTBACKLOG_QUESTION, ADD_CURRENTQBACKLOG_ARRAY,CLEAR_CURRENTBACKLOG, ADD_CURRENTSUBQUESTIONBACKLOG, CLEAR_CURRENTSUBQUESTIONBACKLOG, DELETE_FIRST_SUBQUESTION_BACKLOG } from '../mutation-types';

/**
 * The Progress module contains the progress of the survey 
 * and the backlog of questions that need to be asked to the user.
 * It also has some extra states that are node specific (e.g. notification and options)
 * This submodule is used in the following view:
 * - Survey (mapState currentquestion, progress, notification, options
 *      	   and mapActions fillProgress, setCurrenQuestion, fillCurrentQuestionBacklog, clearSubQuestionBacklog)
 * @name progress
 * @memberof store
 */

const state = {
  progress: 0,
  depth: 0,
  //currentquestion asked by the user (this will be obtained by the question flow or the backlog)
  currentquestion: null,
  //if a notification is the next current "question" than stored it in here and it will be shown
  notification: null,
  //it current question is multple choice than the options are stored in here
  options: [],
  //backlog of all the question that aren't subquestion
  currentquestionBacklog: [],
  //backlog of all the subquestions (these get priority) and are obtained by a subpath of an option
  subQuestionBackLog: []
}

const getters = {
}

const actions = {
  /**
   * Calculates the new progress and sets the progress bar
   * @memberof store.progress
   */
  fillProgress({ commit, state }, { addedDepth, survey }) {
    let depth = state.depth;
    const currentquestion = state.currentquestion;

    let d = depth + addedDepth;
    if (d >= 0) {
      depth = d;
    }

    //TODO: this check doesn't work
    if (currentquestion.flows.length > 0) {
      //bump up the progress
      commit(SET_PROGRESS, (depth / survey.maxDepth) * 100);
    } else if(state.currentquestionBacklog.length == 0 && state.subQuestionBackLog.length == 0) {
      commit(SET_PROGRESS, 100);
    }

    commit(SET_DEPTH, depth);
  },
  /**
   * Sets the current question that the user can answere
   * @memberof store.progress
   */
  setCurrentQuestion({ commit, state }, { question, nodes }) {
    //if you do not have a next question, first check if there's more subquestions to be handled
    if(question == null && state.subQuestionBackLog.length > 0 || question != null && question.style == 2 && state.subQuestionBackLog.length > 0) {
      let comingQuestion = state.subQuestionBackLog[0];
      
      commit(SET_CURRENTQUESTION, comingQuestion);
      commit(DELETE_FIRST_SUBQUESTION_BACKLOG);
    }
    //if you do not have a next question and there's no more sub questions switch to the normal question flow if it exists.
    else if (question == null && state.currentquestionBacklog.length > 0 || question != null && question.style == 2 && state.currentquestionBacklog.length > 0) {
      let comingQuestion = state.currentquestionBacklog[0];
      //set the options for the coming question if it is multiple choice
      if(comingQuestion.style == 7) {
        commit(SET_OPTIONS, []);
        let choices = comingQuestion.lincData.filter(c => c.key !== "question");
        choices.splice(choices.findIndex(item => item.key === "loopsubQuestions"), 1)
        choices.forEach(choice => {
          commit(PUSH_OPTION, nodes[choice.value]);
        });
      }
      commit(SET_CURRENTQUESTION, comingQuestion);
      commit(DELETE_FIRST_CURRENTBACKLOG_QUESTION);
      
    } else if(question == null){
      return;
    } else {
      //if the next question is a notification then store it in the notification array and show it on the front-end
      if (question.style == 5) {
        commit(SET_NOTIFICATION, question);
        commit(SET_CURRENTQUESTION, nodes[question.flows[0].targetID]);
      }
      //if the next question is a multiple choice node then get the different options
      else if (question.style == 7) {
        commit(SET_OPTIONS, []);
        let choices = question.lincData.filter(c => c.key !== "question");
        choices.splice(choices.findIndex(item => item.key === "loopsubQuestions"), 1)
        choices.forEach(choice => {
          commit(PUSH_OPTION, nodes[choice.value]);
        });
        commit(SET_CURRENTQUESTION, question);
      }
      //else just commit the currentquestion
      else {
        commit(SET_CURRENTQUESTION, question);
      }
    }
  },
  /**
   * Fills the current question backlog
   * @memberof store.progress
   */
  fillCurrentQuestionBacklog({ commit, dispatch }, { firstSubQuestion, backLogQuestion, nodes }) {
    //add the first question (if any) to come after the subquestions are done to the backlog
    if(backLogQuestion !== null) {
      commit(ADD_CURRENTQBACKLOG, backLogQuestion);
    }
  
    //set the first sub question as current question
    dispatch('setCurrentQuestion', {question: firstSubQuestion, nodes });
    
  },
  /**
   * Clears the current question backlog
   * @memberof store.progress
   */
  clearCurrentQuestionBacklog({commit, dispatch}) {
    commit(CLEAR_CURRENTBACKLOG);
  },
  /**
   * Fills the sub-question backlog
   * @memberof store.progress
   */
  fillsubQuestionBackLog({commit, dispatch}, futureSubQuestions) {
    //add subquestions to come in the future 
    commit(ADD_CURRENTSUBQUESTIONBACKLOG, futureSubQuestions);
  },
  /**
   * Clears the current sub-question backlog
   * @memberof store.progress
   */
  clearSubQuestionBackLog({commit, dispatch}) {
    commit(CLEAR_CURRENTSUBQUESTIONBACKLOG);
  }
}

const mutations = {
  [SET_CURRENTQUESTION](state, question) {
    state.currentquestion = question;
  },
  [SET_PROGRESS](state, progress) {
    state.progress = progress;
  },
  [SET_DEPTH](state, depth) {
    state.depth = depth;
  },
  [SET_NOTIFICATION](state, notification) {
    state.notification = notification;
  },
  [SET_OPTIONS](state, options) {
    state.options = options;
  },
  [PUSH_OPTION](state, option) {
    state.options.push(option);
  },
  [ADD_CURRENTQBACKLOG](state, backlog) {
    state.currentquestionBacklog = state.currentquestionBacklog.concat(backlog);
  },
  [DELETE_FIRST_CURRENTBACKLOG_QUESTION](state) {
    state.currentquestionBacklog.shift();
  },
  [CLEAR_CURRENTBACKLOG](state) {
    state.currentquestionBacklog = [];
  },
  [ADD_CURRENTSUBQUESTIONBACKLOG](state, backlog) {
    state.subQuestionBackLog = state.subQuestionBackLog.concat(backlog);
  },
  [CLEAR_CURRENTSUBQUESTIONBACKLOG](state) {
    state.subQuestionBackLog = [];
  },
  [DELETE_FIRST_SUBQUESTION_BACKLOG](state) {
    state.subQuestionBackLog.shift();
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}