<template>
  <v-container fluid pa-0 ma-o>
    <Animatedbackground/>

    <v-layout align-center justify-center class="background-content-container" row wrap fill-height>
      <v-flex grow xs10>
        <div class="display-2 text-xs-center white--text pb-3">choose a questionaire to start</div>
      </v-flex>
      <v-layout align-center justify-center row>
        <Category/>
        <Category/>
        <Category/>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import Category from "@/components/survey-category/Category";
import Animatedbackground from "@/components/background/Animatedbackground";

export default {
  components: {
    Category,
    Animatedbackground
  }
};
</script>