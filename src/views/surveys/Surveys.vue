<template>
  <v-container fluid pa-0 ma-o>
    <Animatedbackground/>

    <v-layout align-center justify-center class="background-content-container" row wrap fill-height>
      <v-flex grow xs12>
        <div class="display-2 text-xs-center white--text pb-3">Recommended starter surveys</div>
      </v-flex>
      <v-layout align-center justify-center row wrap>
        <ImageCard
          redirecturl="/survey/5cf4c7f87fa73a0006d320ac"
          imagename="trademark"
          text="Trademark"
          cardWidth="xs6 sm4 md3"
          direction="column"
        />
        <ImageCard
          redirecturl="/survey/5cf4c8017fa73a0006d320ad"
          imagename="software"
          text="Software IP"
          cardWidth="xs6 sm4 md3"
          direction="column"
        />
      </v-layout>
    </v-layout>
    <div class="text-xs-center">
      <v-layout align-center justify-center row>
        <!-- <v-btn color="primary" large href="/dashboard">
          <v-icon dark>close</v-icon>&nbsp; No thanks, i'll find my own surveys.
        </v-btn>-->
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
import ImageCard from "@/components/material/ImageCard";

import { mapActions } from "vuex";

/**
 * Returns the page where new users get offered recommended surveys.
 * @memberof view
 * @todo make the recommended surveys dynamic
 */
export default {
  components: {
    Animatedbackground,
    ImageCard
  },
  methods: {
    ...mapActions("app/", ["setBackground"])
  },
  created() {
    this.setBackground("#30002a");
  }
};
</script>