<template>
  <v-layout row justify-center>
    <v-dialog v-model="importDialog" persistent max-width="600px">
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
          <v-btn id="btn_cancel_import_flowchart_dialog" color="secondary" @click="setImportDialog(false)">Close</v-btn>
          <v-btn id="btn_import_flowchart_dialog" color="primary" @click="importFlowchart">Import</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";

/**
 * The form used in the flowchart editor.
 * @memberof component
 */
export default {
  data() {
    return {
      form: {
        moduleName: null
      }
    };
  },
  computed: {
    ...mapState("flowcharteditor/", ["importDialog", "flowchart"])
  },
  methods: {
    ...mapActions("flowcharteditor/", ["setImportDialog", "getFlowchartByName"]),
    importFlowchart() {
      this.setImportDialog(false);

      this.getFlowchartByName(this.form.moduleName).then(() => {
        this.setFlowchart();
      });
    },
    setFlowchart() {
      this.setFlowchartState(this.flowchart.module);
    }
  }
};
</script>