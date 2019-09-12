<template>
  <div>
    <!-- All the questions and multi choice -->
    <v-layout
      align-start
      justify-center
      row
      v-if="progress !== 100 && survey.nodes != null && surveyStarted && currentquestion != null"
    >
      <v-flex xs11 sm7 md7 my-2>
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
      <Info
        :reasons="getReasonsArray(currentquestion)"
        v-if="!isMobile && currentquestion.style != $data.nodeEnum.Notification"
      />
    </v-layout>
    <v-layout
      align-center
      justify-center
      row
      v-if="progress !== 100 && survey.nodes != null && surveyStarted && currentquestion != null"
    >
      <!-- All the notifications -->
      <SurveyInformation
        v-if="currentquestion.style == $data.nodeEnum.Notification"
        :title="getNotifyTitle()"
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
  </div>
</template>

<script>
import Question from "@/components/survey/question/Question.vue";
import Notification from "@/components/material/Notification.vue";
import MultipleChoice from "@/components/survey/MultipleChoice.vue";
import Info from "@/components/survey/Info.vue";
import EndPage from "@/components/survey/endpage/EndPage.vue";

import { getReasonsArray } from "@/services/flowchartHelper";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {
    Question,
    Notification,
    MultipleChoice,
    Info,
    EndPage
  },
  computed: {
    ...mapState("survey/", {
      survey: state => state.survey
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
  props: {
    isMobile: {
      type: Boolean,
      required: true
    },
    surveyStarted: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      getReasonsArray: getReasonsArray
    };
  },
  methods: {
    ...mapActions("survey/", ["deleteChosenSurvey"]),
    ...mapActions("answer/", [
      "answerQuestion",
      "deleteLastAnswer",
      "clearAnswers"
    ]),
    ...mapActions("progress/", [
      "fillProgress",
      "setCurrentQuestion",
      "clearCurrentQuestionBacklog",
      "clearSubQuestionBackLog",
      "fillsubQuestionBackLog",
      "fillCurrentQuestionBacklog",
      "clearProgress"
    ]),

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
      //console.log(prevAnswer);

      if (!Array.isArray(prevAnswer)) {
        prevAnswer = Array.of(prevAnswer);
      } else {
        //make sure to clear the backlog so the flow of the survey doesnt mess up.
        this.clearCurrentQuestionBacklog();
        this.clearSubQuestionBackLog();
      }

      let previousQuestionID = prevAnswer[0].questionID;

      //check if previous question is a notification, if so go one more back.
      if (
        this.survey.nodes[previousQuestionID].style ==
        this.$data.nodeEnum.Notification
      ) {
        this.renderPreviousQuestion(
          this.survey.nodes[prevAnswer[0].questionID]
        );
      } else {
        //select the previous question
        this.setCurrentQuestion({
          question: this.survey.nodes[previousQuestionID],
          nodes: this.survey.nodes
        });
      }
      this.deleteLastAnswer();

      prevAnswer.forEach(() => {
        //reset progress for each previous answer
        this.fillProgress({ addedDepth: -1, survey: this.survey });
      });
    },

    answeredMultiChoiceQuestion({ answers, q }) {
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

      let firstSubQuestion = null;
      let subquestions = answers.filter(answer => answer.flows.length > 0);
      if (subquestions.lenght > 0) {
        firstSubQuestion = this.survey.nodes[subquestions[0].flows[0].targetID];
      }
      if (shouldLoopNonUniqueSubQuestions.value == "false") {
        //create list of unique sub questions based on targetid and only add these to the backlog (skip first one it will be handled seperately)
        subquestions = subquestions.slice(1);
        let uniqueList = [
          ...new Set(subquestions.map(i => i.flows[0].targetID))
        ];
        uniqueList.forEach(nextQID => {
          //make sure we do not get duplicates on the first item we sliced
          if (nextQID !== answers[0].flows[0].targetID) {
            this.fillsubQuestionBackLog(this.survey.nodes[nextQID]);
          }
        });
      } else {
        //loop through all answers (skip 1st again it will be handled seperately) and add them to the subquestionbakclog
        subquestions.slice(1).forEach(ans => {
          if (ans.flows.length > 0) {
            this.fillsubQuestionBackLog(
              this.survey.nodes[ans.flows[0].targetID]
            );
          }
        });
      }

      let backLogQuestion = null;
      if (q.flows.length > 0) {
        backLogQuestion = this.survey.nodes[q.flows[0].targetID];
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

    getNotify() {
      return this.currentquestion.lincData.find(data => data.key === "notify")
        .value;
    },

    getNotifyTitle() {
      return this.currentquestion.lincData.find(data => data.key === "title")
        .value;
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

      if(localStorage.getItem("ENV") === "TEST"){
        window.close();
      } else {
        //To dashboard or the login page but this is not shure yet
        this.$router.push("/dashboard");
      }
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
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      "Do you really want to leave? You are still working on the survey!"
    );
    if (answer) {
      next();
      this.closeSurvey();
    } else {
      next(false);
    }
  }
};
</script>