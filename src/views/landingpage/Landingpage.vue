<style scoped>
.particles {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, #30002a 0%, #434343 74%);
}
.landingContainer {
    height: 85vh;
    position: relative;
}
</style>


<template>
    <v-container fluid pa-0 ma-0>
        <vue-particles
        class="particles"
        color="#fff"
        :particleOpacity="0.7"
        :particlesNumber="50"
        shapeType="polygon"
        :particleSize="4"
        :lineLinked="false"
        :hoverEffect="false"
        :clickEffect="false"
        :moveSpeed="2">
        </vue-particles>

        <v-layout align-center justify-center class="landingContainer" row wrap fill-height >
                <v-flex xs12 md3>
                    <v-img
                    :src=ehvLogo
                    aspect-ratio="1"
                    contain
                    max-height="300"
                    />
                </v-flex>
                <v-flex xs12 md3>
                    <div class="display-2 text-xs-center white--text pb-3">make your company legally ready</div>
                    <div class="text-xs-center">
                    <v-btn class="primary" large>Start</v-btn>
                    </div>
                </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: 'landingPage',
        data: function() {
            return {
                ehvLogo: require("@/assets/logoehvlinc.png")
            }
        },
        mounted() {
            
        }
    } 
</script>