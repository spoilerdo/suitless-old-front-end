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

    <!-- All the questions and multi choice -->
    <v-layout align-start justify-start row ma-4 v-if="progress !== 100 && survey.nodes != null && surveyStarted && currentquestion != null">
      <v-flex xs12 md11 my-2>
        <!--currentquestion is an object not an integer-->
        <Question
          v-if="currentquestion.style == $data.nodeEnum.Question"
          v-on:answerQuestion="answeredQuestion"
          v-on:renderPreviousQuestion="renderPreviousQuestion"
          :question="currentquestion"
          :progress="progress"
          :isMobile="isMobile"
        />
        <MultipleChoice
          v-else-if="currentquestion.style == $data.nodeEnum.MultipleChoice"
          v-on:answerMultiChoice="answeredMultiChoiceQuestion"
          v-on:renderPreviousQuestion="renderPreviousQuestion"
          :question="currentquestion"
          :progress="progress"
          :isMobile="isMobile"
          :options="options"
        />
        <Notification ref="surveyNotification" :timeVisible="0" />
      </v-flex>
      <v-flex xs5 md6 pl-5>
        <Info
          :question="currentquestion"
          v-if="!isMobile && currentquestion.style != $data.nodeEnum.Notification"
        />
      </v-flex>
    </v-layout>
    <!-- All the notifications -->
    <v-layout align-center justify-center row v-if="progress !== 100 && survey.nodes != null && surveyStarted && currentquestion != null">
      <SurveyInformation
        v-if="currentquestion.style == $data.nodeEnum.Notification"
        title
        :description="getNotify()"
        btnText="Oke, got it"
        v-on:btnClick="answeredQuestion(currentquestion.flows[0])"
      />
    </v-layout>
    <!-- The end of the survey -->
    <EndPage
      v-else-if="progress === 100"
      :answers="answer"
      :question="currentquestion"
      :progress="progress"
      v-on:renderPreviousQuestion="renderPreviousQuestion"
      v-on:printPDF="generatePDF"
      v-on:closeSurvey="closeSurvey"
    />
  </v-container>
</template>

<script>
import SurveyInformation from "@/components/survey/SurveyInformation.vue";
import DisclaimerDialog from "@/components/material/Dialog.vue";
import Question from "@/components/survey/Question.vue";
import ProgressBar from "@/components/survey/Progress.vue";
import Notification from "@/components/material/Notification.vue";
import MultipleChoice from "@/components/survey/MultipleChoice.vue";
import EndPage from "@/components/survey/endpage/EndPage.vue";
import Info from "@/components/survey/Info.vue";
import Router from "vue-router";
import theme from "@/plugins/vuetify/theme";
import { mapState, mapGetters, mapActions } from "vuex";

/**
 * Returns the survey page, where the user can answere questions to fill in a survey.
 * @memberof view
 */
export default {
  props: ["surveyID"],
  components: {
    SurveyInformation,
    DisclaimerDialog,
    Question,
    ProgressBar,
    Notification,
    MultipleChoice,
    Info,
    EndPage
  },
  computed: {
    ...mapState("survey/", {
      survey: state => state.all
    }),
    ...mapState("answer", {
      answer: state => state.all
    }),
    ...mapState("progress/", [
      "currentquestion",
      "progress",
      "notification",
      "options"
    ]),
    ...mapGetters({
      firsQuestionID: "survey/getFirstQuestionID",
      getAnswerByQuestionID: "answer/getAnswerByQuestionID"
    })
  },
  data() {
    return {
      isMobile: false,
      surveyStarted: false
    };
  },
  created() {
    //when created call the action to get the survey with the id in the props.
    this.getSurveyByID(this.surveyID);
    this.setBackground(theme.defaultBackground);
    this.setFooterColor(theme.primary);
  },
  methods: {
    ...mapActions("survey/", ["getSurveyByID", "deleteChosenSurvey"]),
    ...mapActions("answer/", [
      "deleteLastAnswer",
      "answerQuestion",
      "clearAnswers"
    ]),
    ...mapActions("progress/", [
      "fillProgress",
      "setCurrentQuestion",
      "fillCurrentQuestionBacklog",
      "clearCurrentQuestionBacklog",
      "fillsubQuestionBackLog",
      "clearSubQuestionBackLog",
      "clearProgress"
    ]),
    ...mapActions("app/", ["setBackground", "setFooterColor"]),

    agreeDisclaimer(choice) {
      if (choice === false) {
        this.closeSurvey();
        this.$router.go(-2);
      }
    },

    getNotify() {
      return this.currentquestion.lincData.find(data => data.key === "notify")
        .value;
    },

    startSurvey() {
      this.surveyStarted = true;
    },

    answeredQuestion(answer) {
      this.closeNotification();

      this.answerQuestion({
        answer,
        question: this.currentquestion
      });

      let nextQuestion = this.survey.nodes[answer.targetID];

      this.setCurrentQuestion({
        question: nextQuestion,
        nodes: this.survey.nodes
      });
      this.fillProgress({ addedDepth: 1, survey: this.survey });
    },

    renderPreviousQuestion(question) {
      this.closeNotification();

      let prevAnswer = null;

      //get previous answer(s) and convert them to an array.
      prevAnswer = this.getAnswerByQuestionID(question);

      if (!Array.isArray(prevAnswer)) {
        prevAnswer = Array.of(prevAnswer);
      } else {
        //make sure to clear the backlog so the flow of the survey doesnt mess up.
        this.clearCurrentQuestionBacklog();
        this.clearSubQuestionBackLog();
      }

      let previousQuestionID = prevAnswer[0].questionID;

      //check if previous question is a notification, if so go one more back.
      while (
        this.survey.nodes[previousQuestionID].style == this.$data.Notification
      ) {
        this.renderPreviousQuestion(this.survey.nodes[prevAnswer[0]]);
      }
      //select the previous question
      this.setCurrentQuestion({
        question: this.survey.nodes[previousQuestionID],
        nodes: this.survey.nodes
      });
      this.deleteLastAnswer();

      prevAnswer.forEach(() => {
        //reset progress for each previous answer
        this.fillProgress({ addedDepth: -1, survey: this.survey });
      });
    },

    answeredMultiChoiceQuestion({ answers, questions }) {
      this.closeNotification();

      //add answer to list of given answers.
      this.answerQuestion({
        answer: answers,
        question: this.currentquestion
      });

      //check if a flag is set for not looping non unique answers
      let shouldLoopNonUniqueSubQuestions = this.currentquestion.lincData.find(
        d => d.key === "loopsubQuestions"
      );
      if (shouldLoopNonUniqueSubQuestions.value == "true") {
        //create list of unique sub questions based on targetid and only add these to the backlog (skip first one it will be handled seperately)
        let uniqueList = [
          ...new Set(answers.slice(1).map(i => i.flows[0].targetID))
        ];
        uniqueList.forEach(nextQID => {
          //make sure we do not get duplicates on the first item we sliced
          if (nextQID !== answers[0].flows[0].targetID) {
            this.fillsubQuestionBackLog(this.survey.nodes[nextQID]);
          }
        });
      } else {
        //loop through all answers (skip 1st again it will be handled seperately) and add them to the subquestionbakclog
        answers.slice(1).forEach(ans => {
          if (ans.flows.length > 0) {
            this.fillsubQuestionBackLog(
              this.survey.nodes[ans.flows[0].targetID]
            );
          }
        });
      }

      let firstSubQuestion = null;
      if (answers[0].flows.length > 0) {
        firstSubQuestion = this.survey.nodes[answers[0].flows[0].targetID];
      }
      let backLogQuestion = null;
      if (questions.flows.length > 0) {
        backLogQuestion = this.survey.nodes[questions.flows[0].targetID];
      }

      //add the first question to come after finishing all multiple choice sub questions to the backlog.
      this.fillCurrentQuestionBacklog({
        firstSubQuestion: firstSubQuestion,
        backLogQuestion: backLogQuestion,
        nodes: this.survey.nodes
      });

      this.fillProgress({ addedDepth: 1, survey: this.survey });
    },

    closeNotification() {
      if (this.$refs.surveyNotification != null) {
        this.$refs.surveyNotification.closeNotification();
      }
    },

    generatePDF() {
      let pdfOptions = {
        orientation: "portrait",
        unit: "cm"
      };

      this.printPDF(pdfOptions, this.answer);
    },

    closeSurvey() {
      this.deleteChosenSurvey();
      this.clearAnswers();
      this.clearProgress();

      //To dashboard or the login page but this is not shure yet
      this.$router.push("/dashboard");
    },

    onResize() {
      this.isMobile = window.innerWidth < 600;
    }
  },
  updated() {
    //only on the first ever update since this page
    if (this.currentquestion == null) {
      let firstquestion = this.survey.nodes[this.firsQuestionID];
      let allNodes = this.survey.nodes;
      this.setCurrentQuestion({ question: firstquestion, nodes: allNodes });
    }
  },
  watch: {
    notification: function(val) {
      if (this.$refs.surveyNotification != null) {
        if (val.message != null) {
          this.$refs.surveyNotification.showNotification(val.message, val.type);
        }
      }
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