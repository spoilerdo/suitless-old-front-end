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
        <ActionContent v-else :flows="this.flows" @selectAnswer="selectAnswer" />
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
.dnd-container {
  width: 100%;
}
.card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg);
}

.card-ghost-drop {
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg);
}
.drop-preview {
  background-color: rgba(150, 150, 200, 0.1);
  border: 1px dashed #abc;
  margin: 5px;
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
      flows: this.question.flows,
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: true
      }
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
    },
    checkEnv() {
      if (localStorage.getItem("ENV") !== null) {
        if (localStorage.getItem("ENV") === "TEST") {
          //its a test env so change the action content to a dragable action content
          return "TEST";
        }
      }
    }
  }
};
</script>