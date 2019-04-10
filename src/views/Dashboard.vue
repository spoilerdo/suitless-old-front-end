<template>
 <v-container fill-height fluid grid-list-sm>
   <AllSurveys v-if="role == 'ADMIN'"/>
   <LatestSurveys v-else/>
 </v-container>

</template>

<script>
import RecommendedSurveys from "@/components/dashboard-home/RecommendedSurveys";
import AllSurveys from "@/components/dashboard-home/AllSurveys";
import LatestSurveys from "@/components/dashboard-home/LatestSurveys";

export default {
  components: {
    RecommendedSurveys,
    AllSurveys,
    LatestSurveys
  },
  created() {
    //when created call the action to get all products from api and put it in the store
    let jwtDecode = require('jwt-decode');

    let decoded = jwtDecode(localStorage.jwtToken);

    this.role = decoded['scopes'];
  },
  data() {
    return {

    };
  },
};
</script>
