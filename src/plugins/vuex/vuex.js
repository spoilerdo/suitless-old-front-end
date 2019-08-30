import { SET_FLOWCHART } from '@/store/modules/flowcharteditor/mutation-types';
import { SET_SURVEY } from '@/store/modules/survey/mutation-types';
export const localStorageSynchroniser = store => {
    store.subscribe((mutation, state) => {
        //This will store some states to the localstorage because you want to use the information for multible tabs

        //flowcharteditor.js
        //The survey state is needed in order to get it on a sperate tab for testing purposes
        if(mutation.type === "flowcharteditor/"+SET_FLOWCHART){
            if(mutation.payload){
                localStorage.setItem(SET_FLOWCHART, JSON.stringify(mutation.payload));
            }
        }

    })
    if(localStorage.getItem(SET_FLOWCHART)){
        store.commit("survey/"+SET_SURVEY, JSON.parse(localStorage.getItem(SET_FLOWCHART)));
    }

    window.onbeforeunload = () => {
        localStorage.removeItem(SET_FLOWCHART);
    };
}