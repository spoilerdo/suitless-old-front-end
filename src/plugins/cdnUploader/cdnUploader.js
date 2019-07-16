/**
 * CDN uploader plugin used for getting easy access to the CDN uploader
 * @memberof plugin
 */
export default {
    install(Vue) {
        Vue.mixin({
            methods: {
                /**
                 * Tries upload a file or if it already exists it will show a dialog asking to update the file
                 * Gets the root app component references and looks for the cdn uploader component.
                 * Calls the tryUploadingNewServiceable function to try uploading a file.
                 * @memberof plugin.cdnUploader
                */
                tryUploadingNewServiceable(file) {
                    this.$root.$children[0].$refs.cdnUploader.tryUploadingNewServiceable(file);
                }
            }
        })

    }
}