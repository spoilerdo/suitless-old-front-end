<template>
  <v-flex text-xs-right justify-center class="margin">
    <v-btn v-if="isAuthenticated" to="/dashboard" small class="primary">Dashboard</v-btn>
    <v-btn v-else to="/login" small class="primary">Login</v-btn>
  </v-flex>
</template>

<script>
import { mapGetters } from "vuex";

/**
 * Returns the Login navbar
 * @memberof component.Login
 */
export default {
  computed:{
    ...mapGetters("login/", ["isAuthenticated"])
  }
};
</script>

<style>
.margin {
  padding-right: 20px;
  padding-top: 10px;
  margin-bottom: -10px;
}
</style>


