/**
 * The store of the flowchart editor.
 * This script contains some general information that can be communicated to Vue.js trough the Plugin script in Vue
 * @author Martijn Dormans
 * @version 1.3
 * @since 17-04-2019
 */

import { editorFunctions } from "../EditorFunctions/EditorFunctions";
import { addSubVertexes } from "../EditorFunctions/PrivateFunctions";
import { QuestionNode } from "../EditorFunctions/NodeClasses/QuestionNode";
import { MultiChoiceNode } from "../EditorFunctions/NodeClasses/MultiChoiceNode";
import { ChoiceNode } from "../EditorFunctions/NodeClasses/ChoiceNode";
import { ModuleNode } from "../EditorFunctions/NodeClasses/ModuleNode";
import { NotificationNode } from "../EditorFunctions/NodeClasses/NotificationNode";
import { EdgeNode } from "../EditorFunctions/NodeClasses/EdgeNode";

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
        dialogListener: function () { },
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
        flowchartListener: function () { },
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
    constraint: null,

    newCell: {
        newCellInternal: null,
        newCellListener: function () { },
        set set(val) {
            this.newCellInternal = val;
            this.newCellListener(val);
        },
        get get() {
            return this.newCellInternal;
        },
        registerListener: function (listener) {
            this.newCellListener = listener;
        }
    },

    model: null,

    /*
    Variable that changes the formatbar when a certain node has been selected
    */
    activeFormatBar: {
        activeFormatBarInternal: null,
        activeFormatBarListener: function () { },
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
    },

    /*
    The theme is used in order to import the correct colors from Vuetify.
    This is manly used at the moment for the edge color imports.
    The advantage is that you can change the color by changing the theme, even when you import an older flowchart
    */
   theme: null
};

export const methods = {
    setDialog(val) {
        state.dialog.set = val;
    },
    setFlowchart(val) {
        state.flowchart.set = val;
    },
    getFlowchart(name, description, lincData) {
        return editorFunctions.exportChart(state.editor.graph, name, description, lincData);
    },

    /*
    These methods will be called from the Vue plugin instance and will change the look of the selectedcell,
    by the newly inputed values from the user
    */
    //Generic method to change the node value. This displays the node name in the flowchart editor
    genericChangeNode(nodeName){
    state.selectedCell.value = nodeName;
    state.editor.graph.getModel().setValue(state.selectedCell, nodeName);
    /*if(state.selectedCell.lincData){
        state.selectedCell.lincData.find(data => data.key === keyName).value = name;
    }*/
    },
    changeQuestionNode(nodeName, question, reasons){
        this.genericChangeNode(nodeName);

        let questionNode = new QuestionNode(question, reasons);
        state.selectedCell.lincData = questionNode.getData();
    },
    changeMultipleChoiceNode(nodeName, question, amountOfChoices, reasons, loopSubQuestions){
        this.genericChangeNode(nodeName);

        let graph = state.editor.graph;
        
        //get the child count (amount of choices)
        let childerenCount = state.selectedCell.getChildCount();

        if(childerenCount < amountOfChoices){
            //add some choices because the user wants more than he already has
            addSubVertexes(graph, state.selectedCell, null, amountOfChoices, childerenCount);
        }else if(childerenCount > amountOfChoices){
            //delete some cells because the user wants less then he already has

            //get the amount of cells that need to be removed
            let children = state.selectedCell.children;
            let maxAmountOfChilderen = state.selectedCell.children.length;
            let cellToBeRemoved = maxAmountOfChilderen - amountOfChoices;

            let childrenToBeRemoved = [];
            //loop trough the amount of cells that need to be removed in order to remove the cells
            for (let i = 1; i <= cellToBeRemoved; i++) {
                //get the index of the cell that need to be removed
                let index = maxAmountOfChilderen - i;
                childrenToBeRemoved.push(children[index]);
            }
            graph.removeCells(childrenToBeRemoved, true);
        }

        let multiChoiceNode = new MultiChoiceNode(question, reasons, loopSubQuestions, state.selectedCell.children);
        state.selectedCell.lincData = multiChoiceNode.getData();
    },
    changeChoiceNode(nodeName, name, imageName) {
        this.genericChangeNode(nodeName);

        let choiceNode = new ChoiceNode(name, imageName);
        state.selectedCell.lincData = choiceNode.getData();
    },
    changeModuleNode(nodeName, name) {
        this.genericChangeNode(nodeName);
        
        let moduleNode = new ModuleNode(name);
        state.selectedCell.lincData = moduleNode.getData();
    },
    changeNotificationNode(nodeName, name) {
        this.genericChangeNode(nodeName);

        let notificationNode = new NotificationNode(name);
        state.selectedCell.lincData = notificationNode.getData();
    },
    changeEdge(nodeName, answer, implications, implicationColor, imageName){
        this.genericChangeNode(nodeName);

        if(state.selectedCell.style.includes("strokeColor")){
            //the first index are the styles that you want to reuse
            //the second index is the part that you want to replace
            let styles = state.selectedCell.style.split("strokeColor");
            state.selectedCell.style = styles[0];
        }
        state.selectedCell.style += "strokeColor=" + implicationColor
        state.editor.graph.refresh();

        let edgeNode = new EdgeNode(answer, imageName, implications);
        state.selectedCell.lincData = edgeNode.getData();
    }
}