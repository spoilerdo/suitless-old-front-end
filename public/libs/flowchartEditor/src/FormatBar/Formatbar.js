/**
 * Creates the right menu of the tool
 * @author Sueño de Kort, Martijn Dormans
 * @version 2.0
 * @since 27-02-2019
 */

import { NodeEnum } from "../NodeEnum";
import { formatBarFunctions } from "./GenericMethods";
import { FormatBarEnum } from "./FormatBarEnum";
import { mxEvent, mxEditor } from "../MxGraph";

/**
 * create format bar on the right
 * @param {Element} formatbarContainer 
 * @param {mxEditor} editor 
 * @param {mxKeyhandler} keyHandler
 */

export function createFormatbar(formatbarContainer, editor, model) {
    formatBarFunctions.showDiagram(formatbarContainer, editor);
    editor.graph.getSelectionModel().addListener(mxEvent.CHANGE, (sender, evt) => {
        let cells = evt.getProperty('removed');

        if (cells != null) {
            formatBarFunctions.resetFormatbar(formatbarContainer);
            let selectedCell = cells[0];
            showFormatBar(formatbarContainer, editor, selectedCell, model);
        } else {
            formatBarFunctions.resetFormatbar(formatbarContainer);
            formatBarFunctions.showDiagram(formatbarContainer, editor);
        }
    });
};

function showFormatBar(formatbarContainer, editor, selectedCell, model){
    if(selectedCell == null){return;}

            switch (selectedCell.lincType) {
                case NodeEnum.Question:
                    showQuestion(formatbarContainer, editor, selectedCell, model);
                    break;
                case NodeEnum.Start:
                    showStart(formatbarContainer, editor, selectedCell, model);
                    break;
                case NodeEnum.Condition:
                    showCondition(formatbarContainer, editor, selectedCell, model);
                    break;
                case NodeEnum.End:
                    showEnd(formatbarContainer, editor, selectedCell, model);
                    break;
                case NodeEnum.Module:
                    showModule(formatbarContainer, editor, selectedCell, model);
                    break;
                case NodeEnum.Notification:
                    showNotification(formatbarContainer, editor, selectedCell, model);
                    break;
            };
}

function showQuestion(formatbarContainer, editor, selectedCell, model) {
    formatBarFunctions.createDataContainer(formatbarContainer, editor, selectedCell, "Question", selectedCell.value, FormatBarEnum.Question);
    formatBarFunctions.createDataContainer(formatbarContainer, editor, selectedCell, "Reason", selectedCell.lincData[0].value, FormatBarEnum.Reason);
    //formatBarFunctions.createConditions(formatbarContainer, editor, selectedCell, model, true);
};

function showCondition(formatbarContainer, editor, selectedCell, model) {
    formatBarFunctions.createCondition(formatbarContainer, editor, selectedCell, model, true);
    formatBarFunctions.createDataContainer(formatbarContainer, editor, selectedCell, "Reason", selectedCell.lincData[0].value, FormatBarEnum.Reason);
};

function showStart(formatbarContainer, editor, selectedCell, model){
    //formatBarFunctions.createConditions(formatbarContainer, editor, selectedCell, model, false);
};

function showEnd(formatbarContainer, editor, selectedCell, model){
    //formatBarFunctions.createConditions(formatbarContainer, editor, selectedCell, model, false);
}

function showModule(formatbarContainer, editor, selectedCell, model){
    formatBarFunctions.createDataContainer(formatbarContainer, editor, selectedCell, "Module name:", selectedCell.lincData[0].value, FormatBarEnum.Module);
    //formatBarFunctions.createConditions(formatbarContainer, editor, selectedCell, model, true);
}

function showNotification(formatbarContainer, editor, selectedCell, model){
    formatBarFunctions.createDataContainer(formatbarContainer, editor, selectedCell, "Notification", selectedCell.value, FormatBarEnum.Notification);
}