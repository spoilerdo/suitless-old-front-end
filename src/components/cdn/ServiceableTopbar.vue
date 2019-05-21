<template>
  <v-form :data-vv-scope="'Form'" class="ServiceableTopbar">
    <v-container>
      <p>
        <b>Create a new serviceable</b>
      </p>
      <v-layout class="center">
        <v-flex xs12 md4>
          <v-text-field
            v-model="form.name"
            v-validate="'required|min:3|alpha'"
            :counter="255"
            label="tag"
            name="tag"
            required
            id="nameField"
          ></v-text-field>
          <span>{{ errors.first(`Form.tag`) }}</span>
        </v-flex>

        <v-flex xs12 md4>
          <ServiceableFilePicker v-on:Base64="setFile($event)" v-on:Type="setType($event)"/>
        </v-flex>

        <v-flex xs5 md1>
          <v-btn color="info" id="uploadBtn" @click="uploadImage">upload</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import ServiceableFilePicker from "@/components/cdn/ServiceableFilePicker";
import cdn from "@/store/modules/cdn/server";

export default {
  data() {
    return {
      valid: false,
      form: {
        name: "",
        file: "",
        type: ""
      },
      validated: 1
    };
  },
  components: {
    ServiceableFilePicker
  },
  methods: {
    setFile(file) {
      this.form.file = file;
    },
    setType(type) {
      this.form.type = type;
    },
    uploadImage() {
      this.$validator.validateAll("Form").then(valid => {
        if (valid) {
          let serviceable = cdn.actions
            .uploadImage(this.form.file, this.form.name, this.form.type)
            .then(serviceable => {
              if (serviceable != null) {
                this.$emit("serviceable", serviceable);
              }
            });
        }
      });
    }
  }
};
</script>

<style>
.ServiceableTopbar {
  background: white;
}

.center {
  display: flex;
  justify-content: center;
}
</style>
