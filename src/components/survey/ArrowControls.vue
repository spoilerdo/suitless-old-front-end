<template>
  <!-- previous arrow -->
  <v-layout align-center justify-center row>
    <v-btn
      v-if="progress > 0"
      @click="previouseButtonClick()"
      flat
      class="action-btn"
      id="previouse-btn"
    >
      <v-icon color="secondary" size="50" left>mdi-chevron-left</v-icon>
    </v-btn>

    <!-- next arrow -->
    <v-btn
      v-if="progress < 100"
      large
      flat
      class="action-btn"
      @click="nextButtonClick()"
      id="next-btn"
    >
      <v-icon color="secondary" size="50" right>mdi-chevron-right</v-icon>
    </v-btn>
  </v-layout>
</template>
<script>
export default {
  props: {
    progress: Number
  },
  methods: {
    nextButtonClick() {
      //emit that the button has been clicked
      this.$emit("nextButtonClick");
    },
    previouseButtonClick() {
      //emit that the previous-btn has been clicked
      this.$emit("previousButtonClick");
    }
  }
};
</script>
