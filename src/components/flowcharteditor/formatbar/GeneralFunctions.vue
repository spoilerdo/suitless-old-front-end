<template>
    <v-layout row justify-center>
        <v-form>
            <v-layout column>
                <h5 class="headline">General flowchart information</h5>
                <v-text-field
                    label="Flowchart Name"
                    v-model="form.title"
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

                <v-btn id="btn_save_flowchart" color="primary" @click="prepareSaveFlowchart(form.title, form.description)">Save</v-btn>
                <v-btn id="btn_import_flowchart" color="primary" @click="setDialog(true)">Import</v-btn>
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
        ...mapActions("flowcharteditor/", ["setDialog", "saveFlowchart"]),
        prepareSaveFlowchart(name, description) {
            let flowchart = this.getFlowchart(name, description);

            this.saveFlowchart(flowchart).then(req => {
                if (req != undefined && req.module != null) {
                    this.showNotification("Flowchart saved!");
                } else {
                    this.showNotification("Error during flowchart save");
                }
            })
        }
    }
}
</script>
