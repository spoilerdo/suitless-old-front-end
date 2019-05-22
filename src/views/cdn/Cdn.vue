<template>
  <v-layout justify-center wrap class="fillScreen">
    <div class="ServiceableRow stretch">
      <ServiceableTopbar class="ServiceableRow form"/>
      <ServiceableTable ref="table" class="ServiceableRow data"/>
    </div>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import ServiceableTable from "@/components/cdn/ServiceableTable";
import ServiceableTopbar from "@/components/cdn/ServiceableTopbar";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "cdn",
  components: {
    ServiceableTable,
    ServiceableTopbar
  },
  data: () => ({}),
  methods: {
    ...mapActions("app/", ["setBackground", "setFooterColor"]),
    ...mapActions("cdn/", ["addServiceable"])
  },
  created() {
    //when created call the action to get the survey with the id in the props.
    this.setFooterColor("#c01833");
  },
  beforeDestroy() {
    this.setFooterColor("#fff");
  },
  computed: {
    ...mapState("app/", ["footerColor"])
  }
};
</script>

<style>
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
