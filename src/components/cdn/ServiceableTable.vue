<template>
  <v-data-table :headers="headers" :items="serviceables" class="elevation-1">
    <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-left">{{ props.item.size }}</td>
      <td class="text-xs-left">{{ props.item.type }}</td>
      <td class="text-xs-left actionsSection">
        <v-btn color="info" small @click="viewContent(props.item.baseURL)">View</v-btn>
        <v-btn color="danger" small @click="deleteContent(props.item.baseURL)">Delete</v-btn>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import * as api from "@/api/api"

export default {
  data() {
    return {
      headers: [
        { text: "Serviceables", value: "name" },
        { text: "Size (MB)", value: "size" },
        { text: "Type", value: "type" },
        { text: "Actions", sortable: false }
      ],
      serviceables: [
        {
          name: "ehvLINC Logo",
          size: "0.6",
          type: "image/png",
          baseURL: "nope"
        }
      ]
    };
  },
  methods: {
    viewContent(baseURL) {
      console.log("SHOW", baseURL);
    },
    deleteContent(baseURL) {
      console.log("DELETE", baseURL);
    },
    getAllContent() {
      console.log("GET ALL");
      api.apiCall("GET", "http://localhost:3305/meta/all").then((data, data2) => {
        console.log(data);
      })
    }
  },
  mounted() {
    this.getAllContent();
  }
};
</script>

<style>
.actionsSection {
  max-width: 80px;
}
</style>
