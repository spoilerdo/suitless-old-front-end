<template>
    <v-dialog v-model="dialog" :persistent="persistentdialog" max-width="500">
        <v-card>
            <v-card-title class="headline">{{header}}</v-card-title>
            <v-card-text>{{text}}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat @click="goToSurvey">{{buttontext}}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return{
            dialog: false
        }
    },
    methods: {
        ...mapActions("profile/", ["addProfile"])
    },
    props: {
        header: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: false
        },
        buttontext: {
            type: String,
            required: false
        },
        persistentdialog: {
            type: Boolean,
            required: false,
        }

    },
    methods: {
        goToSurvey() {
            this.dialog = false;
            this.$router.push("/survey/5cb70bd33fc9910008f9f2f3");
            this.addProfile("profieltest");
        }
    }
}
</script>

