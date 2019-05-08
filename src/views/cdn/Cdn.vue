<template>
  <v-layout justify-center wrap class="fillScreen">
    <div class="ServiceableRow stretch">
      <ServiceableTopbar class="ServiceableRow form"/>
      <ServiceableTable class="ServiceableRow data"/>
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
  data() {
    return {};
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
  height: 94vh;
}
.form{
 height: 15%;
 max-height: 150px;
}
.data{
 height: 85%;
}
</style>
