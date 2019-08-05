<template>
  <v-layout column>
    <v-flex style="overflow: auto">
      <v-data-table
        :headers="headers"
        :items="logs"
        :must-sort="true"
        :pagination.sync="pagination"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.date }}</td>
          <td>{{ props.item.severity }}</td>
          <td>{{ props.item.executor }}</td>
          <td>{{ props.item.classPath }}</td>
          <td>{{ props.item.message }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      pagination: {
          descending: true
      },
      headers: [
        { text: "date", value: "date" },
        { text: "severity", value: "severity", sortable: false },
        { text: "executor", value: "executor", sortable: false },
        { text: "class path", value: "classPath", sortable: false },
        { text: "message", value: "message", sortable: false }
      ],
      logs: [
        {
          serviceName: "module-service_service_1",
          date: "2019-08-02T13:50:12.000+0000",
          severity: "INFO",
          executor: "[main]",
          classPath: "c.e.m.ModuleServiceApplication",
          message:
            "No active profile set, falling back to default profiles: default"
        },
        {
          serviceName: "module-service_service_1",
          date: "2019-08-02T13:50:14.000+0000",
          severity: "INFO",
          executor: "[main]",
          classPath: "o.s.d.r.c.RepositoryConfigurationDelegate",
          message: "Bootstrapping Spring Data repositories in DEFAULT mode."
        },
        {
          serviceName: "module-service_service_1",
          date: "2019-08-02T13:50:14.000+0000",
          severity: "INFO",
          executor: "[main]",
          classPath: "o.s.d.r.c.RepositoryConfigurationDelegate",
          message:
            "Finished Spring Data repository scanning in 208ms. Found 1 repository interfaces."
        },
        {
          serviceName: "module-service_service_1",
          date: "2019-08-02T13:50:14.000+0000",
          severity: "INFO",
          executor: "[main]",
          classPath: "o.s.d.r.c.RepositoryConfigurationDelegate",
          message: "Bootstrapping Spring Data repositories in DEFAULT mode."
        },
        {
          serviceName: "module-service_service_1",
          date: "2019-08-02T13:50:14.000+0000",
          severity: "INFO",
          executor: "[main]",
          classPath: "o.s.d.r.c.RepositoryConfigurationDelegate",
          message:
            "Finished Spring Data repository scanning in 22ms. Found 1 repository interfaces."
        }
      ]
    };
  }
};
</script>