<template>
  <v-container fluid pa-0 ma-o>
    <v-layout align-center justify-center row pa-5>
      <v-flex d-flex xs10>
        <v-progress-linear class="progress-bar" color="primary" height="10" :value="progress"></v-progress-linear>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center row pa-5>
      <v-flex d-flex xs8>
        <Question
          v-if="survey.nodes != null"
          v-on:answerQuestion="answerQuestion"
          v-bind:question="survey.nodes[currenquestion].value"
          v-bind:answers="survey.nodes[currenquestion].flows"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style scoped>
.progress-bar {
  border-radius: 35px;
}
</style>

<script>
import Question from "@/components/survey/Question.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    Question
  },
  created() {
    //when created call the action to get all products from api and put it in the store
    this.$store.dispatch("survey/getSurvey");

    this.currenquestion = this.firsQuestionID;
  },
  computed: {
    ...mapState({
      survey: state => state.survey.survey
    }),
    ...mapGetters('survey', {
      firsQuestionID: 'getFirstQuestionID'
    })
  },
  data() {
    return {
      depth: 0,
      progress: 0,
      currenquestion: 0
    };
  },
  methods: {
    answerQuestion(answer) {
      //fill the answer in on the answers array

      //go to the next question
      this.currenquestion = answer.targetID;

      //TODO: when the user is at the end of a path the progress bar always needs to be 100%
      //bump up the progress
      this.depth += 1;
      this.progress = (this.depth / this.survey.maxDepth) * 100;
    }
  }
};
</script>
