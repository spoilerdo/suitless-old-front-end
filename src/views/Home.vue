<template>
  <div class="home">
    <v-container grid-list-md fluid>
      <v-layout row wrap>
        <v-flex 
        xs12
        md6
        lg3
        v-for="newsitem in newsItems"
        :key="newsitem.id"
        >
          {{ newsitem.title }}
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { createNamespacedHelpers } from 'vuex';
//can be used if you will only need to access ONE module in this component, will auto append /news before actions.
const { mapState, mapActions,mapGetters } = createNamespacedHelpers('news/')


export default {
  name: 'home',
  computed: mapState({
    newsItems: state => state.items,
    ...mapGetters([
      'getNewsById'
    ])
  }),
  methods: {
    ...mapActions([
      'getAllNews'
    ])
  },
  beforeMount() {
    this.getAllNews();
  }
}
</script>
