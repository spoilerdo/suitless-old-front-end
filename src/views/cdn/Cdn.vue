<template>
  <v-layout align-center justify-center class="background-content-container" row wrap fill-height>
    <h1>Serviceable Content</h1>
    <div class="ServiceableRow">
      <ServiceableTopbar class="ServiceableRow"/>
      <ServiceableTable class="ServiceableRow"/>
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
    ServiceableTopbar
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
</style>
