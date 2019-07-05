<template>
  <v-container fixed align-content-center>
    <v-toolbar dense fixed :inverted-scroll="true" scroll-threshold="80" class="small-toolbar">
        <v-flex d-flex xs12>
          <v-progress-linear class="progress-bar" color="primary" height="10" :value="progress"></v-progress-linear>
        </v-flex>
    </v-toolbar>
    <v-flex d-flex xs12>
      <v-progress-linear class="progress-bar" color="primary" height="10" :value="progress"></v-progress-linear>
    </v-flex>
  </v-container>
</template>

<style scoped>
.progress-bar {
  border-radius: 35px;
}
.small-toolbar {
  min-height: 10px;
  height: 60px;
}
</style>

<script>
import { mapState, mapActions } from "vuex";

/**
 * Returns an 'progress' view used in the survey.
 * @memberof component.Survey
 */
export default {
  computed: {
    ...mapState("survey", {
      survey: state => state.all
    }),
    ...mapState("progress", {
      progress: state => state.progress
    })
  }
};
</script>