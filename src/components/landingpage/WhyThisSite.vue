<template>
  <v-container class="section">
    <v-layout align-center justify-center class="background-content-container" row wrap fill-height>
      <v-flex xs12 sm6 md5>
        <div class="display-2 text-xs-center red--text bold">ehvLINC</div>
        <div class="display-1 text-xs-left pb-3"> <br/>Are you a startup founder?<br/> Did you get lost in all that legal mumbo jumbo?<br/> Does the dept of your pockets not allow you to pay for the lawyers and tax consultants?<br/> Then ehvLINC might be the program for YOU!</div>
      </v-flex>
      <v-flex xs12 sm6 md5>
        <v-img :src="stats" aspect-ratio="1" contain max-height="500"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { CDN_URL } from "@/store/generalconstants";
/**
 * Provides part of the landing page's information.
 * @memberof component.Landingpage
 * @property {String} stats an image from the cdn
 */
export default {
  data: () => {
    return {
      stats: `${CDN_URL}/Stats`
    };
  }
}
</script>
