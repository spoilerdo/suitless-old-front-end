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
      >
        <template v-slot:activator="{ on }">
          <v-btn class="action-btn" flat icon left absolute round v-on="on">
            <v-icon color="secondary">mdi-help</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-tile>
            <v-list-tile-title>{{question.lincData.reason}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-card-title primary-title class="grow mb-3">
        <v-layout align-center justify-center row>
          <v-layout align-center justify-center row>
            <h3 class="headline mb-0">{{question.value}}</h3>
          </v-layout>
        </v-layout>
      </v-card-title>
      <v-card-actions class="action-card">
        <v-layout align-center justify-center row>
          <v-btn
            v-for="answer in question.flows"
            :key="answer.targetID"
            v-on:click="$emit('answerQuestion', answer)"
            class="primary"
          >{{answer.value}}</v-btn>
        </v-layout>
        <v-btn
          v-if="progress > 0"
          v-on:click="$emit('renderPreviousQuestion', question)"
          flat
          absolute
          round
          icon
          left
          class="action-btn"
        >
          <v-icon color="secondary">mdi-chevron-left</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-scale-transition>
</template>

<style scoped>
.action-btn {
  opacity: 0.3;
}
.action-btn:hover {
  opacity: 1;
}
.action-card {
  min-height: 62px;
}
</style>


<script>
export default {
  props: ["question", "progress"]
};
</script>