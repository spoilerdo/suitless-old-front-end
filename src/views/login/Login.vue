<style>
    body{
        background-image: url("../../assets/img/header-bg.jpg");
    }
    .theme--light.application{
        background: transparent !important;
    }
</style>

<template>
  <v-container style="display:block">
    <v-layout justify-end>
      <v-flex xs3 style="padding-right:20px">
        <v-img :src="'http://www.eindhovenlinc.com/img/logos/logo.png'" aspect-ratio="0.73">
          <template v-slot:placeholder>
            <v-layout>
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-layout>
          </template>
        </v-img>
      </v-flex>
    </v-layout>
    <v-flex md10 lg5 style="position: absolute; top: 15%; padding-right:20px;">
      <material-card color="primary" title="Student Legal Health Check" :text="loginText">
        <v-alert v-if="alert.Visible" :type="alert.Type" outline>{{alert.Message}}</v-alert>
        <v-form v-if="LoggingIn" lazy-validation>
          <v-layout column>
            <v-text-field label="Email" v-model="loginForm.Email" :rules="emailRules" required></v-text-field>

            <v-text-field
              label="Password"
              v-model="loginForm.Password"
              :rules="passwordRules"
              required
              :type="'password'"
            ></v-text-field>
          </v-layout>
          <v-btn :disabled="buttonDisabled" v-on:click="login(loginForm)" mx-2 color="primary">Login</v-btn>
          <v-btn v-on:click="switchForms()" mx-2 color="grey">Create New Account</v-btn>
          <a href="http://ironsm4sh.nl" style="color: grey">Forgot your password?</a>
        </v-form>

        <v-form v-else lazy-validation>
          <v-layout column>
            <v-text-field label="Email" v-model="registerForm.Email" :rules="emailRules" required></v-text-field>

            <v-text-field
              label="First Name"
              v-model="registerForm.FirstName"
              :rules="nameRules"
              required
            ></v-text-field>

            <v-text-field
              label="Last Name"
              v-model="registerForm.LastName"
              :rules="nameRules"
              required
            ></v-text-field>

            <v-text-field
                ref="password"
                label="Password"
                v-model="registerForm.Password"
                :rules="passwordRules"
                v-validate="'required|min:8'"
                required
                type='password'
            ></v-text-field>

            <v-text-field
              label="Confirm Password"
              v-model="registerForm.ConfirmPassword"
              :rules="passwordRules"
              v-validate="`confirmed:password`"
              required
              type="password"
            ></v-text-field>
          </v-layout>
          <v-btn
            :disabled="buttonDisabled"
            v-on:click="register(registerForm)"
            mx2
            color="primary"
          >Register</v-btn>
          <v-btn v-on:click="switchForms()" class="mx-2" color="grey">Login To Existing Account</v-btn>
          <a href="http://ironsm4sh.nl" style="color: grey">Forgot your password?</a>
        </v-form>
      </material-card>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    switchForms() {
      this.alert.Visible = false;
      if (this.loginIn) {
        this.loginText = "Register";
        this.loginIn = false;
      } else {
        this.loginText = "Login";
        this.loginIn = true;
      }
    },

    register(e) {
      if (e.Password == e.ConfirmPassword) {
        this.alert.Type = "success";
        this.alert.Message = "Succesfully created account";
        this.alert.Visible = true;
      } else {
        this.alert.Type = "error";
        this.alert.Message = "Passwords do not match";
        this.alert.Visible = true;
      }
    }
  }
};
</script>