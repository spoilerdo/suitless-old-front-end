<template>
  <v-footer id="core-footer" absolute height="50">
    <div class="footer-items">
      <span v-for="link in links" :key="link.name">
        <a :href="link.Link" class="footer-links" :style="{color: footerColor}">{{ link.name }}</a>
      </span>
    </div>

    <v-spacer />
    <span class="font-weight-light copyright" :style="{color: footerColor}">
      &copy;
      {{ (new Date()).getFullYear() }}
      <a
        href="https://www.eindhovenlinc.com/"
        target="_blank"
        :style="{color: footerColor}"
      >ehvLINC</a>
    </span>
  </v-footer>
</template>

<style scope>
#core-footer {
  z-index: 0;
  padding: 0;
  height: 5vh !important;
  display: flex;
  flex-direction: row;
}
</style>

<script>
//import { mapState, mapGetters } from "vuex";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("app/");
const { mapGetters } = createNamespacedHelpers("login/");

/**
 * Returns the footer with links to other places.
 * @memberof component.Core
 */
export default {
  data: () => ({
    links: [{ name: "Landing", Link: "/" }, { name: "Login", Link: "/login" }],
    calculatedColor: ""
  }),
  computed: {
    ...mapState(["footerColor"]),
    ...mapGetters(["isAuthenticated"])
  },
  mounted() {
    if (this.isAuthenticated) {
      this.links = [
        { name: "Landing", Link: "/" },
        { name: "Logout", Link: "/profile" },
        { name: "Dashboard", Link: "/dashboard" }
      ];
    } else {
      this.links = [
        { name: "Landing", Link: "/" },
        { name: "Login", Link: "/login" }
      ];
    }
  }
};
</script>
