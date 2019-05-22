<template>
  <v-form :data-vv-scope="'Form'" class="ServiceableTopbar">
    <v-container>
      <v-layout align-center justify-center row wrap>
          <p>
            <b>Create a new serviceable</b>
          </p>

          <v-flex xs12 md4>
            <v-text-field
              v-model="form.name"
              v-validate="'required|min:3|alpha'"
              :counter="255"
              label="tag"
              name="tag"
              required
            ></v-text-field>
          </v-flex>
          <span>{{ errors.first(`Form.tag`) }}</span>

          <v-flex xs12 md4>
            <ServiceableFilePicker v-on:Base64="setFile($event)" v-on:Type="setType($event)"/>
          </v-flex>

          <v-flex xs5 md1>
            <v-btn color="primary" @click="uploadNewImage">upload</v-btn>
          </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import ServiceableFilePicker from "@/components/cdn/ServiceableFilePicker";
//import cdn from "@/store/modules/cdn/server";
import { mapActions } from "vuex";

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
    ...mapActions("cdn/", ["uploadImage"]),
    setFile(file) {
      this.form.file = file;
    },
    setType(type) {
      this.form.type = type;
    },
    uploadNewImage() {
      this.$validator.validateAll("Form").then(valid => {
        if (valid) {
          console.log(this.form);
          this.uploadImage({
            file: this.form.file, 
            name: this.form.name, 
            type: this.form.type});
        }
      });
    }
  }
};
</script>

<style scoped>
.ServiceableTopbar {
  background: white;
}
</style>
