<template>
  <v-navigation-drawer
    id="app-drawer"
    :mini-variant="drawerOpen"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img :src="backgroundImage" height="100%">
      <v-layout class="fill-height" tag="v-list" column>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-hover>
              <v-img
                :src="logoehvlinc"
                fill
                @click="$router.push('/')"
                slot-scope="{ hover }"
                class="mx-auto"
                :class="`elevation-${hover ? 12 : 2}`"
              />
            </v-hover>
          </v-list-tile-avatar>
          <v-flex v-if="!drawerOpen" style="display: flex; justify-content: center;">
            <v-list-tile-title class="title">ehvLINC</v-list-tile-title>
            <v-icon
              v-if="window.width > 991"
              style="padding-right: 50px;"
              @click="toggleMini()"
            >mdi-chevron-left</v-icon>
          </v-flex>
        </v-list-tile>
        <v-divider />
        <v-list-tile v-if="responsive">
          <v-text-field class="purple-input search-input" label="Search..." color="purple" />
        </v-list-tile>
        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          active-class="primary"
          avatar
          class="v-list-item"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-if="!drawerOpen" v-text="link.text" />
        </v-list-tile>
        <v-list-tile v-if="drawerOpen">
          <v-icon
            v-if="window.width > 991"
            @click="toggleMini()"
            style="margin: 0px 15px"
          >mdi-chevron-right</v-icon>
        </v-list-tile>
        <v-list-tile
          disabled
          active-class="primary"
          class="v-list-item v-list__tile--buy"
          to="/upgrade"
        ></v-list-tile>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// @ is an alias to /src
import { createNamespacedHelpers } from "vuex";
//can be used if you will only need to access ONE module in this component, will auto append /app before actions.
const { mapState, mapActions } = createNamespacedHelpers("app/");

/**
 * Returns the drawer that is used in the dashboard.
 * @memberof component.Core
 */
export default {
  data: function() {
    return {
      links: [],
      logoehvlinc: require("@/assets/img/logoehvlinc.png"),
      backgroundImage: require("@/assets/img/BackgroundMenu.png"),
      responsive: false,
      window: {
        width: 0,
        height: 0
      }
    };
  },
  computed: {
    ...mapState(["drawerOpen"])
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },
  beforeMount() {
    this.links.push({
      to: "dashboard",
      icon: "mdi-view-dashboard",
      text: "dashboard"
    });

    this.links.push({
      to: "profile",
      icon: "mdi-account",
      text: "my profile"
    })

    this.links.push({
      to: "flowchart",
      icon: "mdi-square-edit-outline",
      text: "flowchart editor"
    });

    this.links.push({
      to: "cdn",
      icon: "mdi-folder-multiple-image",
      text: "file manager"
    });

    this.links.push({
      to: "log",
      icon: "mdi-script-text",
      text: "log manager"
    });
  },
  methods: {
    ...mapActions(["setDrawer"]),
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    },

    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;

      if (this.window.width < 991) this.mini = false;
    },

    toggleMini() {
      this.setDrawer(!this.drawerOpen);
    }
  }
};
</script>

<style lang="scss">
#app-drawer {
  .v-list__tile {
    border-radius: 4px;

    &--buy {
      margin-top: auto;
      margin-bottom: 17px;
    }
  }

  .v-image__image--contain {
    top: 9px;
    height: 60%;
  }

  .search-input {
    margin-bottom: 30px !important;
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
