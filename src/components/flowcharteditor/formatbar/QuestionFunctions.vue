<template>
  <v-layout row justify-center>
    <v-form>
      <v-layout column>
        <h6 class="body-2">Text you want to see in the node</h6>
        <v-textarea
          v-model="form.questionNode"
          auto-grow
          box
          color="primary"
          label="Node text"
          rows="1"
          v-validate="'required'"
          name="node text"
        />
        <span>{{ errors.first('node text') }}</span>
        <h6 class="subheading">The question you want to ask</h6>
        <v-textarea
          v-model="form.question"
          auto-grow
          box
          color="primary"
          label="Question"
          rows="1"
          v-validate="'required'"
          name="question"
        />
        <span>{{ errors.first('question') }}</span>
        <h6 class="subheading">The reason of the question</h6>
        <v-textarea
          v-model="form.reason"
          auto-grow
          box
          color="primary"
          label="Reason"
          rows="1"
        />
        <h6 class="subheading">The implication of the question</h6>
        <v-textarea
          v-model="form.implication"
          auto-grow
          box
          color="primary"
          label="Implication"
          rows="1"
        />
      </v-layout>
      <v-layout align-center justify-center row>
        <v-btn color="primary" @click="changeQuestionNode(form.questionNode, form.question, form.reason, form.implication)">Apply</v-btn>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      form: {
        questionNode: null,
        question: null,
        reason: null,
        implication: null
      }
    };
  }
};
</script>
