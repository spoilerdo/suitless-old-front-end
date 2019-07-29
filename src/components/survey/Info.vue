<template>
    <v-scale-transition>
        <v-card v-if="reason != null">
             <v-card-title primary-title class="grow mb-3">
                <v-layout align-center justify-center row>
                    <h3 class="mb-0">Info</h3>
                </v-layout>
            </v-card-title>
            <v-card-actions class="action-card">
                <v-layout align-center justify-center row>
                    {{reason}}
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-scale-transition>
</template>

<script>
/**
 * Returns an 'info' view used in the survey.
 * @memberof component.Survey
 */
export default {
    data() {
        return {
            reason: null
        }
    },
    props: ["question"],
    mounted() {
        this.reason = this.question.lincData.find(data => data.key === "reason").value || null;
    },
    watch: {
        question: function(newVal, oldVal) {
            //update new reason on question change, otherwise old reason will be displayed
            this.reason = this.question.lincData.find(data => data.key === "reason").value || null;
            console.log(this.reason);
        }
    }
}
</script>
