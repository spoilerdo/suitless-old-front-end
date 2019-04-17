<template>
  <v-snackbar
    v-model="snackbar"
    bottom
    right
    dark
    color="primary"
  >
    <v-icon color="white" class="mr-3">mdi-bell-plus</v-icon>
    <div>
      Welcome to
      <b>Vue Material Dashboard</b> - a beautiful freebie for every web developer.
    </div>
    <v-icon size="16" @click="snackbar = false">mdi-close-circle</v-icon>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    value: ""
  },
  data(){
    return{
      snackbar: true
    }
  }
};
</script>

<style>
.v-alert--notification {
  border-radius: 4px !important;
  border-top: none !important;
}
</style>
