import { apiCall } from "@/services/api";
import { CDN_URL, NOTIFICATION_HANDLER } from "../../generalconstants"
import { SET_SERVCEABLES, UPDATE_SERVICEABLES, DELETE_SERVICEABLES, ADD_SERVICEABLES, SET_FILE_DIALOG, SET_NEW_SERVICEABLES, SET_SERVICEABLE_EXISTS, ADD_IMAGES, SET_IMAGES, ADD_IMAGE } from "./mutation-types";
import { async } from "q";

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

    //all the images from the CDN service
    images: [],

    //the serviceable that has most recently been uploaded
    newServiceable: null,

    //state of the file picker dialog
    fileDialog: false,

    //used for checking if the serviceable already exists in the system.
    //this can be used in order to know if a file needs to be uploaded or updated
    serviceableExists: false,
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
     * Sets the new dialog, attached to the image button.
     * @memberof store.flowcharteditor
     */
    setFileDialog({ commit }, dialogState) {
        commit(SET_FILE_DIALOG, dialogState);
    },

    /**
     * Retrieves all metadata from the CDN service
     * @memberof store.cdn
     */
    getAllData({ commit, dispatch }) {
        apiCall("GET", `${CDN_URL}/meta/all`)
            .then(data => {
                commit(SET_SERVCEABLES, []);
                commit(ADD_SERVICEABLES, data);
            }).catch(e => {
                dispatch(NOTIFICATION_HANDLER, { message: e, type: "error" }, { root: true });
            });
    },
    /**
     * Retrieves all the images from the CDN service
     * @memberof store.cdn
     */
    getAllImagesData({ commit, dispatch }) {
        apiCall("GET", `${CDN_URL}/meta/image/all`)
            .then(data => {
                commit(SET_IMAGES, []);
                commit(ADD_IMAGES, data);
            }).catch(e => {
                dispatch(NOTIFICATION_HANDLER, { message: e, type: "error" }, { root: true });
            });
    },

    /**
     * Adds an image to the images array
     * @memberof store.cdn
     */
    addImage({ commit }, image) {
        commit(ADD_IMAGE, image);
    },

    /**
     * Retrieves the metadata from a specific ID in the cdn service
     * @memberof store.cdn
     */
    getData({ commit, dispatch, getters }, id) {
        apiCall("GET", `${CDN_URL}/meta/id/${id}`)
            .then(data => {
                let oldMetadata = getters.getServiceablesDataByName(data.metaServiceableWrapperList[0].tag);

                if (oldMetadata != null) {
                    //metadata already exists in the list but is maybe outdated so update it
                    commit(UPDATE_SERVICEABLES, { data: data.metaServiceableWrapperList[0], oldMetadata });
                } else {
                    //metadata is new so add it to the bottom of the list
                    commit(ADD_SERVICEABLES, data);
                }
            }).catch(e => {
                dispatch(NOTIFICATION_HANDLER, { message: e, type: "error" }, { root: true })
            });
    },

    /** 
     * Attempts to delete an serviceable from the CDN service by tag
     * @memberof store.cdn
     */
    deleteByTag({ commit, dispatch }, serviceable) {
        apiCall("DELETE", `${CDN_URL}/${serviceable.name}`)
            .then(() => {
                dispatch(NOTIFICATION_HANDLER, { message: "succesfully deleted", type: "success" }, { root: true });
                commit(DELETE_SERVICEABLES, serviceable);
            }).catch(e => {
                dispatch(NOTIFICATION_HANDLER, { message: e, type: "error" }, { root: true });
            });
    },

    /**
     * Attempts to delete an serviceable from the CDN service by id
     * @memberof store.cdn
     */
    deleteById({ commit, dispatch }, serviceable) {
        apiCall("DELETE", `${CDN_URL}/id/${serviceable.id}`)
            .then(() => {
                dispatch(NOTIFICATION_HANDLER, { message: "succesfully deleted", type: "success" }, { root: true });
                commit(DELETE_SERVICEABLES, serviceable);
            }).catch(e => {
                dispatch(NOTIFICATION_HANDLER, { message: e, type: "error" }, { root: true });
            });
    },

    /**
     * Checks if the serviceable with given id exists.
     * @memberof store.cdn
     */
    async checkServiceableExists({ commit }, tag) {
        try {
            const req = await apiCall("GET", `${CDN_URL}/${tag}`)
            if (req) {
                if (req != null) {
                    commit(SET_SERVICEABLE_EXISTS, true);
                } else {
                    commit(SET_SERVICEABLE_EXISTS, false);
                }
            }
        } catch (e) {
            commit(SET_SERVICEABLE_EXISTS, false);
        }
    },

    /**
     * Attempts to push a new serviceable to the CDN service
     * @memberof store.cdn
     */
    async uploadServiceable({ dispatch, commit }, { file, name, type }) {
        let data = new FormData();
        data.set('file', file);
        data.set('fileType', type);
        data.set('tag', name);

        try {
            const req = await apiCall("POST", `${CDN_URL}/base64`, data);
            if (req) {
                commit(SET_NEW_SERVICEABLES, req);

                dispatch('getData', req.serviceable.id);

                dispatch(NOTIFICATION_HANDLER, { message: "file uploaded", type: "success" }, { root: true });
            }
        } catch (e) {
            dispatch(NOTIFICATION_HANDLER, { message: e, type: "error" }, { root: true });
        }
    },

    /**
     * Attempts to update a serviceable to the CDN service
     * @memberof store.cdn
     */
    async updateServiceable({ dispatch, commit }, { file, name, type }) {
        let data = new FormData();
        data.set('file', file);
        data.set('fileType', type);
        data.set('tag', name);

        try {
            const req = await apiCall("PUT", `${CDN_URL}/base64`, data);
            if (req) {
                commit(SET_NEW_SERVICEABLES, req);

                dispatch('getData', req.serviceable.id);

                dispatch(NOTIFICATION_HANDLER, { message: "file updated", type: "success" }, { root: true });
            }
        } catch (e) {
            dispatch(NOTIFICATION_HANDLER, { message: e, type: "error" }, { root: true });
        }
    },

    /**
     * Attempts to update the meta data of a serviceable to the CDN service
     * @memberof store.cdn
     */
    async updateMetaData({ dispatch, commit, getters }, { tag, locked }){
        try {
            const req = await apiCall("PUT", `${CDN_URL}/meta/${tag}`, locked);
            if(req) {
                let oldMetadata = getters.getServiceablesDataByName(req.metaServiceableWrapper.tag);

                commit(UPDATE_SERVICEABLES, { data: req.metaServiceableWrapper, oldMetadata });

                dispatch(NOTIFICATION_HANDLER, { message: "file updated", type: "success" }, { root: true });
            }
        } catch (e) {
            dispatch(NOTIFICATION_HANDLER, { message: e, type: "error" }, { root: true });
        }
    }
}

const mutations = {
    [SET_FILE_DIALOG](state, dialogState) {
        state.fileDialog = dialogState;
    },
    [SET_IMAGES](state, imageState) {
        state.images = imageState;
    },
    [ADD_IMAGES](state, data) {
        data.metaServiceableWrapperList.forEach(image => {
            state.images.push({
                name: image.tag,
                baseURL: CDN_URL + "/" + image.tag
            })
        })
    },
    [ADD_IMAGE](state, newImage) {
        state.images.push(newImage);
    },
    [SET_SERVCEABLES](state, data) {
        state.serviceables = data;
    },
    [ADD_SERVICEABLES](state, data) {
        data.metaServiceableWrapperList.forEach(serviceable => {
            state.serviceables.push({
                name: serviceable.tag,
                size: (serviceable.size / 1000).toFixed(2), //Byte to KB
                type: serviceable.type,
                id: serviceable.id,
                locked: serviceable.locked,
                baseURL: CDN_URL + "/" + serviceable.tag
            });
        });
    },
    [UPDATE_SERVICEABLES](state, payload) {  
        let index = state.serviceables.indexOf(payload.oldMetadata);
        state.serviceables[index] = {
            name: payload.data.tag,
            size: (payload.data.size / 1000).toFixed(2), //Byte to KB
            type: payload.data.type,
            baseURL: CDN_URL + payload.data.tag
        }
    },
    [DELETE_SERVICEABLES](state, data) {
        state.serviceables = state.serviceables.filter(metadata => metadata.name !== data.name);
    },
    [SET_NEW_SERVICEABLES](state, newServiceable) {
        state.newServiceable = newServiceable;
    },
    [SET_SERVICEABLE_EXISTS](state, newState) {
        state.serviceableExists = newState;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
} 