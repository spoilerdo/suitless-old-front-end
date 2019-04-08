<template>
  <v-container fluid pa-0 ma-0>
    <Animatedbackground v-once/>

    <v-layout align-center justify-center class="background-content-container" row wrap fill-height>
      <v-flex xs12 sm6 md5>
        <v-img :src="ehvLogo" aspect-ratio="1" contain max-height="300"/>
      </v-flex>
      <v-flex xs12 sm6 md5>
        <div class="display-2 text-xs-center white--text pb-3">make your company legally ready</div>
        <div class="text-xs-center">
          <v-btn to="/landingregister" class="primary" large>Start</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { createNamespacedHelpers } from 'vuex';
import Animatedbackground from "@/components/background/Animatedbackground";

//can be used if you will only need to access ONE module in this component, will auto append /app before actions.
const { mapState } = createNamespacedHelpers('app/')

export default {
  name: "landingPage",
  data: () => {
    return {
      ehvLogo: require("@/assets/img/logoehvlinc.png")
    };
  },
  components: {
    Animatedbackground
  },
  computed: {
    ...mapState(['newUser'])
  },
  beforeMount() {
    if(!this.newUser) {
        this.$router.push("/dashboard")
    }
  }
};
</script>