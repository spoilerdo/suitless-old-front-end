<template>
  <v-layout justify-center wrap class="fillScreen">
    <div class="ServiceableRow stretch">
      <ServiceableTopbar v-on:serviceable="addServiceable($event)" class="ServiceableRow form"/>
      <ServiceableTable ref="table" class="ServiceableRow data"/>
    </div>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import ServiceableTable from "@/components/cdn/ServiceableTable";
import ServiceableTopbar from "@/components/cdn/ServiceableTopbar";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

/**
 * Returns the CDN page, where the user can upload and delete serviceables
 * @memberof view
 */
export default {
  name: "cdn",
  components: {
    ServiceableTable,
    ServiceableTopbar
  },
  methods: {
    ...mapActions("app/", ["setBackground", "setFooterColor"]),
    addServiceable(serviceable) {
      this.$refs.table.addServiceable(serviceable);
    }
  },
  created() {
    //when created call the action to get the survey with the id in the props.
    this.setFooterColor("#c01833");
  },
  beforeDestroy() {
    this.setFooterColor("#fff");
  }
};
</script>

<style scoped>
.ServiceableRow {
  width: 100%;
  margin-bottom: 4px;
}
.stretch {
  height: 100%;
}
.fillScreen {
  height: calc(50% - 5vh);
}
.form {
  height: 150px;
}
.data {
  height: calc(100% - 150px);
}

#core-view {
  height: auto;
}
</style>
