/**
 * Creates the right menu of the tool
 * @author Sueño de Kort, Martijn Dormans
 * @version 2.0
 * @since 27-02-2019
 */

import { mxEvent, mxEditor } from "../MxGraph";
import { state } from "../store/flowcharteditorEndpoint";

/**
 * Create format bar on the right
 * @param {mxEditor} editor 
 * @param {mxGraphModel} model
 */
export function createFormatbar(editor, model) {
    editor.graph.getSelectionModel().addListener(mxEvent.CHANGE, (sender, evt) => {
        let cells = evt.getProperty('removed');

        if (cells != null) {
            let selectedCell = cells[0];
            showFormatBar(editor, selectedCell, model);
        } else {
            //No node is selected so activate the default UI for the formatbar
            state.activeFormatBar.set = null;
        }
    });
}

/**
 * Updates the flowchart editor store to the correct formatbar type that corresponds to the selected cell type (e.g. question node)
 * It will also fill the formatbar with the data of the selected cell
 * @param {mxEditor} editor 
 * @param {object} selectedCell 
 * @param {mxGraphModel} model 
 */
function showFormatBar(editor, selectedCell, model) {
    if (selectedCell == null) { return; }
    //change the state values
    state.editor = editor;
    state.selectedCell = selectedCell;

    let children = 3;
    if (selectedCell.children != null) {
        children = selectedCell.children.length;
    }

    let newC = {
        "value": JSON.parse(JSON.stringify(selectedCell.value, null, "\t")),
        "children": JSON.parse(JSON.stringify(children, null, "\t")),
        "editable": true
    };
    if (selectedCell.lincData) {
        newC = {
            "value": JSON.parse(JSON.stringify(selectedCell.value, null, "\t")),
            "lincData": JSON.parse(JSON.stringify(selectedCell.lincData, null, "\t")),
            "children": JSON.parse(JSON.stringify(children, null, "\t")),
            "editable": true
        };
    }

    const source = selectedCell.source;
    if(selectedCell.source && source.style){
        if(source.style.includes("deletable=0") || source.style.includes("editable=0") || source.style.includes("movable=0")){
            newC.editable = false;
        }
    }

    state.newCell.set = newC;

    state.model = model;

    state.activeFormatBar.set = selectedCell.lincType;
}