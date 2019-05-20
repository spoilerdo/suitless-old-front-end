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
                    v-validate="'required'"
                    name="implication"
                />
                <span>{{ errors.first('implication') }}</span>
                <h6 class="subheading">Select the implication level</h6>
                <v-layout align-center justify-center row>
                    <v-btn 
                        flat 
                        icon 
                        color="success" 
                        v-bind:class="{selectedColor: form.implicationLevel == theme.success}"
                        @click="setSelected(theme.success)"
                    >
                        <v-icon>mdi-checkbox-blank</v-icon>
                    </v-btn>
                    <v-btn 
                        flat 
                        icon 
                        color="info"
                        v-bind:class="{selectedColor: form.implicationLevel == theme.info}"
                        @click="setSelected(theme.info)"
                    >
                        <v-icon>mdi-checkbox-blank</v-icon>
                    </v-btn>
                    <v-btn 
                        flat 
                        icon 
                        color="warning"
                        v-bind:class="{selectedColor: form.implicationLevel == theme.warning}"
                        @click="setSelected(theme.warning)"
                    >
                        <v-icon>mdi-checkbox-blank</v-icon>
                    </v-btn>
                    <v-btn 
                        flat 
                        icon 
                        color="primary"
                        v-bind:class="{selectedColor: form.implicationLevel == theme.primary}"
                        @click="setSelected(theme.primary)"
                    >
                        <v-icon>mdi-checkbox-blank</v-icon>
                    </v-btn>
                </v-layout>
            </v-layout>
            <v-layout align-center justify-center row>
                <v-btn color="primary" @click="changeEdge(form.answer, form.implication, form.implicationLevel)">Apply</v-btn>
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
import theme from "@/plugins/vuetify/theme";
export default {
    data() {
        return {
            form: {
                answer: null,
                implication: null,
                implicationLevel: null,
            },
            theme
        }
    },
    methods: {
        setSelected(selected){
            this.form.implicationLevel = selected;
        }
    }
}
</script>
