<template>
  <v-container fluid pa-0 ma-0>
    <Animatedbackground/>

    <introToolbar/>

    <v-layout align-center justify-center class="background-content-container" row wrap fill-height>
      <v-flex grow xs10>
        <div class="display-2 text-xs-center white--text pb-3">Would you like to create an account?</div>
        <div
          class="subheading text-xs-center white--text pb-3"
        >Creating an account allows us to suggest surveys to you based on your data and submitted surveys!</div>
      </v-flex>
      <div class="layout row wrap" style="justify-content: center">
        <ImageCard
          redirecturl="/login"
          imagename="account"
          text="Create an account"
          cardWidth="xs6 md3"
          direction="column"
        />
        <ImageCard
          redirecturl="/surveys"
          imagename="anonymous"
          text="Continue anonymously"
          cardWidth="xs6 md3"
          direction="column"
        />
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import Animatedbackground from "@/components/background/Animatedbackground";
import ImageCard from "@/components/material/ImageCard";
export default {
  components: {
    Animatedbackground,
    ImageCard
  }
};
</script>
