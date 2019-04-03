<template>
  <v-flex grow pa-5 xs3>
    <v-card hover ripple to="/survey" class="rouned-card">
      <!--<v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>-->
      <v-card-media>
        <v-layout align-space-around justify-space-between column fill-height pa-3>
          <v-img :src="require('@/assets/img/illustrations/IP.svg')" width="100%"></v-img>
        </v-layout>
      </v-card-media>

      <v-card-title primary-title>
        <v-layout align-center justify-center column>
          <h3 class="headline mb-0">Privacy</h3>
        </v-layout>
      </v-card-title>
    </v-card>
  </v-flex>
</template>
<style lang="stylus">
.rouned-card{
  border-radius:35px;
}
</style>
