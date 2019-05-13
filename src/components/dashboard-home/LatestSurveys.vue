<template>
  <v-layout fill-height fluid grid-list-sm>
    <Card
      color="primary"
      title="Latest Reports"
      text="Reports from the latest surveys you have filled in"
      :class="{'flex xs3 smallBar': collapsed, 'flex xs12 largeBar': !collapsed}"
    >
      <v-layout row wrap>
        <div v-for="s in survey" :key="s.moduelID" class="text-xs-center flex xs12 md3">
          <RoundCard :redirecturl="`/survey/${s.moduleID}`" imagename="IP.svg" :text="s.name"/>
          <h1>69%</h1>
        </div>
      </v-layout>
    </Card>
  </v-layout>
</template>

<style>
.LatestSurveyDiv {
  display: flex;
  align-items: center;
}

.largeBar {
}

.smallBar {
  height: 500px;
}
</style>


<script>
import Card from "@/components/material/Card";
import RoundCard from "@/components/material/RoundCard";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    Card,
    RoundCard
  },
  computed: {
    ...mapState("survey", {
      survey: state => state.all
    })
  },
  created() {
    //when created call the action to get all products from api and put it in the store
    this.$store.dispatch("survey/getAllSurveys");
  },
  data() {
    return {
      collapsed: false
    };
  }
};
</script>
