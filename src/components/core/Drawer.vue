<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img
      :src="backgroundImage"
      height="100%"
    >
      <v-layout
        class="fill-height"
        tag="v-list"
        column
      >
        <v-list-tile avatar>
          <v-list-tile-avatar
          >
            <v-img
              :src="logoehvlinc"
              fill
            />
          </v-list-tile-avatar>
          <v-list-tile-title class="title">
            ehvLINC
          </v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <v-list-tile
          v-if="responsive"
        >
          <v-text-field
            class="purple-input search-input"
            label="Search..."
            color="purple"
          />
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
          <v-list-tile-title
            v-text="link.text"
          />
        </v-list-tile>
        <v-list-tile
          disabled
          active-class="primary"
          class="v-list-item v-list__tile--buy"
          to="/upgrade"
        >
        </v-list-tile>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// @ is an alias to /src
import { createNamespacedHelpers } from 'vuex';
//can be used if you will only need to access ONE module in this component, will auto append /app before actions.
const { mapState, mapActions } = createNamespacedHelpers('app/')

export default {
  data: function() {
    return {
      links: [],
      logoehvlinc: require("@/assets/logoehvlinc.png"),
      backgroundImage: require("@/assets/BackgroundMenu.png"),
      responsive: false
    };
  },
  computed: {
      ...mapState(['drawerOpen']),
      inputValue: {
        get () {
          return this.drawerOpen
        },
      set (val) {
        this.setDrawer(val)
      }
    },
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  beforeMount() {
    this.$router.options.routes.forEach(route => {
      this.links.push({
          to: route.path,
          icon: route.icon,
          text: route.name
      })
    })
  },
  methods: {
    ...mapActions([
      'setDrawer',
    ]),
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  }
}
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
