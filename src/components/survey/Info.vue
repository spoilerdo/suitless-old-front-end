<template>
  <div v-if="reasons != null && reasons != ''">
    <v-flex px-5 my-2 v-for="(reason, index) in reasons" :key="index">
      <v-scale-transition>
        <v-card>
          <v-card-title primary-title class="grow mb-3">
            <v-layout align-center justify-center row>
              <h3 class="mb-0">{{ reason.type }}</h3>
            </v-layout>
          </v-card-title>
          <v-card-actions class="action-card">
            <v-layout align-center justify-center row><p v-html="reason.reason">{{ reason.reason }}</p></v-layout>
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
    }
  }
};
</script>
