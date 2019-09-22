<template>
  <v-container fluid pa-0 ma-o>
    <!--dialog that shows a disclaimer that the user has to agree to in order to start the survey-->
    <DisclaimerDialog 
      v-on:chosenAction="agreeDisclaimer"
      title="Disclaimer"
      text="The Legal Healthcheck Platform is not your online lawyer. Therefore, the service itself and the information it provides shall not be seen as legal advice. Rather, the Legal Healthcheck platform is intended as educational tool for students and start-ups to obtain basic legal knowledge. EhvLINC cannot guarantee that the information provided on this website (including the reports that it generates) is correct and fully up-to-date. Usage of the Legal Healthcheck Platform is fully at your own risk. EhvLINC explicitly rejects all liability for direct, indirect, incidental or special damages arising out or relating to the access or use of the service. This includes, but not restricted to, loss or damage caused by usage of information by this website, inaccurate results, loss of profits, business interruption, loss of use of the service, the cost of substitute services or claims by third parties for any damages to computers, software, modems, telephones or other property."
      trueBtnText="Agree"
      falseBtnText="Disagree"
      dialogState
      persistent
    />

    <v-layout align-center justify-center row pa-2>
      <ProgressBar ref="progressBar" />
    </v-layout>
    <!-- The start page of a survey -->
    <v-layout align-center justify-center row v-if="surveyStarted === false && survey.name != null">
      <SurveyInformation
        :title="survey.name"
        :description="survey.description"
        btnText="Start survey"
        v-on:btnClick="startSurvey"
      />
    </v-layout>

    <!-- The questions the surveys asks -->
    <SurveyContainer
      v-bind:isMobile.sync="isMobile"
      v-bind:surveyStarted.sync="surveyStarted"
      v-if="survey.nodes != null && surveyStarted && currentquestion != null"
    />
  </v-container>
</template>

<script>
import SurveyContainer from "@/components/survey/SurveyContainer.vue";
import SurveyInformation from "@/components/survey/SurveyInformation.vue";
import DisclaimerDialog from "@/components/material/Dialog.vue";
import ProgressBar from "@/components/survey/Progress.vue";

import theme from "@/plugins/vuetify/theme";
import { mapState, mapGetters, mapActions } from "vuex";

/**
 * Returns the survey page, where the user can answere questions to fill in a survey.
 * @memberof view
 */
export default {
  props: ["surveyID"],
  components: {
    SurveyContainer,
    SurveyInformation,
    DisclaimerDialog,
    ProgressBar
  },
  computed: {
    ...mapState("survey/", {
      survey: state => state.survey
    }),
    ...mapState("progress/", [
      "currentquestion"
    ]),
    ...mapGetters({
      firsQuestionID: "survey/getFirstQuestionID"
    })
  },
  data() {
    return {
      isMobile: true,
      surveyStarted: false
    };
  },
  created() {
    //when created call the action to get the survey with the id in the props.
    this.getSurveyByID(this.surveyID);
    this.setBackground(theme.defaultBackground);
    this.setFooterColor(theme.primary);
  },
  updated() {
    //only on the first ever update since this page
    if (this.currentquestion == null) {
      let firstquestion = this.survey.nodes[this.firsQuestionID];
      let allNodes = this.survey.nodes;

      this.setCurrentQuestion({ question: firstquestion, nodes: allNodes });
    }
  },
  methods: {
    ...mapActions("survey/", ["getSurveyByID"]),
    ...mapActions("progress/", ["setCurrentQuestion"]),
    ...mapActions("app/", ["setBackground", "setFooterColor"]),

    agreeDisclaimer(choice) {
      if (choice == false) {
        this.$router.go(-2);
      }
    },

    startSurvey() {
      this.surveyStarted = true;
    },

    onResize() {
      this.isMobile = window.innerWidth < 950;
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  beforeDestroy() {
    this.setFooterColor("#eee");
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, { passive: true });
    }
  }
};
</script>