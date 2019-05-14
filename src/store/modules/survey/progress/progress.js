import { SET_CURRENTQUESTION, SET_PROGRESS, SET_DEPTH, SET_NOTIFICATION, SET_OPTIONS, PUSH_OPTION } from '../mutation-types';

const state = {
  progress: 0,
  depth: 0,
  currentquestion: null,
  test: [],
  notification: null,
  options: []
}

const getters = {}

const actions = {
  fillProgress({ commit, state }, { addedDepth, survey }) {
    let depth = state.depth;
    const currentquestion = state.currentquestion;

    let d = depth + addedDepth;
    if (d >= 0) {
      depth = d;
    }

    if (survey.nodes[currentquestion].flows.length > 0) {
      //bump up the progress
      commit(SET_PROGRESS, (depth / survey.maxDepth) * 100);
    } else {
      commit(SET_PROGRESS, 100);
    }

    commit(SET_DEPTH, depth);
  },
  setCurrentQuestion({ commit }, { question, nodes }) {
    //if the next question is a notification then store it in the notification array and show it on the front-end
    if(question.style == 5){
      commit(SET_NOTIFICATION, question);
      commit(SET_CURRENTQUESTION, question.flows[0].targetID);
    }

    //if the next question is a multiple choice node then get the different options
    else if(question.style == 7){
      commit(SET_OPTIONS, []);
      let choices = question.lincData.filter(c => c.key !== "question");
      choices.forEach(choice => {
        commit(PUSH_OPTION, nodes[choice.value]);
      });
    }

    commit(SET_CURRENTQUESTION, question);
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
  [SET_OPTIONS](state, options){
    state.options = options;
  },
  [PUSH_OPTION](state, option){
    state.options.push(option);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}