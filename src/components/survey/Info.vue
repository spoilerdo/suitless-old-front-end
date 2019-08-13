<template>
  <div v-if="reasons != null && reasons != ''">
    <v-flex xs10 offset-xs1 my-2 v-for="(reason, index) in reasons" :key="index">
      <v-scale-transition>
        <v-card>
          <v-card-title primary-title class="grow mb-3">
            <v-layout align-center justify-center row>
              <h3 class="mb-0">Info</h3>
            </v-layout>
          </v-card-title>
          <v-card-actions class="action-card">
            <v-layout align-center justify-center row><p v-html="reason">{{ reason }}</p></v-layout>
          </v-card-actions>
        </v-card>
      </v-scale-transition>
    </v-flex>
  </div>
</template>

<script>
import anchorme from "anchorme";

/**
 * Returns an 'info' view used in the survey.
 * @memberof component.Survey
 */
export default {
  data() {
    return {
      reasons: null
    };
  },
  props: ["question"],
  mounted() {
    this.getReasons();
  },
  methods: {
    getReasons() {
      let reasons = this.question.lincData.filter(
        data => data.key === "reason"
      );

      this.reasons = reasons ? reasons.map(el => anchorme(el.value, {
          truncate: 40,
          attributes:[
              {
                  name:"target",
                  value:"_blank"
              }
          ]
        })) : null;
    }
  },
  watch: {
    question: function() {
      //update new reason on question change, otherwise old reason will be displayed
      this.getReasons();
    }
  }
};
</script>
