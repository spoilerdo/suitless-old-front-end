<template>
  <v-container fluid pa-0 ma-o>
    <v-layout align-center justify-center row pa-5>
      <ProgressBar ref="progressBar"/>
    </v-layout>
    <v-layout align-center justify-center row ma-4>
      <v-flex d-flex md8 xs12 v-if="survey.nodes != null && currentquestion != null">
        <!--currentquestion is a object not an integer-->
        <Question
          v-if="currentquestion.style == 1"
          v-on:answerQuestion="answeredQuestion"
          v-on:renderPreviousQuestion="renderPreviousQuestion"
          :question="currentquestion"
          :progress="progress"
          :isMobile="isMobile"
        />
        <MultipleChoice 
          v-else-if="currentquestion.style == 7"
          v-on:answerMultiChoice="answeredMultiChoiceQuestion"
          v-on:renderPreviousQuestion="renderPreviousQuestion"
          :question="currentquestion"
          :progress="progress"
          :isMobile="isMobile"
          :options="options"
        />
        <Notification
          v-if="notification != null"
          v-bind:value="notification.value"
        />
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center row pa-5>
      <v-flex d-flex md8 xs12 v-if="survey.nodes != null && currentquestion != null">
          <Info :question="currentquestion"  v-if="!isMobile"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Question from "@/components/survey/Question.vue";
import ProgressBar from "@/components/survey/Progress.vue";
import Notification from "@/components/material/Notification.vue";
import MultipleChoice from "@/components/survey/MultipleChoice.vue";
import Info from "@/components/survey/Info.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  props: ["surveyID"],
  components: {
    Question,
    ProgressBar,
    Notification,
    MultipleChoice,
    Info
  },
  computed: {
    ...mapState("survey/", {
      survey: state => state.all
    }),
    ...mapState("answer", {
      answer: state => state.all
    }),
    ...mapState("progress/", ["currentquestion", "progress", "notification", "options"]),
    ...mapState("app/", ["footerColor"]),
    ...mapGetters({
      firsQuestionID: "survey/getFirstQuestionID",
      getAnswerByQuestionID: "answer/getAnswerByQuestionID"
    })
  },
  data(){
    return{
      isMobile: false
    }
  },
  created() {
    //when created call the action to get the survey with the id in the props.
    this.getSurveyByID(this.surveyID);
    this.setBackground("#eee");
    this.setFooterColor("#c01833");
  },
  methods: {
    ...mapActions("survey/", ["getSurveyByID"]),
    ...mapActions("answer/", ["deleteLastAnswer", "answerQuestion"]),
    ...mapActions("progress/", ["fillProgress", "setCurrentQuestion", "fillCurrentQuestionBacklog"]),
    ...mapActions("app/", ["setBackground", "setFooterColor"]),

    answeredQuestion(answer) {
      this.answerQuestion({
        answer,
        question: this.currentquestion
      });

      console.log(this.survey.nodes[answer.targetID].style);

      if(this.survey.nodes[answer.targetID].style == this.$data.nodeEnum.End){
        this.setCurrentQuestion({ question: null, nodes: this.survey.nodes });
      }else {
        this.setCurrentQuestion({ question: this.survey.nodes[answer.targetID], nodes: this.survey.nodes });
      }
      
      this.fillProgress({ addedDepth: 1, survey: this.survey });      
    },
    renderPreviousQuestion(question) {
      this.fillProgress({ addedDepth: -1, survey: this.survey });

      //get previous answer
      let prevAnswer = this.getAnswerByQuestionID(question);
      //check if previous question is a notification, if so go one more back.
      while(this.survey.nodes[prevAnswer.questionID].style == 5) {
        this.renderPreviousQuestion(this.survey.nodes[prevAnswer]);
      }
      //select the previouse question
      this.setCurrentQuestion({question: this.survey.nodes[prevAnswer.questionID], nodes: this.survey.nodes });
      this.deleteLastAnswer();
    },
    answeredMultiChoiceQuestion(answers) {
        this.answerQuestion({
          answer: answers,
          question: this.currentquestion
        });

        let questions = [];
        answers.forEach(answer => {
          if(answer.flows.length > 0){
            questions.push(this.survey.nodes[answer.flows[0].targetID])
          }
        });

        this.fillCurrentQuestionBacklog({questions, nodes: this.survey.nodes});

        this.fillProgress({addedDepth: 1, survey: this.survey});
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
        //check if the question to be printed is multi or single choice
        let currentAnswer = this.answer[i];

        if(Array.isArray(currentAnswer)) {
          //print relevant question based on first answer given
          
          pdfContents.push(this.pdfContentQuestion(currentAnswer[0].questionValue));

          //temp variable for text to put as answers to the question
          let tempAnswer = "";
          //multi choice answer
          currentAnswer.forEach(ans => {
              //add all answers to a string.
              tempAnswer += ans.answerValue;
              tempAnswer += " ";
          });
          pdfContents.push(this.pdfContentReply(tempAnswer));
          console.log(pdfContents);
        } else if(currentAnswer.answerValue != null) {
          //single choice answer
          pdfContents.push(this.pdfContentQuestion(this.answer[i].questionValue));
          pdfContents.push(this.pdfContentReply(this.answer[i].answerValue));
        } else {
          //no answer found, print error.
          pdfContents.push(this.pdfContentWarning(this.answer[i].questionValue));
          console.error("Error while printing to the PDF");
          console.error(this.answer[i]);
        }
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
  updated() {
    //only on the first ever update since this page
    if (this.currentquestion == null) {
      let tetsdatax = this.survey.nodes[this.firsQuestionID];
      let xxx = this.survey.nodes;
      this.setCurrentQuestion({ question: tetsdatax, nodes: xxx });
    }
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  watch: {
    progress: function(newValue, oldValue) {
      //watch for completion of survey, then print pdf
      if (newValue === 100) {
        this.printPDF();
        this.$router.push('/dashboard');
        this.setCurrentQuestion({ question: null, nodes: this.survey.nodes });
      }
    }
  },
  beforeDestroy() {
    this.setFooterColor("#fff");
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true });
    }


  }
};
</script>