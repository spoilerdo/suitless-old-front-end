<template>
  <v-form v-model="valid" class="ServiceableTopbar">
    <v-container>
      <p>
        <b>Create a new serviceable</b>
      </p>
      <v-layout>
        <v-flex xs12 md4>
          <v-text-field v-model="name" :rules="nameRules" :counter="10" label="name" required></v-text-field>
        </v-flex>

        <v-flex xs12 md4>
          <ServiceableFilePicker v-on:Base64="setFile($event)" v-on:Type="setType($event)"/>
        </v-flex>

        <v-flex xs5 md1>
          <v-btn color="info" @click="uploadImage">upload</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import ServiceableFilePicker from "@/components/cdn/ServiceableFilePicker";
import cdn from "@/store/modules/cdn/server";

export default {
  data: () => ({
    valid: false,
    name: "",
    type: "",
    file: "",
    nameRules: [v => !!v || "this is required"]
  }),
  components: {
    ServiceableFilePicker
  },
  methods: {
    setFile(file) {
      this.file = file;
    },
    setType(type) {
      this.type = type;
    },
    uploadImage() {
      let serviceable = cdn.actions
        .uploadImage(this.file, this.name, this.type)
        .then(serviceable => {
            if (serviceable != null) {
              this.$emit("serviceable", serviceable);
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
</style>
