<template>
  <v-layout row justify-center>
    <v-form @submit.prevent>
      <v-layout column>
        <GenericView
          v-if="this.editable"
          ref="genericView"
          nameLabel="An answer for the question"
          nodeName="edge"
          lincDataName="answer"
          @onChange="changeProps"
          @validated="checkValidation"
        />
        <v-btn v-if="this.editable" color="primary" @click="setFileDialog(true)">Select Image</v-btn>
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
import GenericView from "../genericView/GenericView";
import { createImplicationArray } from "@/services/flowchartHelper";
import theme from "@/plugins/vuetify/theme";
import { mapState, mapActions } from "vuex";

/**
 * View used for 'Edge' cells.
 * @memberof component.FlowchartForm
 */
export default {
  components: {
    ImplicationList,
    GenericView
  },
  computed: {
    ...mapState("flowcharteditor/", [
      "selectedCell",
      "formatBarType",
      "imageName"
    ])
  },
  data() {
    return {
      form: {
        edgeNode: "",
        answer: "",
        imageName: "",
        implications: [
          {
            implication: null,
            implicationLevel: ""
          }
        ]
      },
      editable: true,
      implicationColorsList: [],
      selected: null
    };
  },
  created() {
    this.implicationColorsList.push(theme.default);
    this.selected = this.selectedCell;
  },
  methods: {
    ...mapActions("cdn/", ["setFileDialog"]),
    changeProps(newForm) {
      this.form.edgeNode = newForm.nodeName;
      this.form.answer = newForm.name;
    },
    prepareChangeEdge() {
      if (this.$refs.genericView) {
        this.$refs.genericView.checkIfValid();
      } else {
        this.checkValidation(true);
      }
    },
    checkValidation(genericValid) {
      if (genericValid) {
        //get the image name from the dialog and save it onto the edge
        if (this.form.imageName === "") {
          this.form.imageName = "DefaultEdgeImage";
        }

        let implicationColor = theme.default;
        if (this.implicationColorsList.length === 1) {
          implicationColor = this.implicationColorsList[0];
        }

        this.changeEdge(
          this.form.edgeNode,
          this.form.answer,
          this.form.implications,
          implicationColor,
          this.form.imageName
        );

        this.form.imageName = "";
        this.form.implications = [];

        this.implicationColorsList = [theme.default];
      }
    }
  },
  watch: {
    selectedCell: function(newValue) {
      this.editable = newValue.editable;
      if (
        newValue &&
        this.formatBarType == this.$data.nodeEnum.Edge &&
        newValue.lincData
      ) {
        if(newValue.lincData.find(data => data.key == "answer")){
          this.form.answer = newValue.lincData.find(data => data.key == "answer").value;
        }else{
          this.form.answer = null;
        }

        let implicationArray = createImplicationArray(newValue);

        this.form.implications = implicationArray.implicationsObject;
        this.implicationColorsList = implicationArray.implicationColorsList;
      }
    },
    imageName: function(newVal) {
      this.form.imageName = newVal;
    }
  }
};
</script>
