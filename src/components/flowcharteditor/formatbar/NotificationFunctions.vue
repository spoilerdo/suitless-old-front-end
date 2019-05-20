<template>
    <v-layout row justify-center>
        <v-form>
            <GenericView
                nameLabel="Notification"
                @onChange="changeProps"
            />
            <v-layout align-center justify-center row>
                <v-btn color="primary" @click="genericChangeNode(form.nodeName, form.name)">Apply</v-btn>
            </v-layout>
        </v-form>
    </v-layout>
</template>

<script>
import GenericView from "./genericView/GenericView";

export default {
    data(){
        return {
            form: {
                nodeName: null,
                name: null
            }
        }
    },
    components: {
        GenericView
    },
    methods: {
        changeProps(newForm){
            this.form = newForm;
        }
    }
}
</script>
