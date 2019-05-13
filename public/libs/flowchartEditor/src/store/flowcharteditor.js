import { graphFunctions } from "../EditorFunctions";

export const state = {
    dialog: {
        dialogInternal: false,
        dialogListener: function (val) { },
        set set(val) {
            this.dialogInternal = val;
            this.dialogListener(val);
        },
        get get() {
            return this.dialogInternal;
        },
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
    The booleans that change value whenever a certain menu needs to be shown
    */
    generalfunctions: {
        gfInternal: true,
        gfListener: function (val) { },
        set set(val) {
            this.gfInternal = val;
            this.gfListener(val);
        },
        get get() {
            return this.gfInternal;
        },
        registerListener: function (listener) {
            this.gfListener = listener;
        }
    },
    questionfunctions: {
        questionInternal: false,
        questionListener: function(val) { },
        set set(val) {
            this.questionInternal = val;
            this.questionListener(val);
        },
        get get() {
            return this.questionInternal;
        },
        registerListener: function (listener) {
            this.questionListener = listener;
        }
    },
    modulefunctions: {
        moduleInternal: false,
        moduleListener: function(val) { },
        set set(val){
            this.moduleInternal = val;
            this.moduleListener(val);
        },
        get get(){
            return this.moduleInternal;
        },
        registerListener: function (listener) {
            this.moduleListener = listener;
        }
    },
    notificationfunctions: {
        notificationInternal: false,
        notificationListener: function(val) { },
        set set(val){
            this.notificationInternal = val;
            this.notificationListener(val);
        },
        get get(){
            return this.notificationInternal;
        },
        registerListener: function (listener) {
            this.notificationListener = listener;
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
    getFlowchart(name, description) {
        return graphFunctions.exportChart(state.editor.graph, name, description);
    },

    /*
    These methods will be called from the Vue plugin instance and will change the look of the selectedcell,
    by the newly inputed values from the user
    TODO: refactor this a bit and finish adding all the functionality
    */
    changeQuestionNode(questionNode, question, reason, implication){
        state.selectedCell.value = questionNode;
        state.editor.graph.getModel().setValue(state.selectedCell, questionNode);
        state.selectedCell.lincData[0].value = question;
    },
    changeModuleNode(moduleNode, moduleName){
        state.selectedCell.value = moduleNode;
        state.editor.graph.getModel().setValue(state.selectedCell, moduleNode);
        state.selectedCell.lincData[0].value = moduleName;
    },
    changeNotificationNode(notificationNode, notificationName){
        state.selectedCell.value = notificationNode;
        state.editor.graph.getModel().setValue(state.selectedCell, notificationNode);
        state.selectedCell.lincData[0].value = notificationName;
    }
}