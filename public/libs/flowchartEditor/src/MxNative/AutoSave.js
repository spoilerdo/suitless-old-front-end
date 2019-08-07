import { mxAutoSaveManager } from "../MxGraph";
import cycle from "cycle";

export function initAutoSave(graph) {
    mxAutoSaveManager.prototype.autoSaveThreshold = 2;
    let mgr = new mxAutoSaveManager(graph);
    mgr.save = function () {
        //Maybe just export the flowchart and import it again???
        //But than the import needs to be fixed first
        //TODO: finish this

        //sessionStorage.setItem("model", JSON.stringify(cycle.decycle(mgr.graph.model.cells)));
    };
}