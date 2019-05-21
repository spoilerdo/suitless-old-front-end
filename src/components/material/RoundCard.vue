<template>
  <v-flex pa-3 :class="cardWidth">
    <v-card
      hover
      ripple
      :to="redirecturl"
      class="rouned-card flex surveycard"
      :style="`display: flex; flex-direction: ${direction};`"
    >
      <v-card-media>
        <v-layout align-space-around justify-space-between column pa-3>
          <div>
            <v-img :src="require(`@/assets/img/illustrations/${imagename}`)" :width=imageWidth></v-img>
          </div>
        </v-layout>
      </v-card-media>

      <v-card-title primary-title>
        <v-layout align-center justify-center>
          <h3 class="headline mb-0">{{ text }}</h3>
        </v-layout>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<style scoped>
.rouned-card {
  border-radius: 35px;
}
</style>

<script>
export default {
  name: "RoundCard",
  props: {
    redirecturl: String,
    imagename: String,
    text: String,
    cardWidth: String,
    imageSize: String,
    imageWidth: String,
    imageHeight: String,
    direction: String
  }
};
</script>
