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
        state.model = model;

        switch (selectedCell.lincType) {
            case NodeEnum.Question:
                changeStates(true, false, false);
                break;
            case NodeEnum.Module:
                changeStates(false, true, false);
                break;
            case NodeEnum.Notification:
                changeStates(false, false, true);
                break;
        };
}

function changeStates(questionState, moduleState, notificationState){
    state.questionfunctions.set = questionState;
    state.modulefunctions.set = moduleState;
    state.notificationfunctions.set = notificationState;
}