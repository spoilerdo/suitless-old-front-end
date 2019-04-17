<template>
  <v-container fluid pa-0 ma-o>
    <Animatedbackground/>

    <v-layout align-center justify-center class="background-content-container" row wrap fill-height>
      <v-flex grow xs10>
        <div class="display-2 text-xs-center white--text pb-3">Recommended starter surveys</div>
      </v-flex>
      <v-layout align-center justify-center row wrap>
        <RoundCard redirecturl='/survey/5cb07a1ba38986000833c1b5'  imagename="IP.svg" text="General Intake" width="xs6 md3"/>
        <RoundCard redirecturl="/survey/5cb496f4a38986000833c1ba"  imagename="IP.svg" text="Privacy" width="xs6 md3"/>
        <RoundCard redirecturl="/survey/5cb470a3a38986000833c1b9"  imagename="IP.svg" text="Software IP" width="xs6 md3"/>
      </v-layout>
    </v-layout>
    <div class="text-xs-center">
      
      <v-btn color="primary" large href="/dashboard"><v-icon dark>close</v-icon> &nbsp; No thanks, i'll find my own surveys.</v-btn>
    </div>
  </v-container>
</template>

<script>
import Animatedbackground from "@/components/background/Animatedbackground";
import RoundCard from '@/components/material/RoundCard'

import { mapActions } from "vuex";

export default {
  components: {
    Animatedbackground,
    RoundCard
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