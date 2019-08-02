<template>
  <v-scale-transition>
    <v-card class="card-height">
      <v-card-title primary-title class="grow mb-3">
        <v-layout align-center justify-center row>
          <h3 display-2>Thank you for filling out the survey!</h3>
        </v-layout>
      </v-card-title>

      <v-card-text>
        <v-layout row wrap justify-center align-center fill-height>
          <v-list class="list-width" three-line id="advise">
            <template v-for="answers in structuredAnswers">
              <v-list-tile class="list-item-height" :key="answers[0].implicationLevel">
                <v-layout row wrap justify-center align-center fill-height>
                  <v-flex column xs4 offset-xs2>
                    <!-- detail buttons -->
                    <v-layout justify-start>
                      <v-btn
                        flat
                        icon
                        fab
                        color="secondary"
                        @click="showDetail(answers[0].implicationLevel)"
                      >
                        <v-icon
                          large
                          v-if="implicationDetailStates[implicationTypes.indexOf(answers[0].implicationLevel)] === false"
                        >mdi-chevron-down</v-icon>
                        <v-icon large else>mdi-chevron-up</v-icon>
                      </v-btn>
                      <!-- implication type name -->
                      <!-- get all the implication enum's keys who has an index of the index of the category + implicationTypes length. -->
                      <!-- you need the + length because the enum starts with the numbers and the half of the enum array is ALWAYS the implicationTypes length  -->
                      <h3>{{ Object.keys($data.implicationEnum)[implicationTypes.indexOf(answers[0].implicationLevel) + implicationTypes.length] }}</h3>
                    </v-layout>
                  </v-flex>
                  <!-- implication percentage -->
                  <v-flex column xs2>
                    <v-progress-circular
                      :rotate="-90"
                      :size="100"
                      :width="15"
                      :value="answers.length/totalNumberAnswers*100"
                      :color="answers[0].implicationLevel"
                    />
                  </v-flex>
                </v-layout>
                <!-- list of implication specific info -->
              </v-list-tile>
              <v-list-tile
                class="list-item-height"
                :key="answers[0].implicationLevel+1"
                v-if="answers.length > 0"
                v-show="implicationDetailStates[implicationTypes.indexOf(answers[0].implicationLevel)] === true"
              >
                <div>
                  <ImplicationList :answers="answers" />
                </div>
              </v-list-tile>
            </template>
          </v-list>
        </v-layout>
        <ArrowControls
          v-on:previousButtonClick="$emit('renderPreviousQuestion', question)"
          :progress="progress"
        />
      </v-card-text>

      <v-card-actions>
        <!-- print pdf button -->
        <v-flex xs10 offset-xs1>
          <v-layout align-center justify-center row>
            <v-btn large class="primary" @click="printPDF()">Click here to print your report</v-btn>
          </v-layout>
        </v-flex>
        <v-flex md-4>
          <v-layout align-end justify-end row>
            <v-btn large class="secondary" @click="closeSurvey()">Continue</v-btn>
          </v-layout>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-scale-transition>
</template>

<style scoped>
.card-height {
  min-height: 50vh;
  margin-bottom: 60px;
}
.list-item-height {
  margin-top: 30px;
}
.list-width {
  width: 100%;
}
</style>

<script>
import ImplicationList from "@/components/survey/endpage/ImplicationList";
import ArrowControls from "@/components/survey/ArrowControls.vue";

/**
 * Returns an 'endpage' view used after the survey.
 * @memberof component.Survey
 */
export default {
  props: {
    answers: {
      type: Array,
      required: true
    },
    question: {
      type: Object,
      required: true
    },
    progress: Number
  },
  components: {
    ImplicationList,
    ArrowControls
  },
  methods: {
    printPDF() {
      this.$emit("printPDF");
    },
    closeSurvey() {
      this.$emit("closeSurvey");
    },
    showDetail(implicationLevel) {
      let implicationTypes = this.implicationTypes;
      let currentState = this.implicationDetailStates[
        implicationTypes.indexOf(implicationLevel)
      ];
      this.implicationDetailStates[
        implicationTypes.indexOf(implicationLevel)
      ] = !currentState;
      this.$forceUpdate();
    }
  },
  data() {
    return {
      structuredAnswers: [],
      implicationTypes: [],
      implicationDetailStates: [],
      totalNumberAnswers: 0,
      options: {
        anchors: ["Endpage", "SurveyInfo"]
      }
    };
  },
  mounted() {
    //make a clone without reference from this.answers, this way we can fix the prop value without breaking the structure which is used for PDF generation.
    let anse = JSON.parse(JSON.stringify(this.answers));

    //get all the implications and push them in an array
    //also make sub arrays in the answers array in order to sort every answer in the implication categories
    let implicationTypes = [];
    let obj = this.$data.implicationEnum;
    let answers = this.structuredAnswers;
    for (let key in obj) {
      //when you reach the numbers part of the implication enum array
      //stop looping because you got all the enums you want
      if (isNaN(key)) {
        break;
      } else {
        implicationTypes.push(obj[key]);
        answers.push([]);
      }
    }

    //this array will collect all the answers that dont have an implication
    let miscAnswers = [];

    //store the totalAnswers that have an implication in order to calculate the percentage implication for every category
    let totalAnswers = 0;

    anse.forEach(ans => {
      if (Array.isArray(ans)) {
        ans.forEach(a => {
          //get every answer and put it into the anse array
          let index = anse.indexOf(a);
          anse.splice(index, 1);
          anse.push(a);
        });
      }

      //The answer doesn't contain an implication
      if (!ans.implications) {
        miscAnswers.push(ans);
      } else {
        //The answer does contian an implication
        //for each implication get the implicationLevel's index
        ans.implications.forEach(implication => {
          if (implication.implication) {
            let impIndex = implicationTypes.indexOf(
              implication.implicationLevel
            );
            //because the implicationTypes index is ALWAYS the same as the index within answers
            //you can do the following to store the answer in the right category
            answers[impIndex].push(implication);
            //add up on the total answers that contain an implication
            totalAnswers++;
          }
        });
      }
    });

    //every implication category needs an boolean in order to hide/show the details
    let implicationStates = [];
    implicationTypes.forEach(() => {
      implicationStates.push(false);
    });

    //clean all the empty arrays
    answers.forEach(categorie => {
      if (categorie.length <= 0) {
        answers = answers.filter(function(cat) {
          return cat !== categorie;
        });
      }
    });

    //push the fixed answers to the structuredanswers data.
    this.structuredAnswers = answers;
    //push the total answers number
    this.totalNumberAnswers = totalAnswers;
    //push the all the state of the detail from every category
    this.implicationDetailStates = implicationStates;
    //store every implication type
    this.implicationTypes = implicationTypes;
  }
};
</script>
