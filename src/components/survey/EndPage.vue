<template>
    <v-scale-transition>
        <v-card>
            <v-card-title primary-title class="grow mb-3">
                <v-layout align-center justify-center row>
                    thank you for filling out the survey!
                </v-layout>
            </v-card-title>

            <!-- list of implications -->
            <v-card-actions class="action-card">        
                <v-container fluid grid-list-sm>
                    <div justify-center align-center class="text-xs-center">
                        <h2> Details about your answers :  </h2>
                    </div>

                    <v-layout row wrap justify-center align-center>
                        <v-list>
                            <template text-xs-center v-for="answer in structuredAnswers">
                                <v-flex row wrap xs12 text-xs-center   :key="answer.answerValue" v-if="answer.answerImplication !== null">
                                    <h3>{{answer.questionValue}}</h3>
                                </v-flex>
                                   <v-alert
                                    :key="answer.answerValue"
                                    :value="true"
                                    :type="answer.answerImplicationLevel"
                                    v-if="answer.answerImplication !== null"
                                >
                                    {{answer.answerImplication}}
                                </v-alert>
                            </template>
                        </v-list>
                    </v-layout>
                </v-container>
            </v-card-actions>

            <!-- print pdf button -->
            <v-layout align-center justify-center row>
                <v-btn color="primary" @click="printPDF()">Print PDF</v-btn>
            </v-layout>
        </v-card>
    </v-scale-transition>
</template>

<script>
export default {
    props: {
        answers: {
            type: Array,
            required: true
        }
    },
    methods: {
        printPDF() {
            this.$emit('printPDF');
        }
    },
    data() {
        return {
            structuredAnswers: []
        }
    },
     mounted() {
        //make a clone without reference from this.answers, this way we can fix the prop value without breaking the structure which is used for PDF generation.
        let anse = JSON.parse(JSON.stringify(this.answers))

        anse.forEach(function(ans, index)  {
            if(Array.isArray(ans)) {
                //take the data of the embedded array from the splice
                let a = anse.splice(index, 1);
                //take the answer from the array.
                a[0].forEach(element => {
                    anse.splice(index, 0, element);
                });
            }
        });
        //push the fixed answers to the structuredanswers data.
        this.structuredAnswers = anse;
        console.log(this.structuredAnswers);
    }
}
</script>
