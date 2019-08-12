<template>
  <div>
    <v-list class="list-height">
      <template v-for="(reason, index) in reasonList">
        <v-card elevation-4 :key="index">
          <v-layout column pa-2 my-2>
            <h6 class="subheading">Reason: {{ index + 1 }}</h6>
            <v-textarea v-model="reason.reason" auto-grow box color="primary" label="Reason" rows="1" />
            <v-layout justify-end row>
                <v-btn
                  class="small-btn"
                  icon
                  round
                  outline
                  color="primary"
                  @click="deleteReason(index)"
                >
                  <v-icon size="15">mdi-minus</v-icon>
                </v-btn>
              </v-layout>
          </v-layout>
        </v-card>
      </template>
    </v-list>
    <v-layout justify-end row>
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn icon round color="primary" v-on="on" @click="addReason()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Add Reason</span>
      </v-tooltip>
    </v-layout>
  </div>
</template>

<style scoped>
.list-height {
  max-height: 320px;
  overflow-y: auto;
}
.small-btn {
  width: 15px;
  height: 15px;
  margin: 0;
}
.selectedColor {
  background-color: rgb(238, 238, 238);
}
</style>

<script>
export default {
  props: {
    reasons: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      reasonList: this.reasons
    };
  },
   methods: {
    addReason() {
      this.reasonList.push([]);
    },
    deleteReason(index) {
      this.reasonList.splice(index, 1);
    }
  },
  watch: {
    reasons: function(newVal) {
      this.reasonList = newVal;
    }
  }
};
</script>