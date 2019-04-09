<template>
  <v-app :style="{background: this.background }">
    <Toolbar v-if="!newUser"/>
    <!--<Drawer/> -->
    <CoreView/>
  </v-app>
</template>

<script>
//import Drawer from './components/core/Drawer'
import CoreView from "./components/core/View";
import Toolbar from './components/core/Toolbar'
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Toolbar,
    //Drawer,
    CoreView
  },
  date() {
    return {
      calculatedBg: ""
    };
  },
  computed: {
    ...mapState(['newUser']),
    ...mapState("app", {
      background: state => state.background
    })
  },
  methods: {
    ...mapActions("app/", ["setBackground"])
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

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>

