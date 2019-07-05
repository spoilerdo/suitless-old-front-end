<template>
  <v-snackbar
    v-model="activated"
    bottom
    right
    dark
    :color="type"
    :timeout="timeVisible"
  >
    <v-icon color="white" class="mr-3">{{ icon }}</v-icon>
    <div>
      {{value}}
    </div>
    <v-icon size="16" @click="activated = false">mdi-close-circle</v-icon>
  </v-snackbar>
</template>

<script>
/**
 * Returns a temporary notification
 * @memberof component.Material
 * @property {boolean} activated
 */
export default {
  data(){
    return {
      value: "",
      activated: false,
      icon: "mdi-bell-plus",
      type: "primary",
    }
  },
  props: {
    timeVisible: {
      type: Number,
      required: true
    }
  },
  methods: {
    showNotification(value, type) {
      this.activated = false;

      switch(type) {
        case "warning":
          this.icon = "mdi-alert"
          break;
        case "error":
          this.icon = "mdi-alert-circle"
          break;
        case "success":
          this.icon = "mdi-check-bold"
          break;
        default:
          this.icon = "mdi-bell-plus";
      }

      setTimeout(() => {
        this.value = value;
        if(type) this.type = type;
        this.activated = true;
    }, this.timeVisible);
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
