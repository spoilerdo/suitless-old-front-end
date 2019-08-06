<template>
  <v-layout row justify-center>
    <v-form data-vv-scope="EdgeForm" @submit.prevent>
      <v-layout column>
        <GenericView nameLabel="An answer for the question" @onChange="changeProps" />
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
import GenericView from "../genericView/GenericView";
import theme from "@/plugins/vuetify/theme";
import { mapState, mapActions } from "vuex";

/**
 * View used for 'Edge' cells.
 * @memberof component.FlowchartForm
 */
export default {
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
      implicationColorsList: []
    };
  },
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
  created() {
    this.implicationColorsList.push(theme.default);
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
      //console.log(newValue);
      if (newValue && this.formatBarType == this.$data.nodeEnum.Edge && newValue.lincData.length > 0) {
        this.form.answer = newValue.lincData.find(
          data => data.key == "answer"
        ).value;
        let imp = newValue.lincData.filter(data => data.key == "implication")
          .map(el => el.value);
        let impLvl = newValue.lincData.filter(data => data.key == "implicationLevel")
          .map(el => el.value);
        let implicationsObject = [{ implication: null, implicationLevel: "default" }];
        if (imp.length > 0 && impLvl.length > 0) {
          imp.forEach((implication, index) => {
            implicationsObject.push({
              implication: implication,
              implicationLevel: impLvl[index]
            });
          });
          this.implicationColorsList = impLvl.map(el => theme[el]);
        }
        this.form.implications = implicationsObject;
      }
    },
    imageName: function(newVal) {
      this.form.imageName = newVal;
    }
  }
};
</script>
