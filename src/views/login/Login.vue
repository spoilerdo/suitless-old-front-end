<template>
  <v-container class="pa10">
    <v-layout row wrap>
      <v-flex md6 sm8 xs12>
        <materialCard color="primary" title="Student Legal Health Check" :text="loginText">
          <Alert :value="alert.message !=''" :type="alert.type" outline :text="alert.message"></Alert>

          <div v-show="loggingIn">
            <Form email password name="loginForm" ref="loginForm" :onclick="loginUser"/>

            <v-btn id="btn_login" @click="$refs.loginForm.validatedSubmit()" mx-2 color="primary">Login</v-btn>
            <v-btn v-on:click="switchForms(false)" mx-2 color="grey">Create New Account</v-btn>
            <v-spacer/>
            <a href="#" style="color: grey;">Forgot your password?</a>
          </div>

          <div v-show="!loggingIn">
            <Form
              email
              password
              firstname
              lastname
              confirmpassword
              name="registerForm"
              ref="registerForm"
              :onclick="registerUser"
              :callback="successfulRegister"
            />

            <v-btn @click="$refs.registerForm.validatedSubmit()" mx2 color="primary">Register</v-btn>
            <v-btn
              v-on:click="switchForms(true)"
              class="mx-2"
              color="grey"
            >Login To Existing Account</v-btn>
            <v-spacer/>
            <a href="#" style="color: grey">Forgot your password?</a>
          </div>
        </materialCard>
      </v-flex>
      <v-flex md2 sm2 xs0 offset-sm1 offset-md3 color="primary" pt-1>
        <Logo aspectratio="0.73"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import materialCard from "@/components/material/Card";
import Form from "@/components/login/LoginForm";
import Logo from "@/components/login/Logo";
import Alert from "@/components/material/Alert";
import { mapState, mapActions } from "vuex";

/**
 * Returns the login page, where the user can login or register
 * @memberof view
 */
export default {
  name: "login",
  components: {
    Form,
    Logo,
    Alert,
    materialCard
  },
  data() {
    return {
      //form states can and should be stored locally, only vuex mutations should be allowed to mutate a vuex state, and v-model changes state also on every keybind.
      loginForm: {
        email: null,
        password: null
      },
      registerForm: {
        email: null,
        firstName: null,
        lastName: null,
        password: null,
        confirmPassword: null
      }
    };
  },
  computed: {
    ...mapState("login/", ["loggingIn", "loginText", "alert"])
  },
  methods: {
    ...mapActions("login/", ["registerUser", "loginUser", "switchForms"]),
    ...mapActions("app/", ["setBackground"]),
    successfulRegister() {
      //switch to login page on successful login
      this.switchForms(true);
    }
  },
  beforeMount() {
    this.setBackground("header-bg.jpg");
  }
};
</script>