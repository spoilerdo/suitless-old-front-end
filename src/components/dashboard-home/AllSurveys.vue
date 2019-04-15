<template>
  <v-layout fill-height fluid grid-list-sm>
    <Card
      color="primary"
      title="All Surveys"
      text="Surveys we recommend for you based on previous input"
      class="flex xs12 md6"
    >
      <v-layout row wrap>
        <div v-for="s in survey" :key="s.moduelID" class="text-xs-center flex xs12 md3">
          <RoundCard :redirecturl='`/survey/${s.moduleID}`' imagename="IP.svg" :text="s.name" width="xs12"/>
        </div>
      </v-layout>
    </Card>
  </v-layout>
</template> 

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
      role: null,
    };
  }
};
</script>
