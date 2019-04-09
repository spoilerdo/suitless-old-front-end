/**
 * Contains generic methods from the Formatbar
 * @author Martijn Doramns
 * @version 1.0
 * @since 3-4-2019
 */

import { graphFunctions } from "../EditorFunctions";
import { FormatBarEnum } from "./FormatBarEnum";
import { NodeEnum } from "../NodeEnum";
import { mxUtils } from "../MxGraph";

let selectedQuestion = null;

/**
 * Contains common Formatbar functions for making the right menu
 */
export let formatBarFunctions = {
    resetFormatbar(formatbarContainer) {
        for (let i = formatbarContainer.childNodes.length - 1; i >= 0; i--) {
            formatbarContainer.removeChild(formatbarContainer.childNodes[i]);
        }
    },

    showDiagram(formatbarContainer, editor) {
        let title = document.createElement("p");
        title.innerHTML = "Diagram title";
        title.className = "headline text-xs-center";
        formatbarContainer.appendChild(title);

        let nameInput = document.createElement("input");
        nameInput.className = "questionSearchbar";
        nameInput.placeholder = "name of the flowchart";
        formatbarContainer.appendChild(nameInput);

        let descInput = document.createElement("textarea");
        descInput.value = "description of the flowchart";
        descInput.setAttribute("type", "text");
        descInput.className = "cellInput v-textarea v-text-field--enclosed v-text-field__slot textarea";
        formatbarContainer.appendChild(descInput);

        let saveButton = mxUtils.button("save", (evt) => {
            graphFunctions.exportChart(editor.graph, nameInput.value, descInput.value);
        });
        saveButton.className = "primary v-btn v-btn--large v-btn--router theme--light";
        formatbarContainer.appendChild(saveButton);
    },

    createDataContainer(formatBarContainer, editor, selectedCell, title, inputValue, formatBarEnum){
        let cellDiv = document.createElement("div");
        cellDiv.className = "cellDiv" + FormatBarEnum[formatBarEnum];
        formatBarContainer.appendChild(cellDiv);

        let cell = document.createElement("p");
        cell.innerHTML = title;
        cell.className = "cell" + FormatBarEnum[formatBarEnum];
        cellDiv.appendChild(cell);

        let cellInput = document.createElement("textarea");
        cellInput.value = inputValue;
        cellInput.setAttribute("type", "text");
        cellInput.className = "cellInput v-textarea v-text-field--enclosed v-text-field__slot textarea";
        cellDiv.appendChild(cellInput);

        let btn = null;
        switch(formatBarEnum){
            case FormatBarEnum.Question:
                btn = this.createQuestion(editor, selectedCell, cellInput);
                break;
            case FormatBarEnum.Reason:
                btn = this.createReason(selectedCell, cellInput)
                break;
            case FormatBarEnum.Module:
                btn = this.createModule(selectedCell, cellInput);
                break;
            case FormatBarEnum.Notification:
                btn = this.createNotification(editor, selectedCell, cellInput);
                break;
        }
        if(btn != null){
            btn.className = "cellButton";
            cellDiv.appendChild(btn);
        }
    },

    createQuestion(editor, selectedCell, cellInput) {
        let cellQuestionButton = mxUtils.button("apply", (evt) => {
            selectedCell.value = cellInput.value;
            editor.graph.getModel().setValue(selectedCell, cellInput.value);
        });
        return cellQuestionButton;
    },

    //TODO: FIX THIS GARBAGE CODES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Code Duplication !!!!!!!!!!!!!!

    createReason(selectedCell, cellInput) {
        let cellReasonButton = mxUtils.button("apply", (evt) => {
            console.log(selectedCell);
            selectedCell.lincData[0].value = cellInput.value;
        });
        return cellReasonButton;
    },

    createModule(selectedCell, cellInput) {
        let cellModuleButton = mxUtils.button("apply", (evt) => {
            selectedCell.lincData[0].value = cellInput.value;
        });
        return cellModuleButton;
    },

    createNotification(editor, selectedCell, cellInput) {
        let cellNotificationButton = mxUtils.button("apply", (evt) => {
            selectedCell.lincData[0].value = cellInput.value;
            editor.graph.getModel().setValue(selectedCell, cellInput.value);
        })
        return cellNotificationButton;
    },

    createConditions(formatbarContainer, editor, selectedCell, model, input) {
        let cellConditionsDiv = document.createElement("div");
        cellConditionsDiv.className = "cellConditionsDiv";
        formatbarContainer.appendChild(cellConditionsDiv);

        let cellConditionsTitle = document.createElement("p");
        cellConditionsTitle.innerHTML = "Conditions";
        cellConditionsTitle.className = "cellConditionsTitle";
        cellConditionsDiv.appendChild(cellConditionsTitle);

        let cellConditionsInput = document.createElement("input");
        if (input === true) {
            cellConditionsInput.placeholder = "Enter a new condition";
            cellConditionsInput.setAttribute("type", "text");
            cellConditionsInput.className = "cellConditionInput"
            cellConditionsDiv.appendChild(cellConditionsInput);
        }

        let questionSearchbar = document.createElement("input");
        questionSearchbar.className = "questionSearchbar";
        questionSearchbar.placeholder = "search for question";
        cellConditionsDiv.appendChild(questionSearchbar);

        let cellConditionsQuestionsDiv = document.createElement("div");
        cellConditionsQuestionsDiv.className = "cellConditionsQuestionsDiv";
        cellConditionsDiv.appendChild(cellConditionsQuestionsDiv);

        this.search(selectedCell, editor, cellConditionsQuestionsDiv, questionSearchbar);

        questionSearchbar.onkeyup = () => {
            this.search(selectedCell, editor, cellConditionsQuestionsDiv, questionSearchbar);
        }

        let cellConditionsInputButton = mxUtils.button("Add", (evt) => {
            editor.graph.getModel().beginUpdate();
            try {
                let flow = {
                    fromCell: selectedCell,
                    targetCell: selectedQuestion,
                    value: cellConditionsInput.value
                }
                graphFunctions.addEdge(editor.graph, flow);
            }
            finally {
                editor.graph.getModel().endUpdate();
            }

            resetFormatbar(formatbarContainer);
            showFormatBar(formatbarContainer, editor, selectedCell, model);
        });

        cellConditionsInputButton.className = "cellConditionsInputButton"
        cellConditionsDiv.appendChild(cellConditionsInputButton);
    },

    search(selectedCell, editor, cellConditionsQuestionsDiv, questionSearchbar) {
        for (let i = cellConditionsQuestionsDiv.childNodes.length - 1; i >= 0; i--) {
            cellConditionsQuestionsDiv.removeChild(cellConditionsQuestionsDiv.childNodes[i]);
        }

        for (let i = Object.keys(editor.graph.getModel().cells).length - 1; i >= 0; i--) {
            if (editor.graph.getModel().cells[i] == null) {
                continue;
            }

            if (editor.graph.getModel().cells[i].lincType != NodeEnum.Question) {
                continue;
            }

            if (selectedCell.id == editor.graph.getModel().cells[i].id) {
                continue;
            }

            let cell = editor.graph.getModel().cells[i];

            if (cell.value.toUpperCase().indexOf(questionSearchbar.value.toUpperCase()) > -1) {
                let question = document.createElement("p");
                question.innerHTML = cell.value;
                question.className = "cellCondition";
                if (selectedQuestion != null) {
                    if (cell.id == selectedQuestion.id) {
                        question.className = "cellConditionActive";
                    }
                }

                cellConditionsQuestionsDiv.appendChild(question);

                question.onclick = () => {
                    selectedQuestion = cell;
                    this.search(selectedCell, editor, cellConditionsQuestionsDiv, questionSearchbar, cell);
                }
            }
        }
    },

    createCondition(formatbarContainer, editor, selectedCell) {
        let cellConditionDiv = document.createElement("div");
        cellConditionDiv.className = "cellConditionDiv"
        formatbarContainer.appendChild(cellConditionDiv);

        let cellCondition = document.createElement("p");
        cellCondition.innerHTML = "Condition";
        cellCondition.className = "cellConditionsTitle";
        cellConditionDiv.appendChild(cellCondition);

        let cellConditionInput = document.createElement("input");
        cellConditionInput.value = selectedCell.lincData.condition;
        cellConditionInput.setAttribute("type", "text");
        cellConditionInput.className = "cellConditionInput"
        cellConditionDiv.appendChild(cellConditionInput);

        let cellConditionButton = mxUtils.button("apply", (evt) => {
            editor.graph.getModel().setValue(selectedCell, cellConditionInput.value);
        });
        cellConditionButton.className = "cellConditionButton";
        cellConditionDiv.appendChild(cellConditionButton);
    }
}