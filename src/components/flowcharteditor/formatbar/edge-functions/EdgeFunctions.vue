<template>
  <v-layout row justify-center>
    <v-form data-vv-scope="EdgeForm" @submit.prevent>
      <v-layout column>
        <GenericView
          v-if="selected != null"
          nameLabel="An answer for the question"
          nodeName="edge"
          @onChange="changeProps"
        />
        <v-btn v-if="selected != null" color="primary" @click="setFileDialog(true)">Select Image</v-btn>
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
        edgeNode: null,
        answer: null,
        imageName: "",
        implications: [
          {
            implication: null,
            implicationLevel: "default"
          }
        ]
      },
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
      this.$validator.validateAll("EdgeForm").then(valid => {
        if (valid) {
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

          this.implicationColorsList = [theme.default];
        }
      });
    }
  },
  watch: {
    selectedCell: function(newValue) {
      if (
        newValue &&
        this.formatBarType == this.$data.nodeEnum.Edge &&
        newValue.lincData.length > 0
      ) {
        this.selected = newValue;

        this.form.answer = newValue.lincData.find(
          data => data.key == "answer"
        ).value;
        
        let imp = newValue.lincData
          .filter(data => data.key == "implication")
          .map(el => el.value);

        let impLvl = newValue.lincData
          .filter(data => data.key == "implicationLevel")
          .map(el => el.value);

        let implicationsObject = [];
        if (imp.length > 0 && impLvl.length > 0) {
          imp.forEach((implication, index) => {
            implicationsObject.push({
              implication: implication,
              implicationLevel: impLvl[index]
            });
          });
          this.implicationColorsList = impLvl.map(el => theme[el]);
        } else {
          implicationsObject = [
            { implication: null, implicationLevel: "default" }
          ];
        }
        this.form.implications = implicationsObject;
      } else {
        this.selected = null;
      }
    },
    imageName: function(newVal) {
      this.form.imageName = newVal;
    }
  }
};
</script>
