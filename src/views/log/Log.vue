<template>
  <v-layout justify-center wrap class="fillScreen">
    <Drawer/>
    <div class="">
        <LogPickerDropdown />
    </div>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import Drawer from "@/components/core/Drawer";
import LogPickerDropdown from "@/components/log/LogPickerDropdown"
import { mapActions } from "vuex";

/**
 * Returns the Log page, where the user can view logs.
 * @memberof view
 */
export default {
  name: "log",
  components: {
    Drawer,
    LogPickerDropdown
  },
  methods: {
    ...mapActions("app/", ["setBackground", "setFooterColor"]),
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

</style>
