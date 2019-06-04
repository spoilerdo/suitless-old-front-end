import { SET_CURRENTQUESTION, SET_PROGRESS, SET_DEPTH, SET_NOTIFICATION, SET_OPTIONS, PUSH_OPTION, ADD_CURRENTQBACKLOG, DELETE_FIRST_CURRENTBACKLOG_QUESTION, ADD_CURRENTQBACKLOG_ARRAY,CLEAR_CURRENTBACKLOG, ADD_CURRENTSUBQUESTIONBACKLOG, CLEAR_CURRENTSUBQUESTIONBACKLOG, DELETE_FIRST_SUBQUESTION_BACKLOG } from '../mutation-types';

const state = {
  progress: 0,
  depth: 0,
  currentquestion: null,
  notification: null,
  options: [],
  currentquestionBacklog: [],
  subQuestionBackLog: []
}

const getters = {
}

const actions = {
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
        choices.forEach(choice => {
          commit(PUSH_OPTION, nodes[choice.value]);
        });
      }
      commit(SET_CURRENTQUESTION, comingQuestion);
      commit(DELETE_FIRST_CURRENTBACKLOG_QUESTION);
      
    } else if(question == null){
      console.log(" null part");
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
  fillCurrentQuestionBacklog({ commit, dispatch }, { firstSubQuestion, backLogQuestion, nodes }) {
    //add the first question (if any) to come after the subquestions are done to the backlog
    if(backLogQuestion !== null) {
      commit(ADD_CURRENTQBACKLOG, backLogQuestion);
    }
  
    //set the first sub question as current question
    dispatch('setCurrentQuestion', {question: firstSubQuestion, nodes });
    
  },
  clearCurrentQuestionBacklog({commit, dispatch}) {
    commit(CLEAR_CURRENTBACKLOG);
  },
  fillsubQuestionBackLog({commit, dispatch}, futureSubQuestions) {
    //add subquestions to come in the future 
    commit(ADD_CURRENTSUBQUESTIONBACKLOG, futureSubQuestions);
  },
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