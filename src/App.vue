<template>
  <v-app :style="{background: this.background }">
    <Toolbar v-if="!newUser"/>
    <CoreView/>
    <Notification ref="notification"/>
  </v-app>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('app/');

import CoreView from "./components/core/View";
import Toolbar from './components/core/Toolbar';
import Notification from "@/components/material/Notification.vue";

/**
 * The root component, all over components get interpolated into this.
 */
export default {
  /**
   * The app compenent requeres three components
   * these components are loaded in every page
   */
  components: {
    /**The toolbar is on the left of the view. */
    Toolbar,
    /**The coreview will be replaced with the stack of other components */
    CoreView,
    /**The notification can be called from scripts to display a notification on every page. */
    Notification
  },
  date() {
    return {
      calculatedBg: ""
    };
  },
  computed: {
    ...mapState(['newUser', 'background'])
  },
  methods: {
    ...mapActions(["setBackground"])
  },
  watch: {
    background: function(val) {
      if (val.includes(".jpg") && !val.includes("url")) {
        this.calculatedBg = require("@/assets/img/" + val);
        this.calculatedBg = "url(" + this.calculatedBg + ")";
        this.setBackground(this.calculatedBg);
      } else {
        this.calculatedBg = val;
      }
    }
   }
};
</script>

<style lang="scss">
@import "@/styles/index.scss";

.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>

