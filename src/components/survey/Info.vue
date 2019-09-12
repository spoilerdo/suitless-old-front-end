<template>
  <div v-if="reasons != null && reasons != ''">
    <v-flex px-5 my-2 v-for="(reason, index) in reasons" :key="index">
      <v-scale-transition>
        <v-card>
          <v-tooltip left>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                v-if="index === 0"
                flat
                icon
                small
                right
                absolute
                round
                v-on="{ ...tooltip }"
                @click="askQuestion()"
              >
                <v-icon color="secondary">mdi-help</v-icon>
              </v-btn>
            </template>
            <span>I do not understand this question</span>
          </v-tooltip>
          <v-card-title primary-title class="grow mb-3">
            <v-layout align-center justify-center row>
              <h3 class="mb-0">{{ reason.type }}</h3>
            </v-layout>
          </v-card-title>
          <v-card-actions class="action-card">
            <v-layout align-center justify-center row>
              <p v-html="reason.reason">{{ reason.reason }}</p>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-scale-transition>
    </v-flex>
  </div>
</template>

<script>
import { getReasonsArray } from "@/services/flowchartHelper";

/**
 * Returns an 'info' view used in the survey.
 * @memberof component.Survey
 */
export default {
  props: {
    reasons: {
      type: Array,
      required: true
    },
    question: {
      type: String,
      default: ""
    },
    flowchartName: {
      type: String,
      default: ""
    }
  },
  methods: {
    askQuestion() {
      let question = this.questionObject.lincData.find(data => data.key === "question").value;
      window.location.href = `mailto:support@suitless.nl?subject=question about the ${this.flowchartName} 
      flowchart&body=I got a question about the following question: "${question}"`;
    }
  }
};
</script>
