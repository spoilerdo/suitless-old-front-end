<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Open flowchart</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-form>
                  <v-layout column>
                    <v-text-field
                      label="Survey Name"
                      v-model="form.moduleName"
                      v-validate="'required'"
                      name="moduleName"
                    />
                    <span>{{ errors.first('moduleName') }}</span>
                  </v-layout>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="setDialog(false)">Close</v-btn>
          <v-btn color="primary" @click="importFlowchart">Import</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        moduleName: null
      }
    };
  },
  computed: {
    ...mapState("flowcharteditor/", ["dialog", "flowchart"])
  },
  methods: {
    ...mapActions("flowcharteditor/", ["setDialog", "getFlowchartByName"]),
    importFlowchart(surveyName){
      this.setDialog(false);

      this.getFlowchartByName(this.form.moduleName)
        .then((req => {
          this.setFlowchart();
        }));
    },
    setFlowchart(){
      console.log("Set flowchart");
      this.setFlowchartState(this.flowchart.module);
    },
    validatedSubmit() {
      this.$validator.validateAll().then(valid =>{
        if(valid){
          //apiCall with this.form to get survey/flowchart by name
        }
      })
    }
  }
};
</script>
