<template>
  <v-container fluid pa-0 ma-o>
    <v-layout align-center justify-center row pa-5>
      <ProgressBar ref="progressBar"/>
    </v-layout>
    <v-layout align-center justify-center row pa-5>
      <v-flex d-flex xs8>
        <Question
          v-if="survey.nodes != null && currentquestion != null"
          v-on:answerQuestion="answeredQuestion"
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
    this.setBackground("#eee");
  },
  methods: {
    ...mapActions("answer/", ["deleteLastAnswer", "answerQuestion"]),
    ...mapActions("progress/", ["fillProgress", "setCurrentQuestion"]),
    ...mapActions("app/", ["setBackground"]),

    answeredQuestion(answer) {
      this.answerQuestion({
        answer,
        question: this.survey.nodes[this.currentquestion]
      });
      this.setCurrentQuestion(answer.targetID);
      this.fillProgress({ addedDepth: 1, survey: this.survey });
      console.log(this.progress);
    },

    renderPreviousQuestion(question) {
      //select the previouse question
      this.setCurrentQuestion(this.getAnswerByQuestionID(question).questionID);
      this.deleteLastAnswer();

      this.fillProgress({ addedDepth: -1, survey: this.survey });
    }
  },
  updated() {
    //only on the first ever update since this page
    if (this.currentquestion == null) {
      this.setCurrentQuestion(this.firsQuestionID);
    }
  },
  watch: {
    progress: function (newValue, oldValue) {
      //watch for completion of survey, then print pdf
      if(newValue === 100) {
        this.generateDemoPDF();
      }
    }
  }

};
</script>