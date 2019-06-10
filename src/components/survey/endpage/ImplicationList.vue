<template>
  <v-list-tile class="list-item-height">
    <v-list class="list-width">
      <template v-for="answer in answers">
        <v-flex row wrap xs12 :key="answer.questionID + answer.targetID">
          <h4>{{ answer.questionValue }}</h4>
        </v-flex>
        <v-alert
          :value="true"
          :type="answer.answerImplicationLevel"
          :key="answer.questionID + answer.targetID + 1"
        >{{ answer.answerImplication }}</v-alert>
      </template>
    </v-list>
  </v-list-tile>
</template>

<script>
export default {
  props: {
    answers: {
      type: Array,
      required: true
    }
  }
}
</script>
