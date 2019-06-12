<template>
  <v-scale-transition>
    <v-card class="card-height">
      <v-card-title primary-title class="grow mb-3">
        <v-layout align-center justify-center row>
          <h3 display-2>thank you for filling out the survey!</h3>
        </v-layout>
      </v-card-title>

      <v-card-text>
        <v-layout row wrap justify-center align-center fill-height>
          <v-list class="list-width" three-line>
            <template v-for="answers in structuredAnswers">
              <v-list-tile
                class="list-item-height"
                :key="answers[0].answerImplicationLevel"
              >
                <v-layout row wrap justify-center align-center fill-height>
                  <v-flex column xs4 offset-xs2>
                    <!-- detail buttons -->
                    <v-layout justify-start>
                      <v-btn
                        flat
                        icon
                        fab
                        color="secondary"
                        @click="showDetail(answers[0].answerImplicationLevel)"
                      >
                        <v-icon
                          large
                          v-if="implicationDetailStates[implicationTypes.indexOf(answers[0].answerImplicationLevel)] === false"
                        >mdi-chevron-down</v-icon>
                        <v-icon large else>mdi-chevron-up</v-icon>
                      </v-btn>
                      <!-- implication type name -->
                      <!-- get all the implication enum's keys who has an index of the index of the category + implicationTypes length. -->
                      <!-- you need the + length because the enum starts with the numbers and the half of the enum array is ALWAYS the implicationTypes length  -->
                      <h3>{{ Object.keys($data.implicationEnum)[implicationTypes.indexOf(answers[0].answerImplicationLevel) + implicationTypes.length] }}</h3>
                    </v-layout>
                  </v-flex>
                  <!-- implication percentage -->
                  <v-flex column xs2>
                    <v-progress-circular
                      :rotate="-90"
                      :size="100"
                      :width="15"
                      :value="answers.length/totalNumberAnswers*100"
                      :color="answers[0].answerImplicationLevel"
                    />
                  </v-flex>
                </v-layout>
                <!-- list of implication specific info -->
              </v-list-tile>
              <v-list-tile
                class="list-item-height"
                :key="answers[0].answerImplicationLevel+1"
                v-if="answers.length > 0"
                v-show="implicationDetailStates[implicationTypes.indexOf(answers[0].answerImplicationLevel)] === true"
              >
                <div>
                  <ImplicationList :answers="answers"/>
                </div>
              </v-list-tile>
            </template>
          </v-list>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <!-- print pdf button -->
        <v-layout align-center justify-center row>
          <v-btn class="primary" @click="printPDF()">Print PDF</v-btn>
        </v-layout>
        <v-layout align-center justify-center row>
          <v-btn class="secondary" to="/dashboard">Continue</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-scale-transition>
</template>

<style scoped>
.card-height {
  min-height: 50vh;
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

export default {
  props: {
    answers: {
      type: Array,
      required: true
    }
  },
  components: {
    ImplicationList
  },
  methods: {
    printPDF() {
      this.$emit("printPDF");
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
    console.log(Object.keys(this.$data.implicationEnum));

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

    anse.forEach(function(ans, index) {
      if (Array.isArray(ans)) {
        //take the data of the embedded array from the splice
        let a = anse.splice(index, 1);
        //take the answer from the array.
        a[0].forEach(element => {
          anse.splice(index, 0, element);
        });
      }

      //The answer doesn't contain an implication
      if (ans.answerImplicationLevel == null) {
        miscAnswers.push(ans);
      } else {
        //get the implicationTypes index trough the answer's implication
        let impIndex = implicationTypes.indexOf(ans.answerImplicationLevel);
        //because the implicationTypes index is ALWAYS the same as the index within answers
        //you can do the following to store the answer in the right category
        answers[impIndex].push(ans);
        //add up on the total answers that contain an implication
        totalAnswers++;
      }
    });

    //every implication category needs an boolean in order to hide/show the details
    let implicationStates = [];
    implicationTypes.forEach(type => {
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
