<template>
  <v-layout row justify-center>
    <v-form data-vv-scope="ChoiceForm" @submit.prevent>
      <GenericView
        ref="genericView"
        nameLabel="The name of the Question"
        nodeName="choice"
        @onChange="changeProps"
        @validated="checkValidation"
      />
      <v-layout align-center justify-center row>
        <v-btn color="primary" @click="prepareGenericChangeNode()">Apply</v-btn>
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
        name: null,
      },
      selected: null
    };
  },
  computed: {
    ...mapState("flowcharteditor/", ["selectedCell", "formatBarType"])
  },
  created() {
    this.selected = this.selectedCell;
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
      this.$refs.genericView.checkIfValid()
    },
    checkValidation(genericValid){
      this.$validator.validateAll("ChoiceForm").then(valid => {
        if (valid && genericValid) {
          this.genericChangeNode(this.form.nodeName, this.form.name);
        }
      });
    },
  },
  watch: {
    selectedCell: function(newValue) {
      if (
        newValue != null &&
        this.formatBarType == this.$data.nodeEnum.Choice &&
        newValue.lincData.length > 0
      ) {
        this.form.nodeName = newValue.value;
        this.form.name = newValue.lincData.filter(
          data => data.key === "choice"
        ).value;
      }
    },
    imageName: function(newVal) {
      this.form.imageName = newVal;
    }
  }
};
</script>