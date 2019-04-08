<template>
  <v-app>
    <Toolbar v-if="!newUser"/>
    <!--<Drawer/> -->

    <CoreView />
  </v-app>
</template>

<script>
// @ is an alias to /src
import { createNamespacedHelpers } from 'vuex';
//can be used if you will only need to access ONE module in this component, will auto append /app before actions.
const { mapState, mapActions } = createNamespacedHelpers('app/')

//import Drawer from './components/core/Drawer'
import CoreView from './components/core/View'
import Toolbar from './components/core/Toolbar'


export default {
  components: {
      Toolbar,
      //Drawer,
      CoreView
  },
  computed: {
      ...mapState(['newUser']),
  }
}
</script>


<style lang="scss">
@import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>

