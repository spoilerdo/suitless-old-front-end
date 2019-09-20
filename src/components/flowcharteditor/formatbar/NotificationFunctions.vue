<template>
  <v-layout row justify-center>
    <v-form data-vv-scope="NotifyForm" @submit.prevent>
      <v-layout column>
        <h6 class="subheading">Text you want to see in the node</h6>
        <v-text-field
          label="Node text"
          v-model="form.nodeName"
          v-validate="'required'"
          name="node text"
          counter="25"
          maxlength="25"
        />
        <span>{{ errors.first('NotifyForm.node text') }}</span>
        <h6 class="subheading">The title of the notification</h6>
        <v-text-field
          label="Notification Title"
          v-model="form.title"
          v-validate="'required'"
          name="notificationTitle"
          counter="50"
          maxlength="50"
        />
        <span>{{ errors.first('NotifyForm.notificationTitle') }}</span>
        <h6 class="subheading">The name of the notification</h6>
        <v-textarea
          v-model="form.name"
          auto-grow
          box
          color="primary"
          label="Notification"
          rows="1"
          v-validate="'required'"
          name="nodeName"
          counter="400"
          maxlength="400"
        />
        <span>{{ errors.first('NotifyForm.nodeName') }}</span>
      </v-layout>
      <v-layout align-center justify-center row>
        <v-btn color="primary" @click="checkValidation()">Apply</v-btn>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";

/**
 * View used for 'Notification' cells.
 * @memberof component.FlowchartForm
 */
export default {
  data() {
    return {
      form: {
        nodeName: null,
        name: null,
        title: null
      }
    };
  },
  methods: {
    checkValidation() {
      this.$validator.validateAll("NotifyForm").then(valid => {
        if (valid) {
          this.changeNotificationNode(this.form.nodeName, this.form.name, this.form.title);
        }
      });
    }
  }
};
</script>