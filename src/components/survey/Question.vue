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
          <h3 class="headline mb-0">{{question.value}}</h3>
        </v-layout>
      </v-card-title>
      <v-card-actions class="action-card">
        <v-layout align-center justify-center row wrap>
          <v-btn
            v-for="answer in question.flows"
            :key="answer.targetID"
            v-on:click="$emit('answerQuestion', answer)"
            class="primary answerBtn"
          >{{answer.value}}</v-btn>
        </v-layout>
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
import Info from "@/components/survey/Info.vue";

export default {
  components: {
    Info
  },
  props: ["question", "progress", "isMobile"]
};
</script>