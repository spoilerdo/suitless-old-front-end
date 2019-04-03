<template>
  <v-flex d-flex xs10>
    <v-progress-linear class="progress-bar" color="primary" height="10" :value="progress"></v-progress-linear>
  </v-flex>
</template>

<style scoped>
.progress-bar {
  border-radius: 35px;
}
</style>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState('survey', {
      survey: state => state.all
    }),
    ...mapState('progress', {
      progress: state => state.progress
    }),
  }
};
</script>