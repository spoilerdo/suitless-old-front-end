<template>
  <v-container fluid pa-0 ma-o>
    <Animatedbackground />

    <v-layout align-center justify-center class="background-content-container" row wrap fill-height>
      <v-flex grow xs12>
        <div class="display-2 text-xs-center white--text pb-3">Recommended starter surveys</div>
      </v-flex>
      <v-layout align-space-around justify-center row wrap>
        <ActionCard
          @action="redirecturl"
          parameter="/survey/5d74f34a6eb14e0001b9c89c"
          text="Trade name/ Trademark"
          imageName="trademark"
          rounded
        />
      </v-layout>
    </v-layout>
    <div class="text-xs-center">
      <v-layout align-center justify-center row>
        <v-btn color="grey" large>
          <v-icon dark>close</v-icon>&nbsp; No thanks, i'll find my own surveys.
        </v-btn>
      </v-layout>
    </div>
  </v-container>
</template>

<style scoped>
@media screen and (max-width: 599px) {
  .background-content-container {
    height: 100%;
  }
}
</style>

<script>
import Animatedbackground from "@/components/background/Animatedbackground";
import ActionCard from "@/components/material/ActionCard";
import theme from "@/plugins/vuetify/theme";
import { mapActions } from "vuex";

/**
 * Returns the page where new users get offered recommended surveys.
 * @memberof view
 * @todo make the recommended surveys dynamic
 */
export default {
  components: {
    Animatedbackground,
    ActionCard
  },
  methods: {
    ...mapActions("app/", ["setBackground"]),
    redirecturl(url) {
      this.$router.push(url);
    }
  },
  created() {
    this.setBackground(theme.landingBackground);
  }
};
</script>