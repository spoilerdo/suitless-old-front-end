<template>
 <v-container fill-height fluid grid-list-sm>
   <RecommendedSurveys/>
 </v-container>

</template>

<script>
import RecommendedSurveys from "@/components/dashboard-home/RecommendedSurveys";

export default {
  components: {
    RecommendedSurveys
  },
  data() {
    return {

    };
  },
};
</script>
