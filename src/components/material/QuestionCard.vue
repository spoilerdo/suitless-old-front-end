<template>
  <v-card
    color
    class="questionCard"
    elevation-4
    max-width="400px"
    max-height="400px"
    v-bind:class="{selectedCard: selected }"
    style="padding: 2%; flex-basis: 100%;"
    @click="onSelect()"
  >
    <v-img
      v-if="image !== undefined"
      :src="image"
      max-height="90px"
      contain
    ></v-img>

    <div style="padding-top: 15px;">
      <p class="card-text">{{ text }}</p>
    </div>
  </v-card>
</template>

<style scoped>
.questionCard {
  color: rgba(0, 0, 0, 0.6);
  border-top: 4px solid #e5e5e5;
  border-bottom: 4px solid #e5e5e5;
  border-left: 2px solid #e5e5e5;
  border-right: 2px solid #e5e5e5;
}
.selectedCard {
  background-color: rgba(194, 52, 76, 0.6);
  border-color: rgba(192, 24, 51, 0.6);
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
 * Returns a question card.
 * @memberof component.Material
 * @property {String} text
 * @property {String} image
 * @property {Object} answer
 */
export default {
  props: {
    text: String,
    answer: {
      type: Object
    }
  },
  data() {
    return {
      selected: false,
      image: `${CDN_URL}/${this.answer.imageName}`
    };
  },
  methods: {
    onSelect() {
      this.$emit("selectedAnswer", this.answer);
    },
    setSelected(selected) {
      this.selected = selected;
    }
  }
};
</script>
