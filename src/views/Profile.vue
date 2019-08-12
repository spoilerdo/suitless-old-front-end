<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout align-space-around justify-start column fill-height>
      <Drawer v-if="role == 'ADMIN'" />
        <Card color="primary" title="My Profile" text="All your profile info">
            <v-flex xs12 md4>
              <h5 class="headline">Mail adress:</h5>
              <p class="subtitle-1">{{ mailAdress }}</p>
            </v-flex>
            <v-flex xs12 text-xs-right>
              <v-btn class="mx-0 font-weight-light" @click="logout()" color="primary">Logout</v-btn>
            </v-flex>
        </Card>
    </v-layout>
  </v-container>
</template>

<script>
import Card from "@/components/material/Card";
import Drawer from "@/components/core/Drawer";
import theme from "@/plugins/vuetify/theme";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    Card,
    Drawer
  },
  mounted() {
    this.role = this.token["scopes"];
    this.mailAdress = this.token["sub"];
  },
  data() {
    return {
      role: null,
      mailAdress: ""
    };
  },
  computed: {
    ...mapState("login/", ["token"])
  },
  created() {
    this.setFooterColor(theme.primary);
  },
  methods: {
    ...mapActions("app/", ["setFooterColor"]),
    ...mapActions("login/", ["logout"])
  },
  beforeDestroy() {
    this.setFooterColor("#fff");
  }
};
</script>
