import { SET_DRAWER, SET_BACKGROUND, SET_FOOTERCOLOR, SET_NEWUSER } from "./mutation-types";

/**
 * The app module are some standard methods and states that are used for the look of the site
 * This submodule is used in the following views:
 * - CDN (setBackground, setFooterColor)
 * - FlowchartEditor (setBackground, setFooterColor)
 * - LandingPage (setBackground)
 * - Login (setBackground)
 * - Survey (setBackground, setFooterColor)
 * - Surveys (setBackground)
 * - Dashboard (setBackground)
 * 
 * The states are watched by the following views and components
 * - App (background and newUser state, also setBackground)
 * - Footer (footerColor)
 * - Drawer (drawerOpen)
 * 
 * @name app
 * @namespace
 */

// initial state
const state = {
    drawerOpen: true,
    background: "#eee",
    footerColor: "#fff",
    newUser: true
}

// getters
const getters = {
    /**
     * Returns the drawer from the state
     * @memberof app
     */
    getDrawer: (state) => () => {
        return state.drawerOpen;
    },
    /**
     * Returns the background from the state
     * @memberof app
     */
    getBackground: (state) => () => {
        return state.background;
    },

    /**
     * Returns the new user from the state
     * @memberof app
     */
    getNewUser: (state) => () => {
        return state.newUser;
    },

    /**
     * Returns the footer colour
     * @memberof app
     */
    getFooterColor: (state) => () => {
        return state.footerColor;
    }
}

// actions
const actions = {
    /**
     * Sets the drawer to the state
     * @memberof app
     */
    setDrawer({ commit }, drawerOpen) {
        commit(SET_DRAWER, drawerOpen);
    },
    /**
     * Sets the background to the state
     * @memberof app
     */
    setBackground({ commit }, newBg) {
        commit(SET_BACKGROUND, newBg);
    },
    /**
     * Sets the footer colour to the state
     * @memberof app
     */
    setFooterColor({ commit }, newColor) {
        commit(SET_FOOTERCOLOR, newColor);
    },
    /**
     * Sets the new user to the state
     * @memberof app
     */
    setNewUser({ commit }, newUser) {
        commit(SET_NEWUSER, newUser);
    }
}

// mutations
const mutations = {
    [SET_DRAWER](state, drawerOpen) {
        state.drawerOpen = drawerOpen;
    },
    [SET_BACKGROUND](state, newBg) {
        state.background = newBg;
    },
    [SET_FOOTERCOLOR](state, newColor) {
        state.footerColor = newColor;
    },
    [SET_NEWUSER](state, newUser) {
        state.newUser = newUser;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}