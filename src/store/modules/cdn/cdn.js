import { apiCall, asyncApiCall } from "@/api/api";
import { CDN_URL } from "@/store/serverconstants"
import { SET_METADATA, UPDATE_METADATA, DELETE_METADATA, ADD_METADATA, SET_ALERT } from "./mutation-types";
import { stat } from "fs";

/**
 * The cdn module contains actions that make API calls to the CDN Service
 * This sub module is used in the following components
 * - ServiceableTable (getAllData, delete)
 * - ServiceableTopbar (uploadImage)
 */

const state = {
    serviceables: []
}

const getters = {

}

const actions = {
    getAllData({ commit }) {
        apiCall("GET", CDN_URL + "meta/all")
        .then(data => {
            commit(SET_METADATA, []);
            commit(ADD_METADATA, data);
        });
    },
    getData({ commit, state }, id) {
        apiCall("GET", `${CDN_URL}meta/id/${id}`)
        .then(data => {
            let oldMetadata = state.serviceables.find(metadata => metadata.name === data.metadataList[0].tag)

            if(oldMetadata != null){
                //metadata already exists in the list but is maybe outdated so update it
                commit(UPDATE_METADATA, { data, oldMetadata });
            }else {
                //metadata is new so add it to the bottom of the list
                commit(ADD_METADATA, data);
            }
        })
    },
    deleteData({ commit }, serviceable) {
        apiCall("DELETE", CDN_URL + serviceable.name) 
        .then(() => {
            commit(DELETE_METADATA, serviceable);
        });
    },
    async uploadImage({ dispatch }, { file, name, type }) {
        let data = new FormData();
        data.set('file', file);
        data.set('fileType', type);
        data.set('tag', name);

        try{
            const req = await asyncApiCall("POST", CDN_URL + "base64", data)
            if(req) {
                dispatch('getData', req.serviceable.id);
            }
        } catch (e) {
            console.log(e);
        }
    }
}

const mutations = {
    [SET_METADATA](state, data) {
        state.serviceables = data;
    },
    [ADD_METADATA](state, data){
        data.metadataList.forEach(serviceable => {
            state.serviceables.push({
                name: serviceable.tag,
                size: (serviceable.size / 1000).toFixed(2), //Byte to KB
                type: serviceable.type,
                baseURL: CDN_URL + serviceable.tag
            });
        });
    },
    [UPDATE_METADATA](state, payload) {      
        let index = state.serviceables.findIndex(payload.oldMetadata);
        state.serviceables[index] = {
            name: payload.data.metadataList[0].tag,
            size: (payload.data.metadataList[0].size / 1000).toFixed(2), //Byte to KB
            type: payload.data.metadataList[0].type,
            baseURL: CDN_URL + payload.data.metadataList[0].tag
        }
    },
    [DELETE_METADATA](state, data) {
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