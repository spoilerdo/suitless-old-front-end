<template>
  <v-dialog v-model="fileDialog" @input="setFileDialog(false);" max-width="500">
    <v-card>
      <v-card-title class="headline">Image selector</v-card-title>

      <v-card-text>
        Select an image
        <div class="list-container">
          <v-list>
            <v-list-tile
              v-for="item in serviceables"
              :key="item.name"
              avatar
              ripple
              @click="selectImage(item)"
            >
              <v-list-tile-action>
                <v-icon v-if="selected === item" color="primary">mdi-checkbox-blank</v-icon>
                <v-icon v-else>mdi-checkbox-blank</v-icon>
              </v-list-tile-action>
              <v-list-tile-avatar size="50" tile>
                <img :src="images.find(image => image.name === item.name).url" />
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </div>Or upload image:
        <v-text-field label="Image name" v-model="image.name" prepend-icon="mdi-tag" />
        <ServiceableFilePicker v-on:Base64="setFile($event)" v-on:Type="setType($event)" />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <p v-if="selected != null">Selected image: {{selected.name}}</p>

        <v-btn color="primary" flat @click="useImage()">Use Image</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.list-container {
  height: 300px;
  overflow-y: scroll;
  margin-bottom: 5px;
}
</style>

<script>
import ServiceableFilePicker from "@/components/cdn/ServiceableFilePicker";
import { mapState, mapActions } from "vuex";

/**
 * Gives the option to upload an image or select an image that is already stored in the CDN server
 * @memberof component.CDN
 */
export default {
  components: {
    ServiceableFilePicker
  },
  computed: {
    ...mapState("cdn/", ["fileDialog", "serviceables", "newServiceable"])
  },
  data() {
    return {
      images: [
        {
          name: String,
          url: String
        }
      ],
      image: {
        file: "",
        type: "",
        name: ""
      },
      selected: null
    };
  },
  methods: {
    ...mapActions("cdn/", ["getAllData", "setFileDialog"]),
    setFile(file) {
      this.image.file = file;
    },
    setType(type) {
      this.image.type = type;
    },
    selectImage(image) {
      if (this.selected !== image) {
        this.selected = image;
      } else if (this.selected === image) {
        this.selected = null;
      }
    },
    useImage() {
      //if an image is selected use that image, otherwise upload the image from the serviceableFilePicker
      if (this.image.name === "" && this.selected == null) {
        this.showNotification("no name given for the image");
      } else {
        if (this.selected === null) {
          this.tryUploadingNewServiceable(this.image);
        } else{
          this.$emit("fileName", this.selected.name);
        }
        this.setFileDialog(false);
      }
    }
  },
  mounted() {
    this.getAllData();
  },
  watch: {
    serviceables: function(val) {
      val.forEach(file => {
        this.images.push({ name: file.name, url: file.baseURL });
      });
    },
    newServiceable: function(val) {
      let imageName = val.serviceable.tag;
      this.$emit("fileName", imageName);
    }
  }
};
</script>
