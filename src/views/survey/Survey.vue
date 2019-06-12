<template>
  <v-container fluid pa-0 ma-o>
    <v-layout align-center justify-center row pa-5>
      <ProgressBar ref="progressBar"/>
    </v-layout>
    <v-layout align-center justify-center row ma-4 v-if="progress !== 100">
      <v-flex d-flex md8 xs12 v-if="survey.nodes != null && currentquestion != null">
        <!--currentquestion is an object not an integer-->
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
    <EndPage
      v-else
      :answers="answer"
      v-on:printPDF="printPDF"
    />
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
import EndPage from "@/components/survey/endpage/EndPage.vue";
import Info from "@/components/survey/Info.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

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
    ...mapState("progress/", ["currentquestion", "progress", "notification", "options"]),
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
    ...mapActions("progress/", ["fillProgress", "setCurrentQuestion", "fillCurrentQuestionBacklog", "clearCurrentQuestionBacklog", "fillsubQuestionBackLog", "clearSubQuestionBackLog"]),
    ...mapActions("app/", ["setBackground", "setFooterColor"]),

    answeredQuestion(answer) {
      this.answerQuestion({
        answer,
        question: this.currentquestion
      });

      let nextQuestion = this.survey.nodes[answer.targetID];
      
      this.setCurrentQuestion({ question: nextQuestion, nodes: this.survey.nodes });
      this.fillProgress({ addedDepth: 1, survey: this.survey });   
    },
    renderPreviousQuestion(question) {
      //get previous answer(s) and convert them to an array.
      let prevAnswer = this.getAnswerByQuestionID(question);

      if(!Array.isArray(prevAnswer)) {
        prevAnswer = Array.of(prevAnswer);
      } else {
        //make sure to clear the backlog so the flow of the survey doesnt mess up.
        this.clearCurrentQuestionBacklog();
        this.clearSubQuestionBackLog();
      }

      prevAnswer.forEach(prev => {
          //reset progress for each previous answer
          this.fillProgress({ addedDepth: -1, survey: this.survey });
      });

      let previousQuestionID = prevAnswer[0].questionID;

        //check if previous question is a notification, if so go one more back.
        while(this.survey.nodes[previousQuestionID].style == 5) {
          this.renderPreviousQuestion(this.survey.nodes[prevAnswer[0]]);
        }
        //select the previous question
        this.setCurrentQuestion({question: this.survey.nodes[previousQuestionID], nodes: this.survey.nodes });
        this.deleteLastAnswer();
    },
    answeredMultiChoiceQuestion({answers, questions}) {
      console.log(answers);
        //add answer to list of given answers.
        this.answerQuestion({
          answer: answers,
          question: this.currentquestion
        });

        //check if a flag is set for not looping non unique answers
        let shouldLoopNonUniqueSubQuestions = this.currentquestion.lincData.find(d => d.key === "loopsubQuestions");
        if(shouldLoopNonUniqueSubQuestions.value == "true") {
            console.log(answers);
            //create list of unique sub questions based on targetid and only add these to the backlog (skip first one it will be handled seperately)
            let uniqueList = [...new Set(answers.slice(1).map(i => i.flows[0].targetID))];
            uniqueList.forEach(nextQID => {
                  //make sure we do not get duplicates on the first item we sliced
                  if(nextQID !== answers[0].flows[0].targetID) {
                    this.fillsubQuestionBackLog(this.survey.nodes[nextQID]);
                  }
            });
        }else {     
            //loop through all answers (skip 1st again it will be handled seperately) and add them to the subquestionbakclog  
            answers.slice(1).forEach(ans => {
              if(ans.flows.length > 0) {
                this.fillsubQuestionBackLog(this.survey.nodes[ans.flows[0].targetID]);
              }
            });
        }
    
        let firstSubQuestion = null;
        if(answers[0].flows.length > 0) {
          firstSubQuestion = this.survey.nodes[answers[0].flows[0].targetID];
        }
        let backLogQuestion = null;
        if(questions.flows.length > 0) {
          backLogQuestion = this.survey.nodes[questions.flows[0].targetID];
          console.log(backLogQuestion);
        }


        //add the first question to come after finishing all multiple choice sub questions to the backlog.
        this.fillCurrentQuestionBacklog({firstSubQuestion: firstSubQuestion, backLogQuestion: backLogQuestion, nodes: this.survey.nodes});

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

          let implications = this.fillImplications(currentAnswer);

          implications.forEach(impl => {
            pdfContents.push(impl);
          });

        } else if(currentAnswer.answerValue != null) {
          //single choice answer
          pdfContents.push(this.pdfContentQuestion(this.answer[i].questionValue));
          pdfContents.push(this.pdfContentReply(this.answer[i].answerValue));
          let implications = this.fillImplications(Array.of(this.answer[i]));
          implications.forEach(impl => {
            pdfContents.push(impl);
          });
        }
      }
      return pdfContents;
    },
    fillImplications(flows) {
      let implicationContents = [];
      flows.forEach(flow => {
          switch(flow.answerImplicationLevel) {
            case "success" :
            implicationContents.push(this.pdfContentSuccess("Success : "));
            implicationContents.push(this.pdfContentSub(flow.answerImplication));
            implicationContents.push(this.pdfContentWhitespace());
            break;
          case "warning" :
            implicationContents.push(this.pdfContentWarning("Warning : "));
            implicationContents.push(this.pdfContentSub(flow.answerImplication));
            implicationContents.push(this.pdfContentWhitespace());
            break;
          case "info" :
            implicationContents.push(this.pdfContentInfo("Info : "));
            implicationContents.push(this.pdfContentSub(flow.answerImplication));
            implicationContents.push(this.pdfContentWhitespace());
            break;
          case "primary" : 
            implicationContents.push(this.pdfContentSub(flow.answerImplication));
            implicationContents.push(this.pdfContentWhitespace());
            break;
          default:
            break;
          }
      });

        return implicationContents;
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