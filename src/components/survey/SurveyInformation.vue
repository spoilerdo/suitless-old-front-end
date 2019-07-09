<template>
    <v-scale-transition>
        <v-card class="card-size">
            <v-card-title primary-title class="grow mb-3">
                <v-layout align center justify-center row>
                    <h3 class="headline mb-0">{{ title }}</h3>
                </v-layout>
            </v-card-title>
            <v-card-actions class="card-action-size">
                <v-layout justify-center row>
                    <p>{{ description }}</p>
                </v-layout>
            </v-card-actions>
            <v-layout align-end justify-center row>
                <v-btn class="primary" @click="$emit('startSurvey')">Start survey</v-btn>
            </v-layout>
        </v-card>
    </v-scale-transition>
</template>

<style scoped>
.card-size{
    min-width: 60%;
    min-height: 50vh;
}
.card-action-size{
    min-height: 30vh;
}
</style>

<script>
/**
 * Returns an 'survey information' view used in the survey
 * @memberof component.Survey
 */
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
}
</script>