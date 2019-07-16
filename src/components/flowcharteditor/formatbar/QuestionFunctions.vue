<template>
  <v-layout row justify-center>
    <v-form data-vv-scope="QuestionForm">
      <GenericView nameLabel="Question" @onChange="changeProps" />
      <v-layout column>
        <span>{{ errors.first('question') }}</span>
        <h6 class="subheading">The reason of the question</h6>
        <v-textarea v-model="form.reason" auto-grow box color="primary" label="Reason" rows="1" />
      </v-layout>
      <v-layout align-center justify-center row>
        <v-btn color="primary" @click="prepareChangeQuestionNode()">Apply</v-btn>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script>
import GenericView from "./genericView/GenericView";
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
        reason: null
      }
    };
  },
  computed: {
    ...mapState("flowcharteditor/", ["selectedCell", "formatBarType"])
  },
  components: {
    GenericView
  },
  methods: {
    ...mapActions("flowcharteditor/", ["setSelectedCell"]),
    changeProps(newForm) {
      this.form.questionNode = newForm.nodeName;
      this.form.question = newForm.name;
    },
    prepareChangeQuestionNode() {
      this.$validator.validateAll("QuestionForm").then(valid => {
        if (valid) {
          this.changeQuestionNode(
            this.form.questionNode,
            this.form.question,
            this.form.reason
          );
        }
      });
    }
  },
  watch: {
    selectedCell: function(newValue, oldValue) {
      if (
        newValue != null &&
        this.formatBarType == this.$data.nodeEnum.Question
      ) {
        this.form.reason = newValue.lincData.find(
          data => data.key === "question"
        ).value;
      }
    }
  }
};
</script>