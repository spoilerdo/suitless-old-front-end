<template>
  <v-container fluid pa-0 ma-o>
    <v-layout align-center justify-center row pa-2>
      <ProgressBar ref="progressBar" />
    </v-layout>
    <v-layout align-center justify-center row ma-4 v-if="progress !== 100">
      <v-flex d-flex md8 xs12 v-if="survey.nodes != null && currentquestion != null">
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
        <Notification ref="surveyNotification" :timeVisible="0"/>
      </v-flex>
    </v-layout>
    <EndPage
      v-else
      :answers="answer"
      :question="currentquestion"
      :progress="progress"
      v-on:renderPreviousQuestion="renderPreviousQuestion"
      v-on:printPDF="generatePDF"
    />
    <v-layout align-center justify-center row pa-5>
      <v-flex d-flex md8 xs12 v-if="survey.nodes != null && currentquestion != null">
        <Info :question="currentquestion" v-if="!isMobile" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Question from "@/components/survey/Question.vue";
import ProgressBar from "@/components/survey/Progress.vue";
import Notification from "@/components/material/Notification.vue";
import MultipleChoice from "@/components/survey/MultipleChoice.vue";
import EndPage from "@/components/survey/endpage/EndPage.vue";
import Info from "@/components/survey/Info.vue";
import { mapState, mapGetters, mapActions } from "vuex";

/**
 * Returns the survey page, where the user can answere questions to fill in a survey.
 * @memberof view
 */
export default {
  props: ["surveyID"],
  components: {
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
      isMobile: false
    };
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
    ...mapActions("progress/", [
      "fillProgress",
      "setCurrentQuestion",
      "fillCurrentQuestionBacklog",
      "clearCurrentQuestionBacklog",
      "fillsubQuestionBackLog",
      "clearSubQuestionBackLog"
    ]),
    ...mapActions("app/", ["setBackground", "setFooterColor"]),

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
      while (this.survey.nodes[previousQuestionID].style == this.$data.Notification) {
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

    closeNotification(){
      if(this.$refs.surveyNotification != null){
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
      if(this.$refs.surveyNotification != null){
        if(val.message != null){
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
    this.setFooterColor("#fff");
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, { passive: true });
    }
  }
};
</script>