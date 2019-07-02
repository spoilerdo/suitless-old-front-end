<template>
    <v-layout row justify-center>
        <v-form>
            <GenericView
                nameLabel="Question"
                @onChange="changeProps"
            />
            <v-layout align-center justify-center row>
                <v-btn color="primary" @click="genericChangeNode(form.nodeName, form.name)">Apply</v-btn>
            </v-layout>
        </v-form>
    </v-layout>
</template>

<script>
import { mapState } from 'vuex';
import GenericView from "./genericView/GenericView";

/**
 * View used for 'Choice' cells.
 * @memberof component.FlowchartForm
 */
export default {
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
    components: {
        GenericView
    },
    methods: {
        changeProps(newForm){
            this.form = newForm;
        }
    },
    watch: {
        selectedCell: function(newValue, oldValue) {
            if(newValue != null && this.formatBarType == this.$data.nodeEnum.Choice && newValue.lincData.length > 0){
                this.form.nodeName = newValue.value;
                this.form.name = newValue.lincData.find(data => data.key === "choice").value;
            }
        }
    }
}
</script>