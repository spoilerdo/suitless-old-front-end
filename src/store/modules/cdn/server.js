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
    }
}

export default {
    namespaced: true,
    actions,
} 