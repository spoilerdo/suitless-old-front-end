<template>
  <v-card
    hover
    ripple
    :to="redirecturl"
    class="rouned-card flex xs5 md3"
    style="margin: 2% 2%; padding: 1%;"
  >
    <v-img :src="`http://ironsm4sh.nl:3303/cdn/${imagename}`" style="height: 100% !important;"></v-img>

    <div style="padding-top: 15px;">
      <p class="card-text">{{ text }}</p>
    </div>
  </v-card>
</template>

<style scoped>
.rouned-card {
  border-radius: 35px;
}

.card-text {
  font-size: 26px !important;
  text-align: center;
}

@media only screen and (max-width: 600px) {
  .card-text {
    font-size: 20px !important;
    text-align: center;
  }
}
</style>

<script>
export default {
  name: "ImageCard",
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
