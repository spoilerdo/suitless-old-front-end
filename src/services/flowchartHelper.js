/**
 * A small helper that will convert the json to the correct objects for the flowchart editor formatbar for instace:
 * implication of an answer to 1 array with the following object structure:
 * {
 *  implication: "",
 *  implicationLevel: ""
 * }
 * The backend needs an other structure than the front-end needs due to the abstraction of the entities
 * and generalization in order to minimize the database changes and prevent flowchart reworks
 * @author Martijn Dormans
 * @version 1.0
 * @since 07-08-2019
 * @memberof services.implicationHelper
 */

import theme from "@/plugins/vuetify/theme"; 
import { VueInstance as V} from "../main";
import anchorme from "anchorme";

export const createImplicationArray = (answer, displayImplicationName = false) => {
    let implicationColorEnum = V.$data.implicationColorEnum;

    //filters all the implications and maps there value into an array
    //anchorme is used to convert href's to actual links the user can click
    let imp = answer.lincData
        .filter(data => data.key == "implication")
        .map(el => el.value ?
            anchorme(el.value, {
                truncate: 40,
                attributes:[
                    {
                        name:"target",
                        value:"_blank"
                    }
                ]
            })
            :
            null
        );

    //filters all the implicationLevels and maps there value into an array
    let impLvl = answer.lincData
        .filter(data => data.key == "implicationLevel")
        .map(el => el.value);

    //combines the two arrays into the structure you see above
    let implicationsObject = [];
    let implicationColorsList = [];
    if (imp.length > 0 && impLvl.length > 0) {
        imp.forEach((implication, index) => {
            implicationsObject.push({
                implication: implication,
                implicationLevel: impLvl[index]
            });
        });
        if(!displayImplicationName) {
            //implicationColorsList = impLvl.map(el => theme[el]);
            implicationColorsList = impLvl.map(el => theme[implicationColorEnum[implicationColorEnum[el]]]);
        }
    }

    return { implicationsObject, implicationColorsList };
}

export const createReasonArray = (question) => {
    //filters all the reasons and maps there value into an array
    let reasons = question.lincData
        .filter(data => data.key == "reason")
        .map(el => el.value);

    //add the array value to an object
    let reasonsObject = [];
    if(reasons.length > 0) {
        reasons.forEach((reason) => {
            reasonsObject.push({
                reason: reason
            })
        })
    }

    return reasonsObject;
}