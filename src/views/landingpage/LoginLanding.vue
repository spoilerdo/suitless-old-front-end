<template>
  <v-container fluid pa-0 ma-0>
    <Animatedbackground/>

    <v-layout align-center justify-center class="background-content-container" row wrap fill-height>
      <v-flex grow xs10>
        <div class="display-2 text-xs-center white--text pb-3">Would you like to create an account?</div>
        <div
          class="subheading text-xs-center white--text pb-3"
        >Creating an account allows us to suggest surveys to you based on your data and submitted surveys!</div>
      </v-flex>
      <v-layout row wrap justify-center>
        <ActionCard
          @action="redirecturl"
          parameter="/login"
          imageName="account"
          text="Create an account"
          rounded
        />
        <ActionCard
          @action="redirecturl"
          parameter="/surveys"
          imageName="anonymous"
          text="Continue anonymously"
          rounded
        />
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import ActionCard from "@/components/material/ActionCard";
import Animatedbackground from "@/components/background/Animatedbackground";

/**
 * returns the login landing page, asking the user wether they want to create an account.
 * @memberof view
 */
export default {
  components: {
    Animatedbackground,
    ActionCard
  },
  methods: {
    redirecturl(url) {
      this.$router.push(url);
    }
  },
};
</script>
