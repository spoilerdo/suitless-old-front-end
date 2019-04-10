<template>
    <v-flex pa-3 xs6 md12>
        <v-card hover ripple :to="redirecturl" class="rouned-card">
            <v-card-media>
                <v-layout align-space-around justify-space-between column fill-height pa-3>
                <v-img :src="require(`@/assets/img/illustrations/${imagename}`)" width="100%"></v-img>
                </v-layout>
            </v-card-media>

            <v-card-title primary-title>
                <v-layout align-center justify-center column>
                <h3 class="headline mb-0" >{{ text }}</h3>
                </v-layout>
            </v-card-title>
        </v-card>
    </v-flex>
</template>

<script>
export default {
    name: "RecommendedSurveyCard",
    props: {
        redirecturl: String,
        imagename: String,
        text: String
    }
}
</script>
