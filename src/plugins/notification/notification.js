export default {
    install(Vue) {
        Vue.mixin({
            methods: {
                /*
                Shows notification, takes in a message to display.
                Gets the root app component references and looks for the notification component.
                Calls the showNotification function of that component.
                */
                showNotification(message, type) {
                    this.$root.$children[0].$refs.notification.showNotification(message, type)
                }
            }
        })

    }
}