<template>
  <v-layout row justify-center>
    <v-form data-vv-scope="ModuleForm" @submit.prevent>
      <v-layout column>
        <GenericView
          ref="genericView"
          nameLabel="An answer for the Module"
          nodeName="module"
          lincDataName="module"
          @onChange="changeProps"
          @validated="checkValidation"
        />
      </v-layout>
      <v-layout align-center justify-center row>
        <v-btn color="primary" @click="prepareChangeEdge()">Apply</v-btn>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script>
import GenericView from "./genericView/GenericView";

export default {
  components: {
    GenericView
  },
  data() {
    return {
      form: {
        nodeName: null,
        name: null
      }
    };
  },
  methods: {
    changeProps(newForm) {
      this.form = newForm;
    },
    prepareChangeEdge() {
      if (this.$refs.genericView) {
        this.$refs.genericView.checkIfValid();
      } else {
        this.checkValidation(true);
      }
    },
    checkValidation(genricValid) {
      this.$validator.validateAll("ModuleForm").then(valid => {
        if (valid && genricValid) {
          this.changeModuleNode(this.form.nodeName, this.form.name);
        }
      });
    }
  }
};
</script>