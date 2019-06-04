<template>
    <v-layout row justify-center>
        <v-form>
            <v-layout column>
                <h6 class="subheading">Multiple choice Title</h6>
                <v-text-field
                    v-model="form.multipleChoiceNode"
                    label="Title"
                    v-validate="'required'"
                    name="title"
                />
                <span>{{ errors.first('title') }}</span>
                <h6 class="subheading">The question you want to ask</h6>
                <v-textarea
                    v-model="form.multipleChoice"
                    auto-grow
                    box
                    color="primary"
                    label="Question"
                    rows="1"
                    v-validate="'required'"
                    name="question"
                />
                <span>{{ errors.first('question') }}</span>
                <h6 class="subheading">The amount of choices</h6>
                <v-text-field
                    v-model="form.amountOfChoices"
                    type="number"
                    :value="form.amountOfChoices"
                    v-validate="'required'"
                    name="amount of choices"
                />
                <span>{{ errors.first('amount of choices') }}</span>
            </v-layout>
            <v-layout align-center justify-center row>
                <v-btn color="primary" @click="changeMultipleChoiceNode(form.multipleChoiceNode, form.multipleChoice, form.amountOfChoices)">Apply</v-btn>
            </v-layout>
        </v-form>
    </v-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            form: {
                multipleChoiceNode: null,
                multipleChoice: null,
                amountOfChoices: 3
            }
        }
    },
    computed: {
        ...mapState("flowcharteditor/", ["selectedCell", "formatBarType"])
    },
    watch: {
        selectedCell: function(newValue, oldValue) {
            if(newValue != null && this.formatBarType == this.$data.nodeEnum.MultipleChoice){
                this.form.multipleChoiceNode = newValue.value;
                this.form.multipleChoice = newValue.lincData[0].value;
                console.log(newValue);
                this.form.amountOfChoices = newValue.children;
            }
        }
    }
}
</script>
