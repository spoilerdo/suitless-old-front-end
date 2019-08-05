<template>
  <v-layout justify-center wrap class="fillScreen">
    <Drawer />
    <div class="view">
      <LogPickerDropdown v-on:service-picked="this.changeDisplayedService" />
      <LogTable :loading="loading"/>
    </div>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import Drawer from "@/components/core/Drawer";
import LogPickerDropdown from "@/components/log/LogPickerDropdown";
import LogTable from "@/components/log/LogTable";
import { mapState, mapActions } from "vuex";

/**
 * Returns the Log page, where the user can view logs.
 * @memberof view
 */
export default {
  name: "log",
  components: {
    Drawer,
    LogPickerDropdown,
    LogTable
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    ...mapActions("app/", ["setBackground", "setFooterColor"]),
    ...mapActions("log/", ["getLogs"]),
    changeDisplayedService(service) {
      this.loading = true;
      this.getLogs(service);
    }
  },
  created() {
    this.setFooterColor("#c01833");
  },
  beforeDestroy() {
    this.setFooterColor("#fff");
  }
};
</script>

<style scoped>
.view {
  width: 90%;
}
</style>
