<template>
  <v-layout row justify-center>
    <v-form data-vv-scope="EdgeForm">
      <v-layout column>
        <h6 class="subheading">An answer for the question</h6>
        <v-textarea
          v-model="form.answer"
          auto-grow
          box
          color="primary"
          label="Answer"
          rows="1"
          v-validate="'required'"
          name="answer"
        />
        <span>{{ errors.first('answer') }}</span>
        <v-btn color="primary" @click="setFileDialog(true)">Select Image</v-btn>
        <ImplicationList
          v-bind:implications.sync="form.implications"
          v-bind:implicationColors.sync="implicationColorsList"
        />
      </v-layout>
      <v-layout align-center justify-center row>
        <v-btn color="primary" @click="prepareChangeEdge()">Apply</v-btn>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script>
import ImplicationList from "./ImplicationList.vue";
import { mapState, mapActions } from "vuex";

/**
 * View used for 'Edge' cells.
 * @memberof component.FlowchartForm
 */
export default {
  data() {
    return {
      form: {
        answer: null,
        imageName: "",
        implications: [
          {
            implication: null,
            implicationLevel: null
          }
        ]
      },
      implicationColorsList: ["#000"]
    };
  },
  components: {
    ImplicationList
  },
  computed: {
    ...mapState("flowcharteditor/", [
      "selectedCell",
      "formatBarType",
      "imageName"
    ])
  },
  methods: {
    ...mapActions("cdn/", ["setFileDialog"]),
    prepareChangeEdge() {
      this.$validator.validateAll("EdgeForm").then(valid => {
        if (valid) {
          //get the image name from the dialog and save it onto the edge

          if (this.form.imageName === "") {
            this.form.imageName = "DefaultEdgeImage";
          }

          let implicationColor = "#000";
          if (this.implicationColorsList.length === 1) {
            console.log(this.implicationColorsList);
            implicationColor = this.implicationColorsList[0];
          }

          this.changeEdge(
            this.form.answer,
            this.form.implications,
            implicationColor,
            this.form.imageName
          );

          //reset imageName because the image already has been used
          this.form = {
            answer: null,
            imageName: "",
            implications: [
              {
                implication: null,
                implicationLevel: null
              }
            ]
          }

          this.implicationColorsList = ["#000"];
        }
      });
    }
  },
  watch: {
    selectedCell: function(newValue) {
      if (
        newValue != null &&
        this.formatBarType == this.$data.nodeEnum.Edge &&
        newValue.lincData.length > 0
      ) {
        this.form.answer = newValue.value;
        /*this.form.implication = newValue.lincData.find(
          data => data.key === "implication"
        ).value;
        this.form.implicationLevel = newValue.lincData.find(
          data => data.key === "implicationLevel"
        ).value;
        */
      }
    },
    imageName: function(newVal) {
      this.form.imageName = newVal;
    }
  }
};
</script>
