<template>
  <v-card
    color
    hover
    ripple
    elevation-4
    class="action-card"
    @click="onClickAction()"
    v-bind:class="{selectionCardClicked: selected, selectionCard: selection, rounedCard: rounded}"
  >
    <v-card-media>
      <v-layout align-space-around justify-space-between column pt-3>
        <v-img v-if="image !== undefined" :src="image" v-bind:class="{cardMediaImgSelected: selection, cardMediaImg: rounded}" contain></v-img>
      </v-layout>
    </v-card-media>

    <v-card-title primary-title>
      <v-layout align-center justify-center>
        <h3 class="headline mb-0">{{ text }}</h3>
      </v-layout>
    </v-card-title>
  </v-card>
</template>

<style scoped>
.action-card {
  max-width: 400px;
  max-height: 400px;
  /*Do you need these styles?*/
  padding: 2%;
  margin: 2%;
  flex-basis: 100%;
}
.selectionCard {
  color: rgba(0, 0, 0, 0.6);
  border-top: 4px solid #e5e5e5;
  border-bottom: 4px solid #e5e5e5;
  border-left: 2px solid #e5e5e5;
  border-right: 2px solid #e5e5e5;
}
.selectionCardClicked {
  background-color: rgba(194, 52, 76, 0.6);
  border-color: rgba(192, 24, 51, 0.6);
}
.rounedCard {
  border-radius: 35px;
}
.cardMediaImgSelected {
  max-height: 90px;
}
.cardMediaImg {
  max-height: 250px;
}
@media only screen and (max-width: 600px) {
  /*Do you need this class?*/
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
 * Used if you want the card element of vuetify
 * @memberof component.Material
 * @property {String} text
 * @property {Object | String} parameter
 * @property {Boolean} selection
 * @property {Boolean} rounded 
 */
export default {
  props: {
    text: String,
    parameter: Object | String,
    imageName: String,
    selection: {
        type: Boolean,
        default: false
    },
    rounded: {
        type: Boolean,
        default: false
    }
  },
  data() {
    return {
      selected: false,
      image: `${CDN_URL}/${this.imageName}`
    };
  },
  methods: {
    onClickAction() {
      this.$emit("action", this.parameter);
    },
    setSelected(selected) {
      if (this.selection) {
        this.selected = selected;
      }
    },
    toggle(){
      if(this.selection){
        this.selected = !this.selected;
      }
    }
  }
};
</script>
