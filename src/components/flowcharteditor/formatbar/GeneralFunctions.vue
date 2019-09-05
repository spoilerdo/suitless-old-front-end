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
          @click="prepareSaveFlowchart()"
        >Save</v-btn>
        <v-btn id="btn_import_flowchart" color="primary" @click="setImportDialog(true)">Import</v-btn>
        <v-btn color="primary" @click="testFlowchart()">Test</v-btn>
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
        imageName: ""
      }
    };
  },
  computed: {
    ...mapState("flowcharteditor/", ["imageName"])
  },
  methods: {
    ...mapActions("flowcharteditor/", ["setImportDialog", "saveFlowchart", "setFlowchart"]),
    ...mapActions("cdn/", ["setFileDialog"]),
    prepareSaveFlowchart() {
      this.$validator.validateAll("GeneralForm").then(valid => {
        if (valid) {
          let lincData = [];
          if (this.form.imageName !== "") {
            lincData = [{
                key: "imageName",
                value: this.form.imageName
              }];
          } else {
            lincData = [{
              key: "imageName",
              value: "DefaultFlowchartImage"
            }]
          }
          let flowchart = this.getFlowchart(this.form.title, this.form.description, lincData);
          this.saveFlowchart(flowchart);
        }
      });
    },
    testFlowchart() {
      this.$validator.validateAll("GeneralForm").then(valid => {
        if(valid) {
          //get the flowchart and open a new survey page.
          let flowchart = this.getFlowchart(this.form.title, this.form.description, []);
          this.setFlowchart(JSON.parse(flowchart));
          //change the ENV to test, so that the draggable functionality activates
          localStorage.setItem("ENV", "TEST");
          let routerData = this.$router.resolve({path: "/survey/test"})
          window.open(routerData.href, '_blank');
        }
      })
    }
  },
  watch: {
    imageName: function(newVal) {
      this.form.imageName = newVal;
    }
  }
};
</script>
