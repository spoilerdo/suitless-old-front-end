<template>
    <v-layout column>
        <h6 class="subheading">Text you want see in the node</h6>
        <v-text-field
            label="Node text"
            v-model="form.nodeName"
            v-validate="'required'"
            name="node text"
            @change="changeProps"
        />
        <span>{{ errors.first('node text') }}</span>
        <h6 class="subheading">The name of the {{nameLabel}}</h6>
        <v-textarea
            v-model="form.name"
            auto-grow
            box
            color="primary"
            :label="nameLabel"
            rows="1"
            v-validate="'required'"
            :name="nameLabel"
            @change="changeProps"
        />
        <span>{{ errors.first(nameLabel) }}</span>
    </v-layout>
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
        }
    },
    data(){
        return {
            form: {
                nodeName: null,
                name: null
            }
        }
    },
    computed: {
        ...mapState("flowcharteditor/", ["selectedCell", "formatBarType"])
    },
    methods: {
        changeProps(){
            this.$emit("onChange", this.form);
        }
    },
    watch: {
        selectedCell: function(newValue, oldValue) {
            if(newValue != null && newValue.lincData.length > 0){
                this.form.nodeName = newValue.value;
                this.form.name = newValue.lincData[0].value;
            }
        }
    }
}
</script>
