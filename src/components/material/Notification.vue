<template>
  <v-snackbar
    v-model="activated"
    bottom
    right
    dark
    color="primary"
  >
    <v-icon color="white" class="mr-3">mdi-bell-plus</v-icon>
    <div>
      Information:
      {{value}}
    </div>
    <v-icon size="16" @click="activated = false">mdi-close-circle</v-icon>
  </v-snackbar>
</template>

<script>
export default {
  data(){
    return {
      value: "",
      activated: false
    }
  },
  methods: {
    showNotification(value) {
      this.activated = false;

      setTimeout(() => {
        this.value = value;
        this.activated = true;
    }, 100);
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
