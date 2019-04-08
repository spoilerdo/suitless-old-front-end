<template>
  <v-form v-model="valid" class="ServiceableTopbar">
    <v-container>
      <v-layout>
        <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="10"
            label="name"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="type"
            :rules="nameRules"
            :counter="10"
            label="type"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="FILEUPLOAD"
            label="FILE"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      valid: false,
      name: '',
      type: '',
      nameRules: [
        v => !!v || 'this is required'
      ],
      FILE: ''
    })
  }
</script>

<style>
.ServiceableTopbar{
  background: white;
}
</style>
