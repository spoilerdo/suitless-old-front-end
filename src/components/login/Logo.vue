<template>
      <v-img :src="logo" :aspect-ratio="aspectratio" contain>
        <template v-slot:placeholder>
          <v-layout>
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-layout>
        </template>
      </v-img>
</template>

<script>
/**
 * Returns the logo used on the login page.
 * @memberof component.Login
 */
export default {
    name:"logo",
    data() {
      return{
        logo: require("@/assets/img/logoehvlinc.png")
      }
    },
    props: {
        aspectratio: {
            type: String,
            required: true
        },
    }  
}
</script>

