import flowchartEditor from '../../../public/libs/flowchartEditor/src/Main';
import { state, methods } from '../../../public/libs/flowchartEditor/src/store/flowcharteditor';
import { mapActions } from 'vuex';
import { NodeEnum } from '../../../public/libs/flowchartEditor/src/NodeEnum';
import { ImplicationEnum } from '../../../public/libs/flowchartEditor/src/ImplicationEnum';

export default {
    install(Vue) {
        Vue.mixin({
            methods: {
                //Map the actions that will change the Vue store values
                ...mapActions("flowcharteditor/", ["setDialog", "setFormatBarType", "setSelectedCell"]),
                startEditor() {
                    flowchartEditor.startEditor();
                    let setDialogmethod = this.setDialogState;
                    state.dialog.registerListener(function(val){
                        setDialogmethod(val);
                    })

                    /*
                    register to the variable that will change when the variable changes.
                    When something changes in the store of the flowchart editor 
                    this function will be called in order to update the Vue store
                    */
                    let setActiveFormatBarmethod = this.setActiveFormatBar;
                    state.activeFormatBar.registerListener(function(val){
                        setActiveFormatBarmethod(val);
                    })

                    let setSelectedCellmethod = this.setnewSelectedCell;
                    state.newCell.registerListener(function(val){
                        setSelectedCellmethod(val);
                    })
                },
                setDialogState(val) {
                    this.setDialog(val);
                },

                //Function for the flowchart plugin callbacks
                setActiveFormatBar(val) {
                    this.setFormatBarType(val);
                },

                setnewSelectedCell(val){
                    this.setSelectedCell(val);
                },

                setFlowchartState(val) {
                    methods.setFlowchart(val);
                },
                getFlowchart(name, description) {
                    return methods.getFlowchart(name, description);
                },

                /*
                Methods from the flowchart plugin that you want to call whenever you apply new changes
                */
                changeQuestionNode(questionNode, question, reason){
                    methods.changeQuestionNode(questionNode, question, reason);
                },
                genericChangeNode(nodeName, name){
                    methods.genericChangeNode(nodeName, name);
                },
                changeMultipleChoiceNode(nodeName, title, amountOfChoices, reason, loopSubQuestions){
                    methods.changeMultipleChoiceNode(nodeName, title, amountOfChoices, reason, loopSubQuestions);
                },
                changeEdge(name, implication, implicationLevel, implicationColor){
                    methods.changeEdge(name, implication, implicationLevel, implicationColor);
                }
            },
            data: function () {
                return {
                    nodeEnum: NodeEnum,
                    implicationEnum: ImplicationEnum
                };
            }
        })

    }
}