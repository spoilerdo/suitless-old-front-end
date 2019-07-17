<template>
  <v-card
    hover
    ripple
    max-width="400px"
    max-height="400px"
    :to="redirecturl"
    class="rouned-card"
    style="padding: 2%; margin:2%; flex-basis: 100%;"
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
  .rouned-card {
    max-width: 300px !important;
    max-height: 300px !important;
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
 */
export default {
  name: "ImageCard",
  props: {
    redirecturl: String,
    imagename: String,
    text: String
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
