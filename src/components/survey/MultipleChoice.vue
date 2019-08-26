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
          <v-btn
            flat
            v-on="on"
          >
            <v-icon color="secondary" left>mdi-help</v-icon>
          </v-btn>
        </template>

        <v-layout>
          <Info :reasons="getReasonsArray(this.question)"/>
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
        <v-container fluid grid-list-sm>
          <v-layout row wrap justify-center>
            <v-flex xs6 v-for="option in options" :key="option.id">
            <ActionCard
              @action="selectChoice"
              :id="'question-'+ option.id"
              :parameter="option"
              :text="getText(option)"
              :imageName="getImageName(option)"
              selection
              color="primary"
              style="margin:10px"
              ref="question"
            />
            </v-flex>
          </v-layout>
        </v-container>
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
import ActionCard from "@/components/material/ActionCard.vue";
import Info from "@/components/survey/Info.vue";
import { getReasonsArray } from "@/services/flowchartHelper";
import ArrowControls from "@/components/survey/ArrowControls.vue";

/**
 * Returns an 'multiplechoice' view used in the survey.
 * @memberof component.Survey
 */
export default {
  components: {
    Info,
    ArrowControls,
    ActionCard
  },
  props: ["question", "progress", "isMobile", "options"],
  data() {
    return {
      answers: [],
      getReasonsArray: getReasonsArray
    };
  },
  methods: {
    getText(option) {
      return option.lincData.find(data => data.key === "choice").value;
    },
    getImageName(option) {
      //TODO: add this when the choice imageName is imported in the flowchart editor
      //return option.lincData.find(data => data.key === "imageName").value;
      return "DefaultEdgeImage";
    },
    selectChoice(answer) {
      //loop through all answers and deselect any that do not match
      this.$refs.question.forEach(child => {
        //only to get components which contain the needed method
        if (child.parameter == answer) {
          child.toggle();
        }
      });

      //check if answer is already in array, if so delete it
      if (this.answers.includes(answer)) {
        this.answers.splice(this.answers.indexOf(answer), 1);
      } else {
        //else add it to the array as a chosen answer.
        this.answers.push(answer);
      }
    },
    answerQuestion() {
      if (this.answers.length > 0) {
        //emit answers to parent if answers are filled.
        this.$emit("answerMultiChoice", {
          answers: this.answers,
          q: this.question
        });
      }
    }
  },
  watch: {
    question: function(newValue, oldValue) {
      this.answers = [];
    }
  }
};
</script>
