<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Update or Upload?</v-card-title>

      <v-card-text>A file with that name already exists. Do you want update it or upload as a new file?</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="info" flat @click="updateFile(serviceable, callback)">Update</v-btn>

        <v-btn color="info" flat @click="uploadFile(serviceable, callback)">Upload</v-btn>
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
            callback: null,
        }
    },
    computed: {
        ...mapState("cdn/", ["serviceableExists", "newServiceable"])
    },
    methods: {
        ...mapActions("cdn/", ["uploadServiceable", "updateServiceable", "checkServiceableExists"]),
        tryUploadingNewServiceable(data, cb){
            this.serviceable = data;
            this.callback = cb;
            this.checkServiceableExists(data.name).then(() => {
                if(this.serviceableExists){
                    //the file already exists so open the dialog and let the use choose to update the file
                    this.dialog = true;
                }else{
                    this.uploadFile(data, cb);
                }
            })
        },
        uploadFile(data, cb){
            this.dialog = false;
            this.uploadServiceable({
                file: data.file,
                name: data.name,
                type: data.type
            }).then(() => {
                cb(this.newServiceable);
            });            
        },
        updateFile(data, cb){
            this.dialog = false;
            this.updateServiceable({
                file: data.file,
                name: data.name,
                type: data.type
            }).then(cb(this.newServiceable));
        }
    }
};
</script>
