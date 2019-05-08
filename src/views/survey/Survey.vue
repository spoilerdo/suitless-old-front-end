<template>
  <v-container fluid pa-0 ma-o>
    <v-layout align-center justify-center row pa-5>
      <ProgressBar ref="progressBar"/>
    </v-layout>
    <v-layout align-center justify-center row pa-5>
      <v-flex d-flex md8 xs12 v-if="survey.nodes != null && currentquestion != null">
        <Question
          v-if="survey.nodes[currentquestion].style == 1"
          v-on:answerQuestion="answeredQuestion"
          v-on:renderPreviousQuestion="renderPreviousQuestion"
          v-bind:question="survey.nodes[currentquestion]"
          v-bind:progress="progress"
          :isMobile="isMobile"
        />
        <Notification
          v-if="notification != null"
          v-bind:value="notification.value"
        />
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center row pa-5>
      <v-flex d-flex md8 xs12 v-if="survey.nodes != null && currentquestion != null">
          <Info :question="survey.nodes[currentquestion]"  v-if="!isMobile"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Question from "@/components/survey/Question.vue";
import ProgressBar from "@/components/survey/Progress.vue";
import Notification from "@/components/material/Notification.vue";
import Info from "@/components/survey/Info.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  props: ["surveyID"],
  components: {
    Question,
    ProgressBar,
    Notification,
    Info
  },
  computed: {
    ...mapState("survey", {
      survey: state => state.all
    }),
    ...mapState("answer", {
      answer: state => state.all
    }),
    ...mapState("progress", {
      currentquestion: state => state.currentquestion,
      progress: state => state.progress
    }),
    ...mapGetters({
      firsQuestionID: "survey/getFirstQuestionID",
      getAnswerByQuestionID: "answer/getAnswerByQuestionID"
    })
  },
  data(){
    return{
      notification: null,
      isMobile: false
    }
  },
  created() {
    //when created call the action to get the survey with the id in the props.
    this.getSurveyByID(this.surveyID);
    this.setBackground("#eee");
  },
  methods: {
    ...mapActions("survey/", ["getSurveyByID"]),
    ...mapActions("answer/", ["deleteLastAnswer", "answerQuestion"]),
    ...mapActions("progress/", ["fillProgress", "setCurrentQuestion"]),
    ...mapActions("app/", ["setBackground"]),
    answeredQuestion(answer) {
      this.answerQuestion({
        answer,
        question: this.survey.nodes[this.currentquestion]
      });
      this.setCurrentQuestion(answer.targetID);

      //if the next question is a notification then store it in the notification array and show it on the front-end
      if(this.survey.nodes[this.currentquestion].style == 5){
        this.notification = this.survey.nodes[this.currentquestion];
        this.setCurrentQuestion(this.survey.nodes[this.currentquestion].flows[0].targetID);
      }

      this.fillProgress({ addedDepth: 1, survey: this.survey });      
    },
    renderPreviousQuestion(question) {
      this.fillProgress({ addedDepth: -1, survey: this.survey });
      //select the previouse question
      this.setCurrentQuestion(this.getAnswerByQuestionID(question).questionID);
      this.deleteLastAnswer();
    },
    getFormattedDate() {
      var myDate = new Date();
      var month = ("0" + (myDate.getMonth() + 1)).slice(-2);
      var date = ("0" + myDate.getDate()).slice(-2);
      var year = myDate.getFullYear();
      return year + "/" + month + "/" + date;
    },
    getPDFContent() {
      let pdfContents = [];

      var today = new Date();
      pdfContents.push(
        this.pdfContentTitle(
          "ehvLINC REPORT  " +
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate()
        )
      );

      for (let i = 0; i < this.answer.length; i++) {
        if(this.answer[i].answerValue != null) {
          pdfContents.push(this.pdfContentQuestion(this.answer[i].questionValue));
          pdfContents.push(this.pdfContentReply(this.answer[i].answerValue));
        } else {
          pdfContents.push(this.pdfContentWarning(this.answer[i].questionValue));
          console.error("Error while printing to the PDF");
          console.error(this.answer[i]);
        }

        //TODO: voeg warnings aka "Notifications" toe.
        //TODO: voeg Results toe (ook in flowchart editor).
      }

      return pdfContents;
    },
    printPDF() {
      let pdfOptions = {
        orientation: "portrait",
        unit: "cm"
      };
      let pdfContents = this.getPDFContent();
      let name = "report " + this.getFormattedDate();

      this.generatePdf(pdfOptions, pdfContents, name);
    },
    onResize () {
      this.isMobile = window.innerWidth < 600
    }
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  updated() {
    //only on the first ever update since this page
    if (this.currentquestion == null) {
      this.setCurrentQuestion(this.firsQuestionID);
    }
  },
  watch: {
    progress: function(newValue, oldValue) {
      //watch for completion of survey, then print pdf
      if (newValue === 100) {
        this.printPDF();
        this.$router.push('/dashboard');
        this.setCurrentQuestion(null);
      }
    }
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },
};
</script>