<template>
  <v-container fluid pa-0 ma-o>
    <v-layout align-center justify-center row pa-5>
      <v-flex d-flex xs10>
        <v-progress-linear class="progress-bar" color="primary" height="10" :value="progress"></v-progress-linear>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center row pa-5>
      <v-flex d-flex xs8>
        <Question v-bind:question="question"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style scoped>
.progress-bar{
  border-radius:35px;
}
</style>

<script>
import Question from '@/components/survey/Question.vue';

export default {
  components: {
    Question
  },
  data() {
    return {
      progress: 0,
      question: "Dit is een mooie vraag?"
    };
  },
  methods: {
    testProgress() {
      this.progress += 10;
      this.question = "Dit is een mooie vraag " + this.progress + " ?";
    }
  }
};
</script>
