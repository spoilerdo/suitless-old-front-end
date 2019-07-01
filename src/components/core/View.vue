<template>
  <v-content>
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view/>
      </v-fade-transition>
    </div>
    <Footer/>
  </v-content>
</template>

<script>
import Footer from './Footer';

/**
 * Returns the core-view used in the root component
 * @memberof component.Core
 */
export default {
  components: {
    Footer
  },
  metaInfo () {
    return {
      title: 'Vuetify Material Dashboard by CreativeTim'
    }
  }
}
</script>

<style>
#core-view {
  padding-bottom: 50px;
  margin: 0;
  width: 100%;
  height: 100%;
}
html{
  overflow: auto;
}
</style>
