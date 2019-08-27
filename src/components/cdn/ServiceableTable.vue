<template>
  <v-layout column>
    <ConfirmationDialog
      title="Confirmation"
      text="Are you sure you want to delete this?"
      trueBtnText="Yes"
      falseBtnText="No"
      ref="ConfirmDialog"
      v-on:chosenAction="checkDeletionChoice"
    />
    <v-flex>
      <v-data-table :headers="headers" :items="serviceables" item-key="name" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.size }}</td>
          <td>{{ props.item.type }}</td>
          <td><v-checkbox :input-value="props.item.locked" @change="updateMetaData({tag: props.item.name, locked: !props.item.locked})"/></td>
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

            <v-btn color="danger" small @click="toggleDialog(props.item)">Delete</v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import ConfirmationDialog from "@/components/material/Dialog";
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
      ],
      dialogState: false,
      selectedItem: null
    };
  },
  components: {
    ConfirmationDialog
  },
  computed: {
    ...mapState("cdn/", ["serviceables"])
  },
  methods: {
    ...mapActions("cdn/", ["getAllData", "deleteById", "updateMetaData"]),
    toggleDialog(item){
      this.selectedItem = item;
      this.$refs.ConfirmDialog.toggle();
    },
    checkDeletionChoice(choice){
      if(this.selectedItem && choice){
        this.deleteById(this.selectedItem);
        this.selectedItem = null;
      }
    }
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