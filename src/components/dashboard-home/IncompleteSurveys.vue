<template>
  <v-layout fluid grid-list-sm>
    <Card
      color="primary"
      title="Incomplete surveys"
      text="Surveys that you started but not finished"
      class="flex xs12 md12"
      icon="mdi-format-list-bulleted"
      style="display: flex; flex-wrap: wrap;"
    >
      <v-layout row wrap class="extender" v-bind:class="{ collapsed: this.limit == 2, extended: this.limit != 2 }">
        <div
          v-for="s in survey.slice(0,limit)"
          :key="s.moduelID"
          class="text-xs-center flex xs12"
          style="padding-bottom: 15px;"
        >
          <ListCard
            :redirecturl="`/survey/${s.moduleID}`"
            imagename="IP.svg"
            progress="10"
            :title="s.name"
            :description="s.description"
            orientation="vertical"
          />
        </div>
      </v-layout>
      <div class="flex xs12" style="display: flex; justify-content: flex-end;">
        <v-btn class="primary" v-on:click="updateSurveys()" large>{{buttonText}}</v-btn>
      </div>
    </Card>
  </v-layout>
</template>

<style scoped>
.extender {
  /* height: 320px; */
}
.collapsed {
  overflow: hidden;
}

.extended {
  height: 700px;
  overflow-y: scroll;
}
</style>


<script>
import Card from "@/components/material/Card";
import ListCard from "@/components/material/ListCard";
import { mapState, mapGetters } from "vuex";

/**
 * Returns a view containing all incomplete surveys, this is currently all mock data.
 * @memberof component.Dashboard
 * @todo remove mock data
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
    //this.$store.dispatch("survey/getAllSurveys");
  },
  data() {
    return {
      role: null,
      limit: 2,
      buttonText: "Show more"
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
