<template>
  <v-layout fill-height fluid grid-list-sm>
    <Card
      color="primary"
      title="Recommended Surveys"
      text="Surveys we recommend for you based on previous input"
    >
      <v-layout row wrap>
        <!-- <v-flex v-for="i in 4" :key="`4${i}`" class="text-xs-center"> -->
        <!-- <div v-for="i in 4" :key="`4${i}`" class="text-xs-center"> -->
          <div>
        <RecommendedSurveyCard
          redirecturl="/survey"
          imagename="IP.svg"
          text="Intellectual Property"
        /></div><div>
        <RecommendedSurveyCard
          redirecturl="/survey"
          imagename="Privacy.svg"
          text="Intellectual Property"
        /></div><div>
        <RecommendedSurveyCard
          redirecturl="/survey"
          imagename="Trademark.svg"
          text="Intellectual Property"
        /></div>

        <!-- </div> -->

        <!-- </v-flex> -->
      </v-layout>
    </Card>
  </v-layout>
</template>

<script>
import Card from "@/components/material/Card";
import RecommendedSurveyCard from "@/components/dashboard-home/RecommendedSurveyCard";

export default {
  components: {
    Card,
    RecommendedSurveyCard
  },
  data() {
    return {};
  }
};
</script>
