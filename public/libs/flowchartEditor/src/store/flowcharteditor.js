/**
 * The store of the flowchart editor.
 * This script contains some general information that can be communicated to Vue.js trough the Plugin script in Vue
 * @author Martijn Dormans
 * @version 1.3
 * @since 17-04-2019
 */

import { editorFunctions } from "../EditorFunctions/EditorFunctions";
import { mxConstants } from "../MxGraph";

/**
 * All general variables that can be communicated to Vue
 * Every state can register a Listener so when a state changes value 
 * Vue and the Flowcharteditor get a notification
 */
export const state = {
    dialog: {
        //private variable
        dialogInternal: false,
        //Listenere (Vue plugin script) that will be calledback whenever the variable state changes
        dialogListener: function (val) { },
        //set a new value for the variable and callback to the listener
        set set(val) {
            this.dialogInternal = val;
            this.dialogListener(val);
        },
        //get the private variable value
        get get() {
            return this.dialogInternal;
        },
        //register a new listener that will reveive a callback whenever the state/ variable changes
        registerListener: function (listener) {
            this.dialogListener = listener;
        }
    },
    flowchart: {
        flowchartInternal: null,
        flowchartListener: function (val) { },
        set set(val) {
            this.flowchartInternal = val;
            this.flowchartListener(val);
        },
        get get() {
            return this.flowchartInternal;
        },
        registerListener: function (listener) {
            this.flowchartListener = listener;
        }
    },
    /* 
    Next variables are needed in order to change the selected cells value
    */
    editor: null,
    selectedCell: null,
    model: null,

    /*
    Variable that changes the formatbar when a certain node has been selected
    */
    activeFormatBar: {
        activeFormatBarInternal: null,
        activeFormatBarListener: function (val) { },
        set set(val) {
            this.activeFormatBarInternal = val;
            this.activeFormatBarListener(val);
        },
        get get() {
            return this.activeFormatBarInternal;
        },
        registerListener: function (listener) {
            this.activeFormatBarListener = listener;
        }
    }
};

export const methods = {
    setDialog(val) {
        state.dialog.set = val;
    },
    setFlowchart(val) {
        state.flowchart.set = val;
    },
    saveFlowchart(name, description) {
        editorFunctions.exportChart(state.editor.graph, name, description);
    },

    /*
    These methods will be called from the Vue plugin instance and will change the look of the selectedcell,
    by the newly inputed values from the user
    */
    changeQuestionNode(questionNode, question, reason){
        this.genericChangeNode(questionNode, question);
        if(state.selectedCell.lincData != null && state.selectedCell.lincData[1].key === "reason")
        state.selectedCell.lincData[1].value = reason
    },
    changeMultipleChoiceNode(nodeName, title, amountOfChoices){
        let graph = state.editor.graph;

        this.genericChangeNode(nodeName, title);
        let childerenCount = state.selectedCell.getChildCount();

        if(childerenCount < amountOfChoices){
            //add some cells
            for (let i = childerenCount; i < amountOfChoices; i++) {
                var vertex = graph.createVertex(state.selectedCell, null, "Choice " + i, 10, (70 + i * 50), 80, 30, 'movable=0');
                graph.addCell(vertex, state.selectedCell);
            }
        }else if(childerenCount > amountOfChoices){
            //delete some cells

            //get the amount of cells that needs to be removed
            let children = state.selectedCell.children;
            let maxAmountOfChilderen = state.selectedCell.children.length;
            let cellToBeRemoved = maxAmountOfChilderen - amountOfChoices;

            let childrenToBeRemoved = [];
            //loop trouugh the amount of cells that needs to be removed in order to remove the cells
            for (let i = 1; i <= cellToBeRemoved; i++) {
                //get the index of the cell that needs to be removed
                let index = maxAmountOfChilderen - i;
                childrenToBeRemoved.push(children[index]);
            }
            graph.removeCells(childrenToBeRemoved, true);
        }
    },
    changeEdge(name, implication, implicationLevel, implicationColor){
        state.selectedCell.value = name;
        state.editor.graph.getModel().setValue(state.selectedCell, name);

        if(state.selectedCell.style.includes("strokeColor")){
            //the first index are the styles that you want to reuse
            //the second index is the part that you want to replace
            let styles = state.selectedCell.style.split("strokeColor");
            state.selectedCell.style = styles[0];
        }
        state.selectedCell.style += "strokeColor=" + implicationColor
        state.editor.graph.refresh();

        state.selectedCell.lincData[0].value = implication;
        state.selectedCell.lincData[1].value = implicationLevel;
    },
    //Generic method for a basic node with 2 inputs nodeName (name of the cell) and name of the first lincdata prop (question etc...)
    genericChangeNode(nodeName, name){
        state.selectedCell.value = nodeName;
        state.editor.graph.getModel().setValue(state.selectedCell, nodeName);
        state.selectedCell.lincData[0].value = name;
    }
}