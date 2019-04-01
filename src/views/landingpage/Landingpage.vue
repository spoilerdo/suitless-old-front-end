<style>
.landingContainer {
    height: 85vh;
    position: relative;
}

body {
    overflow:hidden;
    overflow: -moz-scrollbars-none;
}
</style>

<template>
    <v-container fluid pa-0 ma-0>
        <Animatedbackground/>

        <v-layout align-center justify-center class="landingContainer" row wrap fill-height >
                <v-flex xs12 sm6 md5>
                    <v-img
                    :src=ehvLogo
                    aspect-ratio="1"
                    contain
                    max-height="300"
                    />
                </v-flex>
                <v-flex xs12 sm6 md5>
                    <div class="display-2 text-xs-center white--text pb-3">make your company legally ready</div>
                    <div class="text-xs-center">
                    <v-btn class="primary" large>Start</v-btn>
                    </div>
                </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Animatedbackground from '@/components/background/Animatedbackground';

    export default {
        name: 'landingPage',
        data: function() {
            return {
                ehvLogo: require("@/assets/img/logoehvlinc.png")
            }
        },
        components: {
            Animatedbackground
        }
    } 
</script>