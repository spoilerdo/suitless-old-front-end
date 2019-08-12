<template>
  <v-container fill-height fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex xs12>
        <Drawer v-if="role == 'ADMIN'"/>
        <FullWidthCardSurveysList 
          id="AllSurveys_Component"
          title="All the surveys"
          subTitle="Pick a survey to make"
          :items="this.surveys"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FullWidthCardSurveysList from "@/components/dashboard/FullWidthCardSurveysList";
import Drawer from "@/components/core/Drawer";
import theme from "@/plugins/vuetify/theme";
import { mapActions, mapState } from "vuex";

/**
 * Returns the dashboard page where users will go to after logging in.
 * @memberof view
 */
export default {
  components: {
    FullWidthCardSurveysList,
    Drawer
  },
  mounted() {
    this.role = this.token["scopes"];
  },
  data() {
    return {
      role: null
    };
  },
  computed: {
    ...mapState("login/", ["token"]),
    ...mapState("survey/", { surveys: state => state.all })
  },
  methods: {
    ...mapActions("app/", ["setBackground", "setFooterColor"]),
    ...mapActions("survey/", ["getAllSurveys"])
  },
  created() {
    this.getAllSurveys();
    this.setBackground(theme.defaultBackground);
    this.setFooterColor(theme.primary);
  },
  beforeDestroy() {
    this.setFooterColor("#fff");
  }
};
</script>
