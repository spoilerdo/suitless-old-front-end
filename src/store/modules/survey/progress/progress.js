import { SET_CURRENTQUESTION, SET_PROGRESS, SET_DEPTH } from '../mutation-types';

const state = {
  progress: 0,
  depth: 0,
  currentquestion: null,
  test: []
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
  setCurrentQuestion({ commit }, question) {
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}