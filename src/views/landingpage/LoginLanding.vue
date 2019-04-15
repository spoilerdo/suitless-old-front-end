<template>
  <v-container fluid pa-0 ma-0>
    <Animatedbackground/>

    <introToolbar/>

    <v-layout align-center justify-center class="background-content-container" row wrap fill-height>
      <v-flex grow xs10>
        <div class="display-2 text-xs-center white--text pb-3">Would you like to create an account?</div>
        <div class="subheading text-xs-center white--text pb-3">Creating an account allows us to suggest surveys to you based on your data and submitted surveys!</div>
      </v-flex>
      <v-layout align-center justify-center row>
        <RoundCard redirecturl="/login" imagename="Account.svg" text="Create an account"  width="xs6 md3"/>
          <v-divider vertical inset dark></v-divider>
        <RoundCard redirecturl="/surveys"  imagename="Incognito.svg" text="Continue anonymously" width="xs6 md3"/>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import Animatedbackground from "@/components/background/Animatedbackground";
import RoundCard from '@/components/material/RoundCard'
export default {
    components: {
        Animatedbackground,
        RoundCard
    }
}
</script>
