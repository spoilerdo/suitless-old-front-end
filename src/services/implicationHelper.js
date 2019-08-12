/**
 * A small helper that will convert the json implication of an answer to 1 array with the following object structure:
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

export const createImplicationArray = (answer) => {
    //filters all the implications and maps there value into an array
    let imp = answer.lincData
        .filter(data => data.key == "implication")
        .map(el => el.value);

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
        implicationColorsList = impLvl.map(el => theme[el]);
    } else {
        implicationsObject = [
            { implication: null, implicationLevel: "default" }
        ];
    }

    return { implicationsObject, implicationColorsList };
}