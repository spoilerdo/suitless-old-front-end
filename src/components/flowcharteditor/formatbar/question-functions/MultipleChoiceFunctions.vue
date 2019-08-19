<template>
  <v-layout row justify-center>
    <v-form data-vv-scope="MultiChoiceForm" @submit.prevent>
      <v-layout column>
        <h6 class="subheading">Multiple choice Title</h6>
        <v-text-field
          v-model="form.multipleChoiceNode"
          label="Title"
          v-validate="'required'"
          counter="20"
          maxlength="20"
          name="title"
        />
        <span>{{ errors.first('MultiChoiceForm.title') }}</span>
        <h6 class="subheading">The question you want to ask</h6>
        <v-textarea
          v-model="form.multipleChoice"
          auto-grow
          box
          color="primary"
          label="Question"
          rows="1"
          v-validate="'required'"
          maxlength="255"
          counter="255"
          name="question"
        />
        <span>{{ errors.first('MultiChoiceForm.question') }}</span>
        <ReasonList v-bind:reasons.sync="form.reasons"/>
        <h6 class="subheading">The amount of choices</h6>
        <v-slider
          class="pt-2"
          v-model="form.amountOfChoices"
          :rules="rules"
          color="warning"
          min="2"
          max="20"
          persistent-hint
          thumb-color="info"
          thumb-label="always"
        />
        <v-checkbox
          v-model="form.loopSubQuestions"
          label="Ask the same subquestions more than once"
          hide-details
          color="primary"
        />
      </v-layout>
      <v-layout align-center justify-center row>
        <v-btn color="primary" @click="prepareChangeMultipleChoiceNode()">Apply</v-btn>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script>
import ReasonList from "./ReasonList";
import { getReasonsArray } from "@/services/flowchartHelper";
import { mapState } from "vuex";

/**
 * View used for 'MultipleChoice' cells.
 * @memberof component.FlowchartForm
 */
export default {
  data() {
    return {
      form: {
        multipleChoiceNode: null,
        multipleChoice: null,
        amountOfChoices: 3,
        reasons: [
          {
            reason: null,
            type: "Example"
          }
        ],
        loopSubQuestions: false,
      },
      rules: [
        val => val <= 15 || `This is maybe a bit to much`
      ]
    };
  },
  computed: {
    ...mapState("flowcharteditor/", ["selectedCell", "formatBarType"])
  },
  components: {
    ReasonList
  },
  methods: {
    prepareChangeMultipleChoiceNode() {
      this.$validator.validateAll("MultiChoiceForm").then(valid => {
        if (valid) {
          this.changeMultipleChoiceNode(
            this.form.multipleChoiceNode,
            this.form.multipleChoice,
            this.form.amountOfChoices,
            this.form.reason,
            this.form.loopSubQuestions
          );
        }
      });
    }
  },
  watch: {
    selectedCell: function(newValue, oldValue) {
      if (
        newValue != null &&
        this.formatBarType == this.$data.nodeEnum.MultipleChoice
      ) {
        this.form.multipleChoiceNode = newValue.value;
        this.form.multipleChoice = newValue.lincData.find(
          data => data.key === "question"
        ).value;
        this.form.reasons = getReasonsArray(newValue);
        this.form.loopSubQuestions = newValue.lincData.find(
          data => data.key === "loopsubQuestions"
        );
        this.form.amountOfChoices = newValue.children;
      }
    }
  }
};
</script>
