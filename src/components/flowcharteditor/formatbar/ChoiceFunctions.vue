<template>
  <v-layout row justify-center>
    <v-form data-vv-scope="ChoiceForm">
      <GenericView nameLabel="The name of the Question" @onChange="changeProps" />
      <v-layout align-center justify-center row>
        <ServiceableFilePicker v-on:Base64="setFile($event)" v-on:Type="setType($event)" />
      </v-layout>
      <v-layout align-center justify-center row>
        <v-btn color="primary" @click="genericChangeNode(form.nodeName, form.name)">Apply</v-btn>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script>
import ServiceableFilePicker from "@/components/cdn/ServiceableFilePicker";
import GenericView from "./genericView/GenericView";
import { mapState, mapActions } from "vuex";

/**
 * View used for 'Choice' cells.
 * @memberof component.FlowchartForm
 */
export default {
  components: {
    GenericView,
    ServiceableFilePicker
  },
  data() {
    return {
      form: {
        nodeName: null,
        name: null
      },
      image: {
        file: "",
        type: ""
      }
    };
  },
  computed: {
    ...mapState("flowcharteditor/", ["selectedCell", "formatBarType"])
  },
  methods: {
    ...mapActions("cdn/", ["uploadImage"]),
    setFile(file) {
      this.image.file = file;
    },
    setTYpe(type) {
      this.image.type = type;
    },
    changeProps(newForm) {
      this.form = newForm;
    },
    prepareGenericChangeNode() {
      this.$validator.validateAll("ChoiceForm").then(valid => {
        if (valid) {
          this.genericChangeNode(this.form.nodeName, this.form.name);

          this.uploadImage({
            file: this.image.file,
            name: this.form.nodeName + this.selectedCell.id,
            type: this.image.type
          });
        }
      });
    }
  },
  watch: {
    selectedCell: function(newValue) {
      if (
        newValue != null &&
        this.formatBarType == this.$data.nodeEnum.Choice &&
        newValue.lincData.length > 0
      ) {
        this.form.nodeName = newValue.value;
        this.form.name = newValue.lincData.find(
          data => data.key === "choice"
        ).value;
      }
    }
  }
};
</script>