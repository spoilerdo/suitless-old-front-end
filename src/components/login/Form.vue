<template>
    <v-form :data-vv-scope="name">
        <v-layout column>
            <!-- firstname input -->
            <v-text-field v-if="firstname" label="FirstName" v-model="form.firstName" v-validate="'required|alpha'" name="firstname"/>
            <span v-if="firstname">{{ errors.first(`${name}.firstname`) }}</span>
            <!-- /firstname input -->

            <!-- lastname input --> 
            <v-text-field v-if="lastname" label="Last Name" v-model="form.lastName" v-validate="'required|alpha'" name="lastname"></v-text-field>
            <span v-if="lastname">{{ errors.first(`${name}.lastname`)}}</span>
            <!-- /lastname input-->

            <!-- email input -->
            <v-text-field v-if="email" label="Email" v-model="form.email" v-validate="'required|email'" name="email"></v-text-field>
            <span v-if="email">{{ errors.first(`${name}.email`) }}</span>
            <!-- /email input -->

            <!-- password input -->
            <v-text-field
                v-if="password"
                ref="password"
                label="Password"
                v-model="form.password"
                v-validate="'required|min:8'"
                type='password'
                name="password"
              ></v-text-field>
              <span v-if="password">{{ errors.first(`${name}.password`)}}</span>
            <!-- /password input -->

            <!-- confirm password input -->
            <v-text-field
                v-if="confirmpassword"
                label="Confirm Password"
                v-model="form.confirmPassword"
                v-validate="'required|confirmed:password'"
                type="password"
                name="confirm_password"
              ></v-text-field>
              <span v-if="confirmpassword">{{ errors.first(`${name}.confirm_password`)}}</span>
            <!-- /confirm password input -->


        </v-layout>
    </v-form>
</template>

<script>
export default {
    name: "Form",
    data() {
        return {
            form: {
                email: null,
                firstName: null,
                lastName: null,
                password: null,
                confirmPassword: null
            }
        }
    },
    props: {
        onclick: {
            type: Function,
            required: true
        },
        callback: {
            type: Function,
            required: false
        },
        name: {
            type: String,
            required: true
        },
        email: Boolean,
        firstname: Boolean,
        lastname: Boolean,
        password: Boolean,
        confirmpassword: Boolean
    },
    methods: {
        validatedSubmit() {
            this.$validator.validateAll(this.name).then(valid => {
                if(valid) {
                    this.onclick(this.form);
                    if(this.callback != null) {
                        this.callback();
                    }
                }
            });
        }
    }
}
</script>

