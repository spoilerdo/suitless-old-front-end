<template>
  <v-layout column>
    <v-flex style="overflow: auto">
      <v-data-table :headers="headers" :items="serviceables" item-key="name" hide-actions class="elevation-1">
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

            <v-btn color="danger" small @click="deleteData(props.item)">Delete</v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";

/**
 * Returns the table used in the CDN page. displays serviceables
 * @memberof component.CDN
 * @property {Array<Serviceable>} serviceables the serviceables that are going to be displayed
 */
export default {
  data() {
    return {
      headers: [
        { text: "Serviceables", value: "name" },
        { text: "Size (KB)", value: "size" },
        { text: "Type", value: "type" },
        { text: "Actions", sortable: false }
      ]
    };
  },
  computed: {
    ...mapState("cdn/", ["serviceables"])
  },
  methods: {
    ...mapActions("cdn/", ["getAllData", "deleteData"]),
  },
  mounted() {
    this.getAllData();
  }
};
</script>

<style scoped>
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
