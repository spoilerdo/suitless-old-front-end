import { apiCall, asyncApiCall } from "@/services/api";
import { CDN_URL, NOTIFICATION_HANDLER } from "../../generalconstants"
import { SET_SERVCEABLES, UPDATE_SERVICEABLES, DELETE_SERVICEABLES, ADD_SERVICEABLES, ADD_SERVICEABLESBYNAME } from "./mutation-types";

/**
 * The cdn module contains actions that make API calls to the CDN Service
 * This sub module is used in the following components:
 * - ServiceableTable (getAllData, delete)
 * - ServiceableTopbar (uploadImage)
 * @name cdn
 * @memberof store
 */

const state = {
    //all the meta data from files that are obtained by the API. Used for the CDN manager
    serviceables: [],
}

const getters = {
    /**
     * Returns the specific data with a specific name from the serviceables array
     * @memberof store.cdn
     */
    getServiceablesDataByName: (state) => (name) => {
        return state.serviceables.find(metadata => metadata.name === name);
    },
}

const actions = {
    /**
     * Retrieves all metadata from the CDN service
     * @memberof store.cdn
     */
    getAllData({ commit, dispatch }) {
        apiCall("GET", `${CDN_URL}/meta/all`)
        .then(data => {
            console.log(data);
            commit(SET_SERVCEABLES, []);
            commit(ADD_SERVICEABLES, data);
        }).catch(e => {
            dispatch(NOTIFICATION_HANDLER, { message: e, type: "error" }, { root:true });
        });
    },
    /**
     * Retrieves the metadata from a specific ID in the cdn service
     * @memberof store.cdn
     */
    getData({ commit, dispatch, getters }, id) {
        apiCall("GET", `${CDN_URL}/meta/id/${id}`)
        .then(data => {
            let oldMetadata = getters.getServiceablesDataByName(data.metadataList[0].tag);

            if(oldMetadata != null){
                //metadata already exists in the list but is maybe outdated so update it
                commit(UPDATE_SERVICEABLES, { data, oldMetadata });
            }else {
                //metadata is new so add it to the bottom of the list
                commit(ADD_SERVICEABLES, data);
            }
        }). catch(e => {
            dispatch(NOTIFICATION_HANDLER, { message: e, type: "error" }, { root:true })
        });
    },
    /** 
     * Attempts to delete an serviceable from the CDN service
     * @memberof store.cdn
     */
    deleteData({ commit, dispatch }, serviceable) {
        apiCall("DELETE", `${CDN_URL}/${serviceable.name}`) 
        .then(() => {
            dispatch(NOTIFICATION_HANDLER, { message: "succesfully deleted", type: "success" }, { root:true });
            commit(DELETE_SERVICEABLES, serviceable);
        }).catch(e => {
            dispatch(NOTIFICATION_HANDLER, { message: e, type: "error" }, { root:true });
        });
    },
    /**
     * Attempts to push a new serviceable to the CDN service
     * @memberof store.cdn
     */
    async uploadImage({ dispatch }, { file, name, type }) {
        let data = new FormData();
        data.set('file', file);
        data.set('fileType', type);
        data.set('tag', name);

        try{
            const req = await asyncApiCall("POST", `${CDN_URL}/base64`, data)
            if(req) {
                dispatch('getData', req.serviceable.id);
                dispatch(NOTIFICATION_HANDLER, { message: "file uploaded", type: "success" }, { root:true });
            }
        } catch (e) {
            dispatch(NOTIFICATION_HANDLER, { message: e, type: "error" }, { root:true });
        }
    }
}

const mutations = {
    [SET_SERVCEABLES](state, data) {
        state.serviceables = data;
    },
    [ADD_SERVICEABLES](state, data){
        data.metadataList.forEach(serviceable => {
            state.serviceables.push({
                name: serviceable.tag,
                size: (serviceable.size / 1000).toFixed(2), //Byte to KB
                type: serviceable.type,
                baseURL: CDN_URL + "/" + serviceable.tag
            });
        });
    },
    [UPDATE_SERVICEABLES](state, payload) {      
        let index = state.serviceables.findIndex(payload.oldMetadata);
        state.serviceables[index] = {
            name: payload.data.metadataList[0].tag,
            size: (payload.data.metadataList[0].size / 1000).toFixed(2), //Byte to KB
            type: payload.data.metadataList[0].type,
            baseURL: CDN_URL + payload.data.metadataList[0].tag
        }
    },
    [DELETE_SERVICEABLES](state, data) {
        state.serviceables = state.serviceables.filter(metadata => metadata.name !== data.name);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
} 