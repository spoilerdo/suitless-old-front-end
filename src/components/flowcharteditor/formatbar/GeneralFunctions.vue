<template>
  <v-layout row justify-center>
    <v-form data-vv-scope="GeneralForm" @submit.prevent>
      <v-layout column>
        <h5 class="headline">General flowchart information</h5>
        <v-text-field
          label="Flowchart Name"
          v-model="form.title"
          v-validate="'required'"
          name="moduleName"
        />
        <v-textarea
          v-model="form.description"
          v-validate="'required'"
          auto-grow
          box
          color="primary"
          label="Description"
          rows="1"
        />
        <v-btn color="primary" @click="setFileDialog(true)">Select Image</v-btn>
      </v-layout>
      <v-layout align-center justify-center row>
        <v-btn
          id="btn_save_flowchart"
          color="primary"
          @click="prepareSaveFlowchart(form.title, form.description, form.flowchartImageName)"
        >Save</v-btn>
        <v-btn id="btn_import_flowchart" color="primary" @click="setImportDialog(true)">Import</v-btn>
        <v-btn color="primary">Test</v-btn>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";

/**
 * View used for general action / no cells.
 * @memberof component.FlowchartForm
 */
export default {
  data() {
    return {
      form: {
        title: "",
        description: null,
        flowchartImageName: ""
      }
    };
  },
  computed: {
    ...mapState("flowcharteditor/", ["imageName"])
  },
  methods: {
    ...mapActions("flowcharteditor/", ["setImportDialog", "saveFlowchart"]),
    ...mapActions("cdn/", ["setFileDialog"]),
    prepareSaveFlowchart(name, description, flowchartImageName) {
      this.$validator.validateAll("GeneralForm").then(valid => {
        if (valid) {
          let lincData = [];
          if (flowchartImageName !== "") {
            lincData = [{
                key: "imageName",
                value: flowchartImageName
              }];
          } else {
            lincData = [{
              key: "imageName",
              value: "DefaultFlowchartImage"
            }]
          }
          let flowchart = this.getFlowchart(name, description, lincData);
          this.saveFlowchart(flowchart);
        }
      });
    }
  },
  watch: {
    imageName: function(newVal) {
      this.form.flowchartImageName = newVal;
    }
  }
};
</script>
