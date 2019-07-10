<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="headline">Disclaimer</v-card-title>
      <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="secondary darken-1" flat @click="choose(false)">Disagree</v-btn>

        <v-btn color="info darken-1" flat @click="choose(true)">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dialog: true
      }
    },
    methods: {
        choose(choice){
            this.dialog = false;
            this.$emit('agreeDisclaimer', choice);
        }
    }
  }
</script>