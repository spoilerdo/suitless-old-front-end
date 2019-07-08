import { VueInstance } from '../../../main';
import { ADD_NOTIFICATION, CLEAR_NOTIFICATIONS } from "./mutation-types";

/**
 * The notificationHandler module contains actions that store any notification (error, success, warning) that you want the user to know
 * and gives any new notifications to the user as a snackbar.
 * This sub module is used in the following components:
 * - cdn.js (addNotification)
 * - flowcharteditor.js (addNotification)
 * - login.js (addNotification)
 * - survey.js (addNotification)
 * @name notificationHandler
 * @memberof store
 */

const state = {
    //this is an array of the notifications that has been give to the user.
    //Any new notification will be shown to the user as a snackbar.
    //1 Notification object contains an message and the type of notifciation
    notifications: [
        { type: null, message: null },
    ]
}

const getters = {

}

const actions = {
    /**
     * Adds notification to the notifications array and shows it to the user
     * @memberof store.notificationHandler
     */
    addNotification({ commit }, newNotification) {
        //check if it contains a response message from the back-end. If so use that one instead
        if (newNotification.message.response && newNotification.message.response.data.message) {
            newNotification.message = newNotification.message.response.data.message;
        }
        commit(ADD_NOTIFICATION, newNotification);
    },
    /**
     * Clears all the notifications from the array
     * @memberof store.notificationHandler
     */
    clearNotification({ commit }) {
        commit(CLEAR_NOTIFICATIONS);
    }
}

const mutations = {
    [ADD_NOTIFICATION](state, newNotification) {
        state.notifications.push(newNotification);

        if (!newNotification.noSnackbar) {
            //get the Vue Instance and call the showNotification method in order to show the notification
            VueInstance.showNotification(newNotification.message, newNotification.type);
        }
    },
    [CLEAR_NOTIFICATIONS](state) {
        state.notifications = [
            { type: null, message: null },
        ]
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}