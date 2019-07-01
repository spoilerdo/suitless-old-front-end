/**
 * Notifiation plugin used to show notifications
 * @memberof plugin
 */
export default {
    install(Vue) {
        Vue.mixin({
            methods: {
                /**
                 * Shows notification, takes in a message to display.
                 * Gets the root app component references and looks for the notification component.
                 * Calls the showNotification function of that component.
                 * @memberof plugin.notification
                */
                showNotification(message) {
                    this.$root.$children[0].$refs.notification.showNotification(message)
                }
            }
        })

    }
}