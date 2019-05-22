import { asyncApiCall, apiCall } from "@/api/api";
import { CDN_URL } from "@/store/serverconstants"
import { ADD_LIST, ADD_DATA, ADD_SERVICEABLE } from "./mutation-types";

const state = {
    serviceables: null,
    data: null,
}

const getters = {}

const actions = {
    getAllData({ commit }) {
            let list = [];

            apiCall("GET", CDN_URL + "meta/all").then((data => {
                data.metadataList.forEach(serviceable => {
                    list.push({
                        name: serviceable.tag,
                        size: (serviceable.size / 1000).toFixed(2), //Byte to KB
                        type: serviceable.type,
                        baseURL: CDN_URL + serviceable.tag
                    });
                });

                commit(ADD_LIST, list);
            }));
    },
    getData({ commit }, id) {
        apiCall("GET", CDN_URL + "meta/id/" + id).then(data => {
            let d = {
                name: data.metadataList[0].tag,
                size: (data.metadataList[0].size / 1000).toFixed(2), //Byte to KB
                type: data.metadataList[0].type,
                baseURL: CDN_URL + data.metadataList[0].tag
            }
            commit(ADD_DATA, d);

        }).catch(error => {
            reject(error);
        });
    },
    deleteImage({ commit }, serviceable) {
        apiCall("DELETE", CDN_URL + serviceable.name);
        //TODO: add commit
    },
    uploadImage({ commit, dispatch }, { file, name, type }) {
        console.log(file);
        console.log(name);
        console.log(type);
        let data = new FormData();
        data.set('file', file);
        data.set('fileType', type);
        data.set('tag', name);

        apiCall("POST", CDN_URL + "base64/", data).then(data => {
            console.log(data);
            dispatch('getData', data.serviceable.id).then(serviceable => {
                commit(ADD_SERVICEABLE, serviceable);
            })
        }).catch(e => {
            console.log(e);
        });
    },
    addServiceable({commit}, serviceable){ 
        commit(ADD_SERVICEABLE, serviceable);
    }
}

const mutations = {
    [ADD_LIST](state, list) {
        state.serviceables = list;
    },
    [ADD_DATA](state, data) {
        state.data = data;
    },
    [ADD_SERVICEABLE](state, serviceable) {
        if(state.serviceables != null){
            state.serviceables.push(serviceable);
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