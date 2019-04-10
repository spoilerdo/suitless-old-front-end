<template>
  <v-data-table :headers="headers" :items="serviceables" :rows-per-page-items=[4] class="elevation-1">
    <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.size }}</td>
      <td>{{ props.item.type }}</td>
      <td class="actionsSection">
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
        { text: "Size (KB)", value: "size" },
        { text: "Type", value: "type" },
        { text: "Actions", sortable: false }
      ],
      serviceables: [
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

      //TODO: DE URI uit env.
      let apiURI = "http://localhost:3305/";

      api.apiCall("GET", apiURI + "meta/all").then((data) => {
        console.log(data);
        data.metadataList.forEach(serviceable => {
          this.serviceables.push({
            name: serviceable.tag,
            size: (serviceable.size/1000).toFixed(2), //Byte to MB
            type: serviceable.type,
            baseURL: apiURI + serviceable.tag
          })
        });
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
  max-width: 100px;
}
</style>
