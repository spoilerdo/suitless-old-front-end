<template>
    <v-form data-vv-scope="GenericForm" @submit.prevent>
        <v-layout column>
            <h6 class="subheading">Text you want see in the node</h6>
            <v-text-field
                label="Node text"
                v-model="form.nodeName"
                v-validate="'required'"
                name="node text"
                counter="25"
                maxlength="25"
                @change="changeProps"
            />
            <span>{{ errors.first('GenericForm.node text') }}</span>
            <h6 class="subheading">{{nameLabel}}</h6>
            <v-textarea
                v-model="form.name"
                auto-grow
                box
                color="primary"
                :label="nameLabel"
                rows="1"
                v-validate="'required'"
                :name="nodeName"
                counter="255"
                maxlength="255"
                @change="changeProps"
            />
            <span>{{ errors.first(`GenericForm.${nodeName}`) }}</span>
        </v-layout>
    </v-form>
</template>

<script>
import { mapState } from 'vuex';

/**
 * Generic flowchart form view.
 * @memberof component.FlowchartForm
 */
export default {
    props: {
        nameLabel: {
            type: String,
            required: true
        },
        nodeName: {
            type: String,
            required: true
        },
        lincDataName: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            form: {
                nodeName: "",
                name: ""
            }
        }
    },
    computed: {
        ...mapState("flowcharteditor/", ["selectedCell", "formatBarType"])
    },
    methods: {
        changeProps(){
            this.$emit("onChange", this.form);
        },
        checkIfValid(){
            this.$validator.validateAll("GenericForm").then(valid => {
                this.$emit("validated", valid);
            })
        }
    },
    watch: {
        selectedCell: function(newValue) {
            if(newValue){
                this.form.nodeName = newValue.value;
                if(newValue.lincData.length > 0 && newValue.lincData.find(data => data.key === this.lincDataName)){
                    this.form.name = newValue.lincData.find(data => data.key === this.lincDataName).value;
                } else {
                    this.form.name = "";
                }
            }
        }
    }
}
</script>
