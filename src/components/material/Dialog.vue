<template>
  <v-dialog v-model="dialog" :persistent="persistent" max-width="700" id="disclaimer-dialog">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>{{ text }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="secondary darken-1" flat @click="choose(false)" id="disclaimer-disagree">{{ falseBtnText }}</v-btn>

        <v-btn color="info darken-1" flat @click="choose(true)" id="disclaimer-agree">{{ trueBtnText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/**
 * Returns a dialog component to be used in other components/ views
 * @memberof component.Material
 * @property {String} title
 * @property {String} text
 * @property {String} trueBtnText
 * @property {String} falseBtnText
 * @property {Boolean} dialogState
 * @property {Boolean} persistent
 */
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    trueBtnText: {
      type: String,
      required: true
    },
    falseBtnText: {
      type: String,
      required: true
    },
    dialogState: {
      type: Boolean,
      default: false
    },
    persistent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: this.dialogState
    };
  },
  methods: {
    choose(choice) {
      this.dialog = false;
      this.$emit("chosenAction", choice);
    },
    toggle(){
      this.dialog = !this.dialog;
    }
  }
};
</script>