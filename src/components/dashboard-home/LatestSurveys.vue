<template>
  <v-layout fill-height fluid grid-list-sm>
    <Card
      color="primary"
      title="Latest Reports"
      text="Reports from the latest surveys you have filled in"
      :class="{'flex xs3 smallBar': collapsed, 'flex xs12 largeBar': !collapsed}"
    >
      <v-layout row wrap>
        <div v-for="s in survey._embedded.moduleList" :key="s.moduelID" class="LatestSurveyDiv text-xs-center flex xs12 md3">
          <DashboardSurveyCard
            :redirecturl='`/survey/${s.moduleID}`' 
            imagename="IP.svg" 
            :text="s.name"
            />
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
import DashboardSurveyCard from "@/components/dashboard-home/DashboardSurveyCard";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    Card,
    DashboardSurveyCard
  },
  computed: {
    ...mapState("survey", {
      survey: state => state.all
    }),

    // smallBar(){
    // return {
    //   xs3: this.$vuetify.breakpoint.mdAndUp
    // }},

    // largeBar(){
    // return {
    //   xs12: this.$vuetify.breakpoint.mdAndUp
    // }
  },
  created() {
    //when created call the action to get all products from api and put it in the store
    this.$store.dispatch("survey/getAllSurveys");
  },
  data() {
    return {
      collapsed: false,
    };
  }
};
</script>
