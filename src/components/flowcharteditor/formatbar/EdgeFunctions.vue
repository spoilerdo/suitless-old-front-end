<template>
  <v-layout row justify-center>
    <v-form data-vv-scope="EdgeForm">
      <v-layout column>
        <h6 class="subheading">An answer for the question</h6>
        <v-textarea
          v-model="form.answer"
          auto-grow
          box
          color="primary"
          label="Answer"
          rows="1"
          v-validate="'required'"
          name="answer"
        />
        <span>{{ errors.first('answer') }}</span>
        <h6 class="subheading">Implication of the answer</h6>
        <v-textarea
          v-model="form.implication"
          auto-grow
          box
          color="primary"
          label="Implication"
          rows="1"
          name="implication"
        />
        <v-btn color="primary" @click="setFileDialog(true)">Select Image</v-btn>
        <h6 class="subheading">Select the implication level</h6>
        <v-layout align-center justify-center row>
          <v-btn
            flat
            icon
            color="default"
            v-bind:class="{selectedColor: form.implicationColor == theme.default}"
            @click="setSelected('default', theme.default)"
          >
            <v-icon>mdi-checkbox-blank</v-icon>
          </v-btn>
          <v-btn
            flat
            icon
            color="success"
            v-bind:class="{selectedColor: form.implicationColor == theme.success}"
            @click="setSelected('success', theme.success)"
          >
            <v-icon>mdi-checkbox-blank</v-icon>
          </v-btn>
          <v-btn
            flat
            icon
            color="info"
            v-bind:class="{selectedColor: form.implicationColor == theme.info}"
            @click="setSelected('info', theme.info)"
          >
            <v-icon>mdi-checkbox-blank</v-icon>
          </v-btn>
          <v-btn
            flat
            icon
            color="warning"
            v-bind:class="{selectedColor: form.implicationColor == theme.warning}"
            @click="setSelected('warning', theme.warning)"
          >
            <v-icon>mdi-checkbox-blank</v-icon>
          </v-btn>
          <v-btn
            flat
            icon
            color="primary"
            v-bind:class="{selectedColor: form.implicationColor == theme.primary}"
            @click="setSelected('primary', theme.primary)"
          >
            <v-icon>mdi-checkbox-blank</v-icon>
          </v-btn>
        </v-layout>
      </v-layout>
      <v-layout align-center justify-center row>
        <v-btn color="primary" @click="prepareChangeEdge()">Apply</v-btn>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<style scoped>
.selectedColor {
  background-color: rgb(238, 238, 238);
}
</style>


<script>
import { mapState, mapActions } from "vuex";
import theme from "@/plugins/vuetify/theme";

/**
 * View used for 'Edge' cells.
 * @memberof component.FlowchartForm
 */
export default {
  data() {
    return {
      form: {
        answer: null,
        implication: null,
        implicationLevel: null,
        implicationColor: null,
        imageName: "",
      },
      theme
    };
  },
  computed: {
    ...mapState("flowcharteditor/", ["selectedCell", "formatBarType", "imageName"])
  },
  methods: {
    ...mapActions("cdn/", ["setFileDialog"]),
    setSelected(selected, color) {
      this.form.implicationLevel = selected;
      this.form.implicationColor = color;
    },
    prepareChangeEdge() {
      this.$validator.validateAll("EdgeForm").then(valid => {
        if (valid) {
          //get the image name from the dialog and save it onto the edge

          if(this.form.imageName === ""){
            this.form.imageName = "DefaultEdgeImage";
          }

          this.changeEdge(
            this.form.answer,
            this.form.implication,
            this.form.implicationLevel,
            this.form.implicationColor,
            this.form.imageName
          );

          //reset imageName because the image already has been used
          this.form.imageName = "";
        }
      });
    }
  },
  watch: {
    selectedCell: function(newValue) {
      if (
        newValue != null &&
        this.formatBarType == this.$data.nodeEnum.Edge &&
        newValue.lincData.length > 0
      ) {
        this.form.answer = newValue.value;
        this.form.implication = newValue.lincData.find(
          data => data.key === "implication"
        ).value;
        this.form.implicationLevel = newValue.lincData.find(
          data => data.key === "implicationLevel"
        ).value;
      }
    },
    imageName: function(newVal) {
      this.form.imageName = newVal;
    }
  }
};
</script>
