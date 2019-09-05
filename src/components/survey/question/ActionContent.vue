<template>
  <v-layout justify-center row wrap>
    <!-- question card for single answer questions -->
    <ActionCard
      @action="selectAnswer"
      v-for="answer in flows"
      :key="answer.targetID + answer.value"
      :id="'question-' + answer.targetID"
      :parameter="answer"
      :text="getText(answer)"
      :imageName="getImageName(answer)"
      selection
      color="primary"
      style="margin:10px"
      ref="question"
    />
  </v-layout>
</template>

<script>
import ActionCard from "@/components/material/ActionCard.vue";

export default {
  components: {
    ActionCard
  },
  props: {
    flows: {
      type: Array,
      required: true
    }
  },
  methods: {
    getText(answer) {
      return answer.lincData.find(data => data.key === "answer").value;
    },
    getImageName(answer) {
      return answer.lincData.find(data => data.key === "imageName").value;
    },
    selectAnswer(answer) {
      this.$emit("selectAnswer", {selectAnswer: answer, question: this.$refs.question});
    },
  }
};
</script>