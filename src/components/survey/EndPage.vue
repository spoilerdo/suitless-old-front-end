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
                            <template v-for="answer in answers">
                                 <v-alert
                                    :key="answer.answerValue"
                                    :value="true"
                                    :type="answer.answerImplicationLevel"
                                    v-if="answer.answerImplication !== null"
                                >
                                {{answer.answerValue}}
                                 </v-alert>

                                <v-divider :key="answer.answerValue" v-if="answer.answerImplication !== null" />
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
    }
}
</script>
