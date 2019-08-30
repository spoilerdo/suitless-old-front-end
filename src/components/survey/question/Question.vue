<template>
  <v-scale-transition>
    <v-card>
      <v-menu
        transition="slide-x-transition"
        bottom
        nudge-bottom="35"
        full-width
        v-if="isMobile"
        max-width="100vw"
      >
        <template v-slot:activator="{ on }">
          <v-btn flat v-on="on">
            <v-icon color="secondary" left>mdi-help</v-icon>
          </v-btn>
        </template>

        <v-layout>
          <Info :reasons="getReasonsArray(this.question)" />
        </v-layout>
      </v-menu>

      <v-card-title primary-title class="grow mb-3">
        <v-layout align-center justify-center row>
          <h3
            class="headline mb-0"
          >{{question.lincData.find(data => data.key === "question").value}}</h3>
        </v-layout>
      </v-card-title>

      <v-card-actions class="action-card">
        <DragableActionContent
          v-if="checkEnv() === 'TEST' "
          :flows="this.flows"
          @selectAnswer="selectAnswer"
        />
        <ActionContent v-else :flows="this.flows" @selectAnswer="selectAnswer"/>
      </v-card-actions>

      <ArrowControls
        v-on:nextButtonClick="answerQuestion"
        v-on:previousButtonClick="$emit('renderPreviousQuestion', question)"
        :progress="progress"
      />
    </v-card>
  </v-scale-transition>
</template>

<style scoped>
.action-card {
  min-height: 62px;
}
</style>

<script>
import ActionContent from "./ActionContent";
import DragableActionContent from "./DragableActionContent";
import Info from "@/components/survey/Info.vue";

import { getReasonsArray } from "@/services/flowchartHelper";
import ArrowControls from "@/components/survey/ArrowControls.vue";

/**
 * Returns an 'question' view used in the survey.
 * @memberof component.Survey
 */
export default {
  components: {
    ActionContent,
    DragableActionContent,
    Info,
    ArrowControls
  },
  props: {
    /**
     * The current question (default node values + question node lincData)
     */
    question: {
      type: Object,
      required: true
    },
    progress: Number,
    isMobile: Boolean
  },
  data() {
    return {
      selectedAnswer: null,
      getReasonsArray: getReasonsArray,
      flows: this.question.flows
    };
  },
  methods: {
    selectAnswer({ selectAnswer, question }) {
      //loop through all answers and deselect any that do not match
      question.forEach(child => {
        //only to get components which contain the needed method
        if (child.parameter == selectAnswer) {
          child.setSelected(true);
        } else {
          child.setSelected(false);
        }
      });
      //change selected answer, will change with multiple choice.
      this.selectedAnswer = selectAnswer;
    },
    answerQuestion() {
      if (this.selectedAnswer !== null) {
        this.$emit("answerQuestion", this.selectedAnswer);
        this.selectedAnswer = null;
      }
    }
  }
}
</script>