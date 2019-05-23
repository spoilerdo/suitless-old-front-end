/**
 * Creates the right menu of the tool
 * @author Sueño de Kort, Martijn Dormans
 * @version 2.0
 * @since 27-02-2019
 */

import { mxEvent, mxEditor } from "../MxGraph";
import { state } from "../store/flowcharteditor";

/**
 * create format bar on the right
 * @param {mxEditor} editor 
 * @param {mxKeyhandler} keyHandler
 */

export function createFormatbar(editor, model) {
    //formatBarFunctions.showDiagram(formatbarContainer, editor);
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
};

function showFormatBar(editor, selectedCell, model){
    if(selectedCell == null){return;}
        //change the state values
        state.editor = editor;
        state.selectedCell = selectedCell;
        let t = {...selectedCell}
        let v = t.value;
        let l = t.lincData;
        let c = t.children;
        console.log(v);
        let newC = {
            "value": JSON.stringify(v, null, "\t"),
            "lincData": JSON.parse(JSON.stringify(l, null, "\t")),
            "children": JSON.stringify(c, null, "\t")
        };

        console.log({
            "value": "value",
            "lincData": "linc",
            "children": "dchad"
        })

        console.log(newC);
        state.newCell.set = newC;
        state.model = model;

        state.activeFormatBar.set = selectedCell.lincType;
}