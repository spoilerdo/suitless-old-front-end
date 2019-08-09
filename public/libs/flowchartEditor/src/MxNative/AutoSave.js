import { editorFunctions } from "../EditorFunctions/EditorFunctions";
import { mxAutoSaveManager } from "../MxGraph";

export function initAutoSave(graph) {
    mxAutoSaveManager.prototype.autoSaveThreshold = 6;
    let mgr = new mxAutoSaveManager(graph);
    mgr.save = function () {
        if(graph.getChildVertices()[1]){
            localStorage.setItem("model", editorFunctions.exportChart(graph, "autosave", "This is a autosave", null));
        }
    };
}