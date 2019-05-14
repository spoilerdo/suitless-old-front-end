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
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex xs6 v-for="option in options" :key="option.id">
              <v-checkbox
              :label="option.value"
              :value="'radio-'+option.id"
              hide-details
              on-icon="mdi-checkbox-blank"
              color="primary"
            />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-scale-transition>
</template>

<script>
import Info from "@/components/survey/Info.vue";

export default {
    components: {
        Info
    },
    props: ["question", "progress", "isMobile", "options"]
}
</script>