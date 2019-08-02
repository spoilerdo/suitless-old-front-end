<template>
  <v-combobox :items="services" label="Select a Service"></v-combobox>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState("log/", ["services"])
  },
  methods: {
    ...mapActions("log/", ["updateServices"]),
  },
  mounted() {
    this.updateServices();
  }
};
</script>
