import { asyncApiCall } from '../../../api/api'
import { API_URL, NOTIFICATION_HANDLER } from '../../generalconstants';
import { SET_DIALOG, SET_FLOWCHART, SET_FORMATBAR, SET_CELL } from './mutation-types';

/**
 * The flowcharteditor module contains methods and states used for displaying 
 * the right UI component (Formatbar) and also saving and import a flowchart from the module service
 * This submodule is used in the following views:
 * - FlowchartEditor (mapState formatBarType)
 * - FlowchartForm (mapState dialog, flowchart and mapActions setDialog, getFlowchartByName)
 * - GeneralFunction (mapActions saveFlowchart)
 * - All the other components (mapState selectedCell, formatBarType)
 * - plugins/flowchareditor script (mapActions setDialog, setFormatBarType, setSelectedCell)
 * 
 * The following actions are called from the plugin/flowcharteditor script 
 * who gets its info from the flowcharteditor store in the libs folder.
 * We chose to do it this way so that you have a lose connection between the flowcharteditor plugin and Vue.js (like using an interface in Java)
 * But if you want to seperate the flowchart editor and Vue.js completly you cant use Vuetify to render the formatbar
 * and you would be forced to generate HTML within js which will get large and messy.
 * A downside of this design choice is that the library is not completly seperated/SOLID
 * @name flowcharteditor
 * @memberof store
 */

const state = {
    dialog: false,
    flowchart: null,
    formatBarType: null,
    selectedCell: {
        value: null,
        lincData: [],
        children: []
    }
}

const getters = {}

const actions = {
    /**
     * Sets the new dialog, attached to the import button.
     * @memberof store.flowcharteditor
     */
    setDialog({ commit }, dialogState) {
        commit(SET_DIALOG, dialogState);
    },

    /**
     * Sets the formatbar type
     * @memberof store.flowcharteditor
     */
    setFormatBarType({ commit }, newType) {
        commit(SET_FORMATBAR, newType);
    },

    /**
     * sets the new selected cell in the flowchart editor
     * @memberof store.flowcharteditor
     */
    setSelectedCell({ commit }, newCell) {
        commit(SET_CELL, newCell);
    },

    /**
     * This actions returns a flowchart. 
     * The FlowchartForm view will pass this from the plugins/flowcharteditor to the flowchart editor plugin.
     * @memberof store.flowcharteditor
     */
    async getFlowchartByName({ commit, dispatch }, name) {
        try {
            const req = await asyncApiCall('get', `${API_URL}/modules/name/${encodeURI(name)}`);
            commit(SET_FLOWCHART, req);
        } catch (e) {
            console.log(e);
            dispatch(NOTIFICATION_HANDLER, { message: e, type: "error" }, { root:true });
        }
    },

    /**
     * Vue.js gets the flowchart JSON from the plugin and make the API call to the module service
     * @memberof store.flowcharteditor
     */
    async saveFlowchart({ commit, dispatch }, flowchart) {
        try {
            const req = await asyncApiCall('post', `${API_URL}/modules/`, flowchart);
            if(req && req.module != null) {
                dispatch(NOTIFICATION_HANDLER, { message: "Flowchart saved", type: "success" }, { root:true })
            };
        } catch (e) {
            console.log(e);
            dispatch(NOTIFICATION_HANDLER, { message: e, type: "error" }, { root:true });
        }
    }
}

const mutations = {
    [SET_DIALOG](state, dialogState) {
        state.dialog = dialogState;
    },
    [SET_FORMATBAR](state, formatBarState) {
        state.formatBarType = formatBarState;
    },
    [SET_FLOWCHART](state, flowchartState) {
        state.flowchart = flowchartState;
    },
    [SET_CELL](state, cellState) {
        state.selectedCell = {
            value: cellState.value,
            lincData: [],
            children: null
        };
        if (cellState.children != null) {
            state.selectedCell.children = cellState.children;
        }
        if (cellState.lincData != null) {
            state.selectedCell.lincData = cellState.lincData;
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}