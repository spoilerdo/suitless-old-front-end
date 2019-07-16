<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Update or Upload?</v-card-title>

      <v-card-text>A file with that name already exists. Do you want update it or upload as a new file?</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="info" flat @click="updateFile(serviceable)">Update</v-btn>

        <v-btn color="info" flat @click="uploadFile(serviceable)">Upload</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";

/**
 * Universal uploader and updater of serviceables.
 * The dialog will be shown whenever a serviceable can be updated or created.
 * Otherwise this component will just call a uploadServiceable method.
 */
export default {
    data(){
        return {
            dialog: false,
            serviceable: null,
        }
    },
    computed: {
        ...mapState("cdn/", ["serviceableExists"])
    },
    methods: {
        ...mapActions("cdn/", ["uploadServiceable", "updateServiceable", "checkServiceableExists"]),
        tryUploadingNewServiceable(data){
            this.serviceable = data;
            this.checkServiceableExists(data.name).then(() => {
                if(this.serviceableExists){
                    //the file already exists so open the dialog and let the use choose to update the file
                    this.dialog = true;
                }else{
                    this.uploadFile(data);
                }
            })
        },
        uploadFile(data){
            this.dialog = false;
            this.uploadServiceable({
                file: data.file,
                name: data.name,
                type: data.type
            });
        },
        updateFile(data){
            this.dialog = false;
            this.updateServiceable({
                file: data.file,
                name: data.name,
                type: data.type
            });
        }
    }
};
</script>
