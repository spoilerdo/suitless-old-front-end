<template>
  <v-scale-transition>
    <v-card>
      <v-menu
        transition="slide-x-transition"
        bottom
        right
        offset-x
        nudge-right="10"
        nudge-bottom="18"
        v-if="isMobile"
      >
        <template v-slot:activator="{ on }">
          <v-btn class="action-btn" flat icon left absolute round v-on="on">
            <v-icon color="secondary">mdi-help</v-icon>
          </v-btn>
        </template>

        <v-layout style="width: 100%;">
          <Info :question="this.question"/>
        </v-layout>
      </v-menu>

      <v-card-title primary-title class="grow mb-3">
        <v-layout align-center justify-center row>
          <h3 class="headline mb-0">{{question.lincData.find(data => data.key === "question").value}}</h3>
        </v-layout>
      </v-card-title>
      <v-card-actions class="action-card">
        <div class="layout row wrap" style="justify-content: center">
          <!-- question card for single answer questions -->
          <QuestionCard
            v-on:selectedAnswer="selectAnswer"
            v-for="answer in question.flows"
            :key="answer.targetID"
            :id="'question-' + answer.targetID"
            :text="answer.value"
            :answer="answer"
            image="http://ironsm4sh.nl:3303/cdn/man"
            color="primary" 
            style="margin:10px"
            ref="question"
          />
        </div>
      </v-card-actions>


      <!-- previous arrow -->
      <v-layout align-center justify-center row>
        <v-btn
          v-if="progress > 0"
          v-on:click="$emit('renderPreviousQuestion', question)"
          flat
          class="action-btn"
        >
          <v-icon color="secondary" x-large left>mdi-chevron-left</v-icon>
        </v-btn>

        <!-- next arrow -->
        <v-btn
          large
          flat
          round
          icon
          bottom
          class="action-btn"
          @click="answerQuestion()"
          id="next-btn"
        >
           <v-icon color="secondary" x-large right>mdi-chevron-right</v-icon>
        </v-btn>
      </v-layout>
    </v-card>
  </v-scale-transition>
</template>

<style scoped>
.answerBtn {
  margin-bottom: 15px;
}

.action-btn {
  opacity: 0.6;
}
.action-btn:hover {
  opacity: 1;
}
.action-card {
  min-height: 62px;
}
</style>


<script>
import QuestionCard from "@/components/material/QuestionCard.vue";
import Info from "@/components/survey/Info.vue";

export default {
  components: {
    QuestionCard,
    Info
  },
  props: {
      question: {
          type: Object,
          required: true
      },
      progress: Number,
      isMobile: Boolean
  },
  data() {
    return{
      selectedAnswer: null
    }
  },
  methods: {
    selectAnswer(selectAnswer) {
      //loop through all answers and deselect any that do not match
      this.$refs.question.forEach(child => {
        //only to get components which contain the needed method
        if(child.answer == selectAnswer) {
          child.setSelected(true);
        } else {
          child.setSelected(false);
        }
      })
      //change selected answer, will change with multiple choice.
      this.selectedAnswer = selectAnswer;
    },
    answerQuestion() {
      if(this.selectedAnswer !== null) {
        this.$emit('answerQuestion', this.selectedAnswer);
      }
    }
  }
};
</script>