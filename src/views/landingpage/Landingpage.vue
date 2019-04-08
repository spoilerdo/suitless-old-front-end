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
          <v-btn to="/surveys" class="primary" large>Start</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Animatedbackground from "@/components/background/Animatedbackground";
import { mapActions } from "vuex";

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
  methods: {
    ...mapActions({
      setBackground: "app/setBackground"
    })
  },
  created(){
    this.setBackground("#30002a");
  }
};
</script>