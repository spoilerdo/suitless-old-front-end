<template>
    <v-layout row justify-center>
        <v-form>
            <v-layout column>
                <h6 class="subheading">Text you want see in the node</h6>
                <v-text-field
                    label="Node text"
                    v-model="form.notificationNode"
                    v-validate="'required'"
                    name="node text"
                />
                <span>{{ errors.first('node text') }}</span>
                <h6 class="subheading">The name of the notification</h6>
                <v-textarea
                    v-model="form.name"
                    auto-grow
                    box
                    color="primary"
                    label="Notification"
                    rows="1"
                    v-validate="'required'"
                    name="notification"
                />
                <span>{{ errors.first('notification') }}</span>
            </v-layout>
            <v-layout align-center justify-center row>
                <v-btn color="primary" @click="genericChangeNode(form.moduleNode, form.name)">Apply</v-btn>
            </v-layout>
        </v-form>
    </v-layout>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data(){
        return {
            form: {
                notificationNode: null,
                name: null
            }
        }
    }
}
</script>
