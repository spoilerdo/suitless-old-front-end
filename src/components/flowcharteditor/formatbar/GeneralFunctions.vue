<template>
  <v-layout row justify-center>
    <v-form data-vv-scope="GeneralForm">
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
        <ServiceableFilePicker
          v-on:Base64="setFile($event)"
          v-on:Type="setType($event)"
        />
      </v-layout>
      <v-layout align-center justify-center row>
        <v-btn
          id="btn_save_flowchart"
          color="primary"
          @click="prepareSaveFlowchart(form.title, form.description)"
        >Save</v-btn>
        <v-btn id="btn_import_flowchart" color="primary" @click="setDialog(true)">Import</v-btn>
        <v-btn color="primary">Test</v-btn>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script>
import ServiceableFilePicker from "@/components/cdn/ServiceableFilePicker";
import { mapActions } from "vuex";

/**
 * View used for general action / no cells.
 * @memberof component.FlowchartForm
 */
export default {
  components: {
    ServiceableFilePicker
  },
  data() {
    return {
      form: {
        title: "",
        description: null
      },
      image: {
        file: "",
        type: ""
      }
    };
  },
  methods: {
    ...mapActions("flowcharteditor/", ["setDialog", "saveFlowchart"]),
    ...mapActions("cdn/", ["uploadImage"]),
    setFile(file) {
      this.image.file = file;
    },
    setType(type) {
      this.image.type = type;
    },
    prepareSaveFlowchart(name, description) {
      this.$validator.validateAll("GeneralForm").then(valid => {
        if (valid) {
          let flowchart = this.getFlowchart(name, description);
          this.saveFlowchart(flowchart);

          this.uploadImage({ file: this.image.file, name: this.form.title, type: this.image.type})
        }
      });
    }
  }
};
</script>
