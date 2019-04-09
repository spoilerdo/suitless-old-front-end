<template>
  <v-container fluid pa-0 ma-o>
    <Animatedbackground/>

    <v-layout align-center justify-center class="background-content-container" row wrap fill-height>
      <v-flex grow xs10>
        <div class="display-2 text-xs-center white--text pb-3">Recommended starter surveys</div>
      </v-flex>
      <v-layout align-center justify-center row wrap>
        <CustomCard redirecturl="/survey"  imagename="IP.svg" text="Privacy"/>
        <CustomCard redirecturl="/survey"  imagename="IP.svg" text="Privacy"/>
        <CustomCard redirecturl="/survey"  imagename="IP.svg" text="Privacy"/>
      </v-layout>
    </v-layout>
    <div class="text-xs-center">
      
      <v-btn color="primary" large href="/dashboard"><v-icon dark>close</v-icon> &nbsp; No thanks, i'll find my own surveys.</v-btn>
    </div>
  </v-container>
</template>

<script>
import Category from "@/components/survey-category/Category";
import Animatedbackground from "@/components/background/Animatedbackground";
import CustomCard from '@/components/login-landingpage/CustomCard'

import { mapActions } from "vuex";

export default {
  components: {
    Category,
    Animatedbackground,
    CustomCard
  },
  methods: {
    ...mapActions({
      setBackground: "app/setBackground"
    })
  },
  created() {
    this.setBackground("#30002a");
  }
};
</script>