<template>
  <v-container fluid pa-0 ma-o>
    <v-layout align-center justify-center row pa-5>
      <ProgressBar ref="progressBar"/>
    </v-layout>
    <v-layout align-center justify-center row pa-5>
      <v-flex d-flex xs8>
        <Question
          v-if="survey.nodes != null && currentquestion != null"
          v-on:answerQuestion="answerQuestion"
          v-on:renderPreviousQuestion="renderPreviousQuestion"
          v-bind:question="survey.nodes[currentquestion]"
          v-bind:progress="progress"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Question from "@/components/survey/Question.vue";
import ProgressBar from "@/components/survey/Progress.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    Question,
    ProgressBar
  },
  computed: {
    ...mapState("survey", {
      survey: state => state.all
    }),
    ...mapState("progress", {
      currentquestion: state => state.currentquestion,
      progress: state => state.progress
    }),
    ...mapGetters({
      firsQuestionID: "survey/getFirstQuestionID",
      getAnswerByQuestionID: "answer/getAnswerByQuestionID"
    })
  },
  created() {
    //when created call the action to get all products from api and put it in the store
    this.$store.dispatch("survey/getSurvey");
  },
  methods: {
    ...mapActions({
      addAnswer: "answer/answerQuestion",
      fillProgress: "progress/fillProgress"
    }),
    ...mapMutations({
      deleteLastAnswer: "answer/DELETE_LAST_ANSWER",
      setCurrentQuestion: "progress/SET_CURRENTQUESTION"
    }),
    answerQuestion(answer) {
      //add answer to the answer store
      this.addAnswer({
        answer,
        question: this.survey.nodes[this.currentquestion]
      });

      //go to the next question
      this.setCurrentQuestion(answer.targetID);

      //update the progressbar
      this.fillProgress({ addedDepth: 1, survey: this.survey });
    },

    renderPreviousQuestion(question) {
      //select the previouse question
      this.setCurrentQuestion(this.getAnswerByQuestionID(question).questionID);
      this.deleteLastAnswer();
      
      //update the progressbar
      this.fillProgress({ addedDepth: -1, survey: this.survey });
    }
  },
  updated() {
    //only on the first ever update since this page
    if (this.currentquestion == null) {
      this.setCurrentQuestion(this.firsQuestionID);
    }
  }
};
</script>