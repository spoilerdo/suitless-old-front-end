<template>
  <v-app>
    <!--<Toolbar/> -->

    <Drawer/>

    <CoreView />
  </v-app>
</template>

<script>
import Drawer from './components/core/Drawer'
import CoreView from './components/core/View'
import Toolbar from './components/core/Toolbar'


export default {
  components: {
      Toolbar,
      Drawer,
      CoreView
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

