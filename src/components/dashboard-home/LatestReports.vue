<template>
  <v-layout fluid grid-list-sm>
    <Card
      color="primary"
      title="Latest Reports"
      text="Reports from the latest surveys you have filled in"
      class="flex xs12 md12"
      icon="mdi-file"
      style="display: flex; flex-wrap: wrap;"
    >
      <v-layout row wrap>
        <div
          v-for="s in survey.slice(0,4)"
          :key="s.moduelID"
          class="text-xs-center flex xs12 md6"
          style="padding-bottom: 15px; flex-wrap: wrap;"
        >
          <ListCard
            :redirecturl="`/survey/${s.moduleID}`"
            imagename="IP.svg"
            :title="s.name"
            orientation="vertical"
          />
        </div>
      </v-layout>
    </Card>
  </v-layout>
</template>

<script>
import Card from "@/components/material/Card";
import ListCard from "@/components/material/ListCard";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    Card,
    ListCard
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