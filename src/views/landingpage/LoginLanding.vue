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
        <CustomCard redirecturl="/login" imagename="Account.svg" text="Create an account"/>
          <v-divider vertical inset dark></v-divider>
        <CustomCard redirecturl="/surveys"  imagename="Incognito.svg" text="Continue anonymously"/>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import Animatedbackground from "@/components/background/Animatedbackground";
import CustomCard from '@/components/login-landingpage/CustomCard'
export default {
    components: {
        Animatedbackground,
        CustomCard
    }
}
</script>
