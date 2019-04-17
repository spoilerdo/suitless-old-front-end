<template>
  <v-container fluid pa-0 ma-o>
    <v-layout align-center justify-center row pa-5>
      <ProgressBar ref="progressBar"/>
    </v-layout>
    <v-layout align-center justify-center row pa-5>
      <v-flex d-flex xs8>
        <Question
          v-if="survey.nodes != null && currentquestion != null"
          v-on:answerQuestion="answeredQuestion"
          v-on:renderPreviousQuestion="renderPreviousQuestion"
          v-bind:question="survey.nodes[currentquestion]"
          v-bind:progress="progress"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Question from "@/components/survey/Question.vue";
import ProgressBar from "@/components/survey/Progress.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  props: ["surveyID"],
  components: {
    Question,
    ProgressBar
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
      this.fillProgress({ addedDepth: 1, survey: this.survey });
    },
    renderPreviousQuestion(question) {
      //select the previouse question
      this.setCurrentQuestion(this.getAnswerByQuestionID(question).questionID);
      this.deleteLastAnswer();

      this.fillProgress({ addedDepth: -1, survey: this.survey });
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
    }
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
      }
    }
  }
};
</script>