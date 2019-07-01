<template>
  <v-form :data-vv-scope="'Form'" class="ServiceableTopbar">
    <v-container>
      <p>
        <b>Create a new serviceable</b>
      </p>
      <v-layout align-center justify-center>
        <v-flex xs12 md4>
          <v-text-field
            v-model="form.name"
            v-validate="'required|min:3|alpha'"
            :counter="255"
            label="Tag"
            name="tag"
            required
            id="nameField"
          ></v-text-field>
          <span>{{ errors.first(`Form.tag`) }}</span>
        </v-flex>

        <v-flex xs12 md4>
          <ServiceableFilePicker 
            v-on:Base64="setFile($event)"
            v-on:Type="setType($event)"
            ref="filePicker"
          />
        </v-flex>

        <v-flex xs5 md1>
          <v-btn color="info" id="uploadBtn" @click="validateAndUploadImage">upload</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import ServiceableFilePicker from "@/components/cdn/ServiceableFilePicker";
import { mapState, mapActions } from "vuex";

/**
 * Returns the top-bar used in the CDN page, this contains a small form with a name field and a filepicker
 * @memberof component.CDN
 * @property {boolean} valid
 * @property {topbarForm} form
 */
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
    validateAndUploadImage() {
      this.$validator.validateAll("Form").then(valid => {
        if (valid) {
          this.uploadImage({ file: this.form.file, name: this.form.name, type: this.form.type })
          .then(() => {
            this.$refs.filePicker.clearInputs();
            this.showNotification("Upload succeeded");
          })
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
