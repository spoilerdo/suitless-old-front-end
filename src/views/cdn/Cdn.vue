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

export default {
  name: "cdn",
  components: {
    ServiceableTable,
    ServiceableTopbar,
  },
 data: () => ({
  }),
  methods : {
    addServiceable(serviceable) {
      console.log(serviceable);
      this.$refs.table.addServiceable(serviceable);
    }
  }
};
</script>

<style>
.ServiceableRow {
  width: 100%;
  margin-bottom: 4px;
}
.stretch{
  height: 100%;
}
.fillScreen{
  height: calc(50% - 5vh);
}
.form{
 height: 150px;
}
.data{
 height: calc(100% - 150px);
}
</style>
