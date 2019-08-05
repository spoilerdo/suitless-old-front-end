<template>
  <v-combobox
    :items="services"
    v-model="dropdown.name"
    @change="this.displayLogs"
    label="Select a Service"
  ></v-combobox>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      dropdown: {
        name: ""
      }
    };
  },
  computed: {
    ...mapState("log/", ["services"])
  },
  methods: {
    ...mapActions("log/", ["updateServices"]),
    displayLogs(service) {
      this.$emit("service-picked", service);
    }
  },
  mounted() {
    this.updateServices();
  }
};
</script>
