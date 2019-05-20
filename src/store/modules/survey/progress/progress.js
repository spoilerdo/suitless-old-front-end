import { SET_CURRENTQUESTION, SET_PROGRESS, SET_DEPTH, SET_NOTIFICATION, SET_OPTIONS, PUSH_OPTION, ADD_CURRENTQBACKLOG, DELETE_FIRST_CURRENTBACKLOG_QUESTION, ADD_CURRENTQBACKLOG_ARRAY } from '../mutation-types';

const state = {
  progress: 0,
  depth: 0,
  currentquestion: null,
  notification: null,
  options: [],
  currentquestionBacklog: [],
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
    } else {
      commit(SET_PROGRESS, 100);
    }

    commit(SET_DEPTH, depth);
  },
  setCurrentQuestion({ commit, state }, { question, nodes }) {
    //if you want to get a new question but the flow ends but the backlog is not empty yet
    if (question == null && state.currentquestionBacklog.length > 0) {
      commit(SET_CURRENTQUESTION, state.currentquestionBacklog[0]);
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
        choices.forEach(choice => {
          commit(PUSH_OPTION, nodes[choice.value]);
        });

        commit(SET_CURRENTQUESTION, question);

      }
      //else just commit the currentquestion
      else {
        //check if the backlog is not empty otherwise you need to append the new question to the backlog
        if (state.currentquestionBacklog.length === 0) {
          commit(SET_CURRENTQUESTION, question);
        } else {
          commit(ADD_CURRENTQBACKLOG, question)
          commit(SET_CURRENTQUESTION, state.currentquestionBacklog[0]);
          commit(DELETE_FIRST_CURRENTBACKLOG_QUESTION);
        }
      }
    }
  },
  fillCurrentQuestionBacklog({ commit, dispatch }, { questions, nodes }) {
    //add all the questions to the backlog
    //but the first one needs to be the currentquestion
    let question = questions.shift();
    commit(ADD_CURRENTQBACKLOG, questions);
    dispatch('setCurrentQuestion', { question, nodes });
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
    console.log(backlog);
    state.currentquestionBacklog = state.currentquestionBacklog.concat(backlog);
  },
  [DELETE_FIRST_CURRENTBACKLOG_QUESTION](state) {
    state.currentquestionBacklog.shift();
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}