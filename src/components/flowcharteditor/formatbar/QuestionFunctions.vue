<template>
  <v-layout row justify-center>
    <v-form>
      <GenericView
          nameLabel="Question"
          @onChange="changeProps"
      />
      <v-layout column>
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
import GenericView from "./genericView/GenericView";

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
  },
  components: {
    GenericView
  },
  methods: {
    changeProps(newForm){
      this.form.questionNode = newForm.nodeName;
      this.form.question = newForm.name;
    }
  }
};
</script>