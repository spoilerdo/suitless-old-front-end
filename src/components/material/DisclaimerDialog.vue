<template>
  <v-dialog v-model="dialog" persistent max-width="700" id="disclaimer-dialog">
    <v-card>
      <v-card-title class="headline">Disclaimer</v-card-title>
      <v-card-text>The Legal Healthcheck Platform is not your online lawyer. Therefore, the service itself and the information it provides shall not be seen as legal advice. Rather, the Legal Healthcheck platform is intended as educational tool for students and start-ups to obtain basic legal knowledge. EhvLINC cannot guarantee that the information provided on this website (including the reports that it generates) is correct and fully up-to-date. Usage of the Legal Healthcheck Platform is fully at your own risk. EhvLINC explicitly rejects all liability for direct, indirect, incidental or special damages arising out or relating to the access or use of the service. This includes, but not restricted to, loss or damage caused by usage of information by this website, inaccurate results, loss of profits, business interruption, loss of use of the service, the cost of substitute services or claims by third parties for any damages to computers, software, modems, telephones or other property.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="secondary darken-1" flat @click="choose(false)" id="disclaimer-disagree">Disagree</v-btn>

        <v-btn color="info darken-1" flat @click="choose(true)" id="disclaimer-agree">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: true
    };
  },
  methods: {
    choose(choice) {
      this.dialog = false;
      this.$emit("agreeDisclaimer", choice);
    }
  }
};
</script>