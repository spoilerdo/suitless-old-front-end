<template>
  <v-scale-transition>
    <v-card height="190">
      <v-menu
        transition="slide-x-transition"
        bottom
        right
        offset-x
        nudge-right="10"
        nudge-bottom="18"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon color="secondary" top left absolute round v-on="on">
            <v-icon>mdi-help</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-tile>
            <v-list-tile-title>Dit is een test</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-card-title primary-title class="grow mb-3">
        <v-layout align-center justify-center row>
          <v-layout align-center justify-center row>
            <h3 class="headline mb-0">{{question}}</h3>
          </v-layout>
        </v-layout>
      </v-card-title>
      <v-card-actions>
        <v-layout align-center justify-center row>
          <v-btn
            v-for="answer in answers"
            :key="answer.targetID"
            v-on:click="$emit('answerQuestion', answer)"
            class="primary"
          >{{answer.value}}</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-scale-transition>
</template>
<script>
export default {
  props: ["question", "answers"]
};
</script>