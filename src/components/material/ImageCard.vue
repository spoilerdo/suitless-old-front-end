<template>
  <v-card
    hover
    ripple
    :to="redirecturl"
    class="rouned-card flex xs5 md3"
    style="margin: 2% 2%; padding: 1%;"
  >
    <v-img :src="image" @error="imageLoadError"></v-img>

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
import { CDN_URL } from "@/store/generalconstants";
/**
 * Returns a card containing an image
 * @memberof component.Material
 * @property {String} redirecturl
 * @property {String} imagename
 * @property {String} text
 * @property {String} cardWidth
 * @property {String} imageSize
 * @property {String} imageWidth
 * @property {String} imageHeight
 * @property {String} direction
 */
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
  },
  data() {
    return {
      image: `${CDN_URL}/${this.imagename}`,
    }
  },
  methods: {
    imageLoadError(){
      this.image = require("@/assets/img/image-placeholder.svg");
    }
  }
};
</script>
