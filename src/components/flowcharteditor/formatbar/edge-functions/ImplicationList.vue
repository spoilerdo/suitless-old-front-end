<template>
  <div>
    <v-list class="list-height">
      <h6 v-if="implications.length <= 0" class="subheading">Add an implication:</h6>
      <template v-for="(implication, index) in implicationList">
        <v-card elevation-4 :key="index">
          <v-layout column pa-2 my-2>
            <h6 class="subheading">Implication: {{ index + 1 }}</h6>
            <v-textarea
              v-model="implication.implication"
              auto-grow
              box
              color="primary"
              label="Implication"
              rows="1"
              name="implication"
              counter="750"
              maxlength="750"
            />
            <h6 class="subheading">Select the implication level</h6>
            <v-layout align-center justify-center row>
              <v-btn
                v-for="(color, i) in colors"
                :key="i"
                flat
                icon
                :color="color"
                v-bind:class="{selectedColor: implicationColorsList.length > 0 && implicationColorsList[index] == theme[color]}"
                @click="setSelected($data.colorImplicationEnum[$data.colorImplicationEnum[color]], theme[color], index)"
              >
                <v-icon>mdi-checkbox-blank</v-icon>
              </v-btn>
            </v-layout>
            <v-layout justify-end row>
              <v-btn
                class="small-btn"
                icon
                round
                outline
                color="primary"
                @click="deleteImplication(index)"
              >
                <v-icon size="15">mdi-minus</v-icon>
              </v-btn>
            </v-layout>
          </v-layout>
        </v-card>
      </template>
    </v-list>
    <v-layout justify-end row>
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn icon round color="primary" v-on="on" @click="addImplication()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Add Implication</span>
      </v-tooltip>
    </v-layout>
  </div>
</template>

<style scoped>
.list-height {
  max-height: 320px;
  overflow-y: auto;
}
.small-btn {
  width: 15px;
  height: 15px;
  margin: 0;
}
.selectedColor {
  background-color: rgb(238, 238, 238);
}
</style>

<script>
import theme from "@/plugins/vuetify/theme";
import { getEnumValues } from "@/services/flowchartHelper";

/**
 * Returns a list containing the amount of implications this edge contains,
 * and also a possibility to edit them individually
 * @memberof component.FlowchartForm
 */
export default {
  props: {
    implications: {
      type: Array,
      required: true
    },
    implicationColors: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      implicationList: this.implications,
      implicationColorsList: this.implicationColors,
      theme,
      colors: []
    };
  },
  mounted() {
    this.colors = getEnumValues(this.$data.implicationColorEnum);
  },
  methods: {
    setSelected(selected, color, index) {
      this.implicationList[index].implicationLevel = selected;
      this.implicationColorsList[index] = color;
      this.$forceUpdate();
    },
    addImplication() {
      this.implicationList.push({
        implication: null,
        implicationLevel: this.$data.implicationEnum[5]
      });
      this.implicationColors.push(theme.default);
    },
    deleteImplication(index) {
      this.implicationList.splice(index, 1);
      this.implicationColors.splice(index, 1);
    }
  },
  watch: {
    implications: function(newVal) {
      this.implicationList = newVal;
    },
    implicationColors: function(newVal) {
      this.implicationColorsList = newVal;
    }
  }
};
</script>
