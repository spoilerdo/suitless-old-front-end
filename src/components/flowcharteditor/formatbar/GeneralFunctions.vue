<template>
  <v-layout row justify-center>
    <v-form>
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
          auto-grow
          box
          color="primary"
          label="Description"
          rows="1"
        />
        <ServiceableFilePicker v-on:Base64="setFile($event)" v-on:Type="setType($event)"/>
      </v-layout>
      <v-layout align-center justify-center row>
        <v-btn color="primary" @click="prepareSaveFlowchart(form.title, form.description)">Save</v-btn>
        <v-btn color="primary" @click="setDialog(true)">Import</v-btn>
        <v-btn color="primary">Test</v-btn>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
import ServiceableFilePicker from "@/components/cdn/ServiceableFilePicker";

export default {
  components: {
    ServiceableFilePicker
  },
  data() {
    return {
      form: {
        title: null,
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
    prepareSaveFlowchart(name, description) {
      let flowchart = this.getFlowchart(name, description);

      this.uploadImage({
          file: this.image.file, 
          name, 
          type: this.image.type});

      this.saveFlowchart(flowchart).then(req => {
        if (req != undefined && req.module != null) {
          this.showNotification("Flowchart saved!");
        } else {
          this.showNotification("Error during flowchart save");
        }
      });
    },
    setFile(file) {
      this.image.file = file;
    },
    setType(type) {
      this.image.type = type;
    }
  }
};
</script>
