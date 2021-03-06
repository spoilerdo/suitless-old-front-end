/**
 * Auto saves the flowchart after a certain amount of changes
 * @author Martijn Dormans
 * @version 1.0
 * @since 07-08-2019
 */

import { editorFunctions } from "../EditorFunctions/EditorFunctions";
import { mxAutoSaveManager } from "../MxGraph";

export function initAutoSave(graph, model) {
    mxAutoSaveManager.prototype.autoSaveThreshold = 2;
    let mgr = new mxAutoSaveManager(graph);
    mgr.save = function () {
        if(graph.getChildVertices()[1]){
            localStorage.setItem("model", editorFunctions.exportChart(graph, "autosave", "This is a autosave", null));
        }
    };

    window.onstorage = (e) => {
        let flowchart = JSON.parse(e.newValue);
        editorFunctions.importChart(graph, flowchart.nodes, model);
    }
}