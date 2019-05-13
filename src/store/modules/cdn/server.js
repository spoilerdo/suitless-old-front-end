import * as api from "@/api/api";
import { CDN_URL } from "@/store/serverconstants"

const actions = {
    getAllData(list) {
        api.apiCall("GET", CDN_URL + "meta/all").then(data => {
            data.metadataList.forEach(serviceable => {
                list.push({
                    name: serviceable.tag,
                    size: (serviceable.size / 1000).toFixed(2), //Byte to KB
                    type: serviceable.type,
                    baseURL: CDN_URL + serviceable.tag
                });
            });
        });
        return list;
    },
    getData(id) {
        return new Promise((resolve, reject) => {
            return api.apiCall("GET", CDN_URL + "meta/id/" + id).then(data => {
                resolve({
                    name: data.metadataList[0].tag,
                    size: (data.metadataList[0].size / 1000).toFixed(2), //Byte to KB
                    type: data.metadataList[0].type,
                    baseURL: CDN_URL + data.metadataList[0].tag
                });
            }).catch(error => {
                reject(error);
            });
        });
    },
    delete(serviceable) {
        api.apiCall("DELETE", CDN_URL + serviceable.name);
    },
    uploadImage(file, name, type) {
        let data = new FormData();
        data.set('file', file);
        data.set('fileType', type);
        data.set('tag', name);

        return new Promise((resolve, reject) => {
            return api.apiCall("POST", CDN_URL + "base64/", data).then(data => {
                this.getData(data.serviceable.id).then(serviceable => {
                    return resolve(serviceable);
                })
            }).catch(error => {
                reject(error);
            });
        });
    }
}

export default {
    namespaced: true,
    actions,
} 