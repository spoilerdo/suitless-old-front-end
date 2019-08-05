<template>
  <v-layout column>
    <v-flex style="overflow: auto">
      <v-data-table
        :headers="headers"
        :items="logs"
        :must-sort="true"
        :pagination.sync="pagination"
        class="elevation-1"
        :loading="loading"
        :dark="true"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.date }}</td>
          <td>{{ props.item.severity }}</td>
          <!-- <td>{{ props.item.executor }}</td> -->
          <td>{{ props.item.classPath }}</td>
          <td>{{ props.item.message }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      pagination: {
          descending: true
      },
      headers: [
        { text: "date", value: "date" },
        { text: "severity", value: "severity", sortable: false },
        // { text: "executor", value: "executor", sortable: false },
        { text: "class path", value: "classPath", sortable: false },
        { text: "message", value: "message", sortable: false }
      ],
    };
  },
  computed: {
    ...mapState("log/", ["logs"])
  },
  props: [
    'loading'
  ]
};
</script>

<style scoped>
.v-btn {
  color:gray !important;
}
</style>
