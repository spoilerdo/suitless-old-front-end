import { SET_SURVEY, DELETE_SURVEY_STATE } from '@/store/modules/survey/mutation-types';
export const localStorageSynchroniser = store => {
    store.subscribe((mutation, state) => {
        //This will store some states to the localstorage because you want to use the information for multible tabs

        //survey.js
        //The survey state is needed in order to get it on a sperate tab for testing purposes
        if(mutation.type === "survey/"+SET_SURVEY){
            if(mutation.payload){
                localStorage.setItem(SET_SURVEY, JSON.stringify(mutation.payload));
            }
        }else if(mutation.type === "survey/"+ DELETE_SURVEY_STATE) {
            localStorage.removeItem(SET_SURVEY);
        }

    })
    if(localStorage.getItem(SET_SURVEY)){
        store.commit("survey/"+SET_SURVEY, JSON.parse(localStorage.getItem(SET_SURVEY)));
    } else {
        store.commit("survey/"+DELETE_SURVEY_STATE);
    }

    window.onbeforeunload = () => {
        localStorage.removeItem(SET_SURVEY);
    };
}