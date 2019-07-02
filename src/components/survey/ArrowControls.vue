<template>
  <!-- previous arrow -->
  <v-layout align-center justify-center row>
    <v-btn v-if="progress > 0" @click="previouseButtonClick()" flat class="action-btn">
      <v-icon color="secondary" x-large left>mdi-chevron-left</v-icon>
    </v-btn>

    <!-- next arrow -->
    <v-btn large flat class="action-btn" @click="nextButtonClick()">
      <v-icon color="secondary" x-large right>mdi-chevron-right</v-icon>
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
