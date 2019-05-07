<template>
  <v-form v-model="valid" class="ServiceableTopbar">
    <v-container>
      <p><b>Create a new serviceable</b></p>
      <v-layout>
        <v-flex xs12 md4>
          <v-text-field v-model="name" :rules="nameRules" :counter="10" label="name" required></v-text-field>
        </v-flex>

        <v-flex xs12 md4>
          <v-text-field v-model="type" :rules="nameRules" :counter="10" label="type" required></v-text-field>
        </v-flex>

        <v-flex xs12 md4>
          <ServiceableFilePicker/>
        </v-flex>

        <v-flex xs5 md1>
          <v-btn :disabled=true color="info" @click="uploadImage">upload</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import ServiceableFilePicker from "@/components/cdn/ServiceableFilePicker";
import {CDN_URL} from "@/store/serverconstants"
import * as api from "@/api/api"
import { type } from 'os';

export default {
  data: () => ({
    valid: false,
    name: "",
    type: "",
    nameRules: [v => !!v || "this is required"],
    FILE: ""
  }),
  components: {
    ServiceableFilePicker
  },
  methods: {
    uploadImage() {
      api.apiCall("POST", "http://ironsm4sh.nl:3305/", {}).then(() => {

      });
    }
  }
};
</script>

<style>
.ServiceableTopbar {
  background: white;
}
</style>
