<template>
 <v-container fill-height fluid grid-list-sm>
   <AllSurveys/>
 </v-container>

</template>

<script>
import RecommendedSurveys from "@/components/dashboard-home/RecommendedSurveys";
import AllSurveys from "@/components/dashboard-home/AllSurveys";

export default {
  components: {
    RecommendedSurveys,
    AllSurveys
  },
  data() {
    return {

    };
  },
};
</script>
