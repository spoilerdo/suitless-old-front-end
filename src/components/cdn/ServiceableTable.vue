<template>
  <v-layout column>
    <v-flex style="overflow: auto">
      <v-data-table :headers="headers" :items="serviceables" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.size }}</td>
          <td>{{ props.item.type }}</td>
          <td class="actionsSection">

            <v-dialog :lazy=true>
              <template v-slot:activator="{ on }">
                <v-btn color="blue lighten-2" small v-on="on">view</v-btn>
              </template>
              <v-card class="fullscreen">
                <v-card-title class="headline grey lighten-2" primary-title>{{ props.item.name }}</v-card-title>
                <iframe class="cdnContent" :src="props.item.baseURL"></iframe>
              </v-card>
            </v-dialog>

            <v-btn color="danger" :disabled=true small @click="deleteContent(props.item.baseURL)">Delete</v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import cdn from "@/store/modules/cdn/server";

export default {
  data() {
    return {
      headers: [
        { text: "Serviceables", value: "name" },
        { text: "Size (KB)", value: "size" },
        { text: "Type", value: "type" },
        { text: "Actions", sortable: false }
      ],
      serviceables: []
    };
  },
  methods: {
    deleteContent(baseURL) {
      console.log("DELETE", baseURL);
    },
    getAllContent() {
      this.serviceables = cdn.actions.getAllData(this.serviceables);
    },
    addServiceable(serviceable){
      this.serviceables.push(serviceable);
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

.fullscreen {
  height: 80vh;
}

.headline {
  height: 10%;
  padding: 0;
  padding-left: 20px;
}

.cdnContent {
  width: 100%;
  height: 89%;
}
</style>
