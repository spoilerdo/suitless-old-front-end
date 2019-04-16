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
        <RoundCard
          redirecturl="/survey"
          imagename="IP.svg"
          text="Intellectual Property"
        /></div><div>
        <RoundCard
          redirecturl="/survey"
          imagename="Privacy.svg"
          text="Intellectual Property"
        /></div><div>
        <RoundCard
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
import RoundCard from "@/components/material/RoundCard";

export default {
  components: {
    Card,
    RoundCard
  },
  data() {
    return {};
  }
};
</script>
