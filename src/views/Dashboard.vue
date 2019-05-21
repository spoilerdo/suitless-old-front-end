<template>
  <v-container fill-height fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex xs12>
        <div v-if="role == 'ADMIN'">
          <AllSurveys id="AllSurveys_Component"/>
        </div>
        <div v-else style="display: flex; flex-wrap: wrap;">
          <div class="flex xs12">
            <IncompleteSurveys id="IncompleteSurveys_Component"/>
          </div>
          <div class="flex md7 xs12">
            <LatestReports id="LatestReports_Component"/>
          </div>
          <div class="flex md5 xs12">
            <RecommendedSurveys id="RecommendedSurveys_Component"/>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RecommendedSurveys from "@/components/dashboard-home/RecommendedSurveys";
import AllSurveys from "@/components/dashboard-home/AllSurveys";
import IncompleteSurveys from "@/components/dashboard-home/IncompleteSurveys";
import LatestReports from "@/components/dashboard-home/LatestReports";
import { mapActions } from "vuex";

export default {
  components: {
    RecommendedSurveys,
    AllSurveys,
    IncompleteSurveys,
    LatestReports
  },
  mounted() {
    //when created call the action to get all products from api and put it in the store
    let jwtDecode = require("jwt-decode");
    let decoded = jwtDecode(localStorage.jwtToken);
    this.role = decoded["scopes"];
  },
  data() {
    return {
      role: null
    };
  },
  methods: {
    ...mapActions("app/", ["setBackground"])
  },
  created() {
    this.setBackground("#eeeeee");
  }
};
</script>
