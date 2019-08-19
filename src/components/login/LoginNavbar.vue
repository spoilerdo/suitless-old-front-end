<template>
  <v-flex text-xs-right justify-center class="margin">
    <v-btn v-if="token" to="/dashboard" small class="primary">Dashboard</v-btn>
    <v-btn v-else to="/login" small class="primary">Login</v-btn>
  </v-flex>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("login/");

/**
 * Returns the Login navbar
 * @memberof component.Login
 */
export default {
  computed:{
    ...mapState(["token"])
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


