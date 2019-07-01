<template>
    <v-layout row justify-center>
        <v-form>
            <v-layout column>
                <h6 class="subheading">An answer for the question</h6>
                <v-textarea
                    v-model="form.answer"
                    auto-grow
                    box
                    color="primary"
                    label="Answer"
                    rows="1"
                    v-validate="'required'"
                    name="answer"
                />
                <span>{{ errors.first('answer') }}</span>
                <h6 class="subheading">Implication of the answer</h6>
                <v-textarea
                    v-model="form.implication"
                    auto-grow
                    box
                    color="primary"
                    label="Implication"
                    rows="1"
                    name="implication"
                />
                <h6 class="subheading">Select the implication level</h6>
                <v-layout align-center justify-center row>
                    <v-btn
                        flat
                        icon
                        color='default'
                        v-bind:class="{selectedColor: form.implicationColor == theme.default}"
                        @click="setSelected('default', theme.default)"
                    >
                        <v-icon>mdi-checkbox-blank</v-icon>
                    </v-btn>
                    <v-btn 
                        flat 
                        icon 
                        color="success" 
                        v-bind:class="{selectedColor: form.implicationColor == theme.success}"
                        @click="setSelected('success', theme.success)"
                    >
                        <v-icon>mdi-checkbox-blank</v-icon>
                    </v-btn>
                    <v-btn 
                        flat 
                        icon 
                        color="info"
                        v-bind:class="{selectedColor: form.implicationColor == theme.info}"
                        @click="setSelected('info', theme.info)"
                    >
                        <v-icon>mdi-checkbox-blank</v-icon>
                    </v-btn>
                    <v-btn 
                        flat 
                        icon 
                        color="warning"
                        v-bind:class="{selectedColor: form.implicationColor == theme.warning}"
                        @click="setSelected('warning', theme.warning)"
                    >
                        <v-icon>mdi-checkbox-blank</v-icon>
                    </v-btn>
                    <v-btn 
                        flat 
                        icon 
                        color="primary"
                        v-bind:class="{selectedColor: form.implicationColor == theme.primary}"
                        @click="setSelected('primary', theme.primary)"
                    >
                        <v-icon>mdi-checkbox-blank</v-icon>
                    </v-btn>
                </v-layout>
            </v-layout>
            <v-layout align-center justify-center row>
                <v-btn color="primary" @click="changeEdge(form.answer, form.implication, form.implicationLevel, form.implicationColor)">Apply</v-btn>
            </v-layout>
        </v-form>
    </v-layout>
</template>

<style scoped>
.selectedColor {
    background-color: rgb(238, 238, 238);
}
</style>


<script>
import { mapState } from 'vuex';
import theme from "@/plugins/vuetify/theme";

/**
 * View used for 'Edge' cells.
 * @memberof component.FlowchartForm
 */
export default {
    data() {
        return {
            form: {
                answer: null,
                implication: null,
                implicationLevel: null,
                implicationColor: null
            },
            theme
        }
    },
    computed: {
        ...mapState("flowcharteditor/", ["selectedCell", "formatBarType"])
    },
    methods: {
        setSelected(selected, color){
            this.form.implicationLevel = selected;
            this.form.implicationColor = color;
        }
    },
    watch: {
        selectedCell: function(newValue, oldValue) {
            if(newValue != null && this.formatBarType == this.$data.nodeEnum.Edge && newValue.lincData.length > 0){
                this.form.answer = newValue.value;
                this.form.implication = newValue.lincData[0].value;
                this.form.implicationLevel = newValue.lincData[1].value;
            }
        }
    }
}
</script>
