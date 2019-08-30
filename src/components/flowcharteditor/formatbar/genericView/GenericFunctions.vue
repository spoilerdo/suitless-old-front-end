<template>
  <v-layout row justify-center>
    <v-form @submit.prevent>
      <GenericView
        ref="genericView"
        :nameLabel="nameLabel"
        :nodeName="nodeName"
        :lincDataName="lincDataName"
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
import GenericView from "./GenericView";

/**
 * View used for 'Module' cells
 * @memberof component.FlowchartForm
 */
export default {
  props: {
    nameLabel: {
      type: String,
      required: true
    },
    nodeName: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    lincDataName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      form: {
        nodeName: null,
        name: null
      }
    };
  },
  components: {
    GenericView
  },
  methods: {
    prepareGenericChangeNode() {
      this.$refs.genericView.checkIfValid();
    },
    checkValidation(valid){
      if(valid) {
        switch(this.type) {
          case "module":
            this.changeModuleNode(this.form.nodeName, this.form.name);
            break;
          case "notification":
            this.changeNotificationNode(this.form.nodeName, this.form.name);
            break;
        }
      }
    },
    changeProps(newForm) {
      this.form = newForm;
    }
  }
};
</script>
