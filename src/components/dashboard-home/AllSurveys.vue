<template>
  <v-layout fluid grid-list-sm>
    <Card
      color="primary"
      title="All Surveys"
      text="Surveys we recommend for you based on previous input"
      class="flex xs12 md12"
      style="display: flex; flex-wrap: wrap;"
    >
      <v-layout row wrap style="overflow-y: scroll; max-height: 573px">
        <div
          v-for="s in survey.slice(0,limit)"
          :key="s.moduelID"
          class="text-xs-center flex md3 xs12"
          style="padding-bottom: 15px;"
        >
          <ListCard
            :redirecturl="`/survey/${s.moduleID}`"
            :imagename="s.lincData[0].value"
            percentage="0"
            :title="s.name"
            :description="s.description"
          />
        </div>
      </v-layout>
      <div class="flex xs12" style="display: flex; justify-content: flex-end;">
        <v-btn class="primary" v-on:click="updateSurveys()" large>{{buttonText}}</v-btn>
      </div>
    </Card>
  </v-layout>
</template> 

<script>
import Card from "@/components/material/Card";
import ListCard from "@/components/material/ListCard";
import { mapState, mapGetters } from "vuex";

/**
 * Returns a view containing all surveys.
 * @memberof component.Dashboard
 */
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
      role: null,
      limit: 2,
      buttonText: "Show more",
    };
  },

  methods: {
    updateSurveys() {
      if (this.limit == 2) {
        this.limit = this.survey.length;
        this.buttonText = "Show less";
      } else {
        this.limit = 2;
        this.buttonText = "Show more";
      }
    }
  }
};
</script>
