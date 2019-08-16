<template>
  <v-layout row justify-center>
    <v-form data-vv-scope="QuestionForm" @submit.prevent>
      <v-layout column>
      <GenericView
        ref="genericView"
        nameLabel="The name of the Question"
        nodeName="question"
        @onChange="changeProps"
        @validated="checkValidation"
      />
      <ReasonList v-bind:reasons.sync="form.reasons"/>
      </v-layout>
      <v-layout align-center justify-center row>
        <v-btn color="primary" @click="prepareChangeQuestionNode()">Apply</v-btn>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script>
import GenericView from "../genericView/GenericView";
import ReasonList from "./ReasonList";
import { getReasonsArray } from "@/services/flowchartHelper";
import { mapState, mapActions } from "vuex";

/**
 * View used for 'Question' cells.
 * @memberof component.FlowchartForm
 */
export default {
  data() {
    return {
      form: {
        questionNode: null,
        question: null,
        reasons: [
          {
            reason: null,
            type: "Example"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState("flowcharteditor/", ["selectedCell", "formatBarType"])
  },
  components: {
    GenericView,
    ReasonList
  },
  methods: {
    ...mapActions("flowcharteditor/", ["setSelectedCell"]),
    changeProps(newForm) {
      this.form.questionNode = newForm.nodeName;
      this.form.question = newForm.name;
    },
    prepareChangeQuestionNode() {
      this.$refs.genericView.checkIfValid();
    },
    checkValidation(genericValid){
      this.$validator.validateAll("QuestionForm").then(valid => {
        if (valid && genericValid) {
          this.changeQuestionNode(
            this.form.questionNode,
            this.form.question,
            this.form.reasons
          );
        }
      });
    },
  },
  watch: {
    selectedCell: function(newValue) {
      if (
        newValue != null &&
        this.formatBarType == this.$data.nodeEnum.Question
      ) {
        this.form.reasons = getReasonsArray(newValue);
      }
    }
  }
};
</script>