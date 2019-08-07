<template>
  <v-layout row justify-center>
    <v-form data-vv-scope="MultiChoiceForm" @submit.prevent>
      <v-layout column>
        <h6 class="subheading">Multiple choice Title</h6>
        <v-text-field
          v-model="form.multipleChoiceNode"
          label="Title"
          v-validate="'required'"
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
          name="question"
        />
        <span>{{ errors.first('MultiChoiceForm.question') }}</span>
        <v-textarea v-model="form.reason" auto-grow box color="primary" label="Reason" rows="1" />
        <h6 class="subheading">The amount of choices</h6>
        <v-text-field
          v-model="form.amountOfChoices"
          type="number"
          :value="form.amountOfChoices"
          v-validate="'required'"
          name="amount of choices"
        />
        <span>{{ errors.first('MultiChoiceForm.amount of choices') }}</span>
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
        reason: null,
        loopSubQuestions: true
      }
    };
  },
  computed: {
    ...mapState("flowcharteditor/", ["selectedCell", "formatBarType"])
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
        this.form.reason = newValue.lincData.find(
          data => data.key === "reason"
        ).value;
        this.form.loopSubQuestions = newValue.lincData.find(
          data => data.key === "loopsubQuestions"
        );
        this.form.amountOfChoices = newValue.children;
      }
    }
  }
};
</script>
