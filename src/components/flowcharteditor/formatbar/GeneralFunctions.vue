<template>
    <v-layout row justify-center>
        <v-form>
            <v-layout column>
                <h5 class="headline"></h5>
                <v-text-field
                    label="Flowchart Name"
                    v-model="form.tile"
                    v-validate="'required'"
                    name="moduleName"
                />
                <v-textarea
                    v-model="form.description"
                    auto-grow
                    box
                    color="primary"
                    label="Description"
                    rows="1"
                />
            </v-layout>
            <v-layout align-center justify-center row>
                <v-btn color="primary" @click="saveFlowchart(form.title, form.question)">Save</v-btn>
                <v-btn color="primary" @click="setDialog(true)">Import</v-btn>
                <v-btn color="primary" >Test</v-btn>
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
                title: null,
                description: null
            }
        }
    },
    methods: {
        ...mapActions("flowcharteditor/", "setDialog")
    }
}
</script>
