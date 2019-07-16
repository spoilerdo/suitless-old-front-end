<template>
  <v-app :style="{background: this.background }">
    <Toolbar v-if="!newUser"/>
    <CoreView/>
    <!-- Universal Notification component for the notificationHandler module (error handling) -->
    <Notification :timeVisible="6000" ref="notification"/>
    <!-- Universal CDN Uploader for uploading files -->
    <ServiceableUploaderDialog ref="cdnUploader"/>
  </v-app>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('app/');

import CoreView from "./components/core/View";
import Toolbar from './components/core/Toolbar';
import Notification from "@/components/material/Notification.vue";
import ServiceableUploaderDialog from "@/components/cdn/ServiceableUploaderDialog.vue";

/**
 * The root component, all over components get interpolated into this.
 */
export default {
  components: {
    Toolbar,
    CoreView,
    Notification,
    ServiceableUploaderDialog
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

