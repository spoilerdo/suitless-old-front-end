import flowchartEditor from '../../../public/libs/flowchartEditor/src/Main';
import { state, methods } from '../../../public/libs/flowchartEditor/src/store/flowcharteditor';
import { mapActions } from 'vuex';
import { NodeEnum } from '../../../public/libs/flowchartEditor/src/NodeEnum';
import { ImplicationEnum } from '../../../public/libs/flowchartEditor/src/ImplicationEnum';

/**
 * The flowchart editor plugin, used in the flowchart editor pages
 * @memberof plugin
 */
export default {
    install(Vue) {
        Vue.mixin({
            methods: {
                //Map the actions that will change the Vue store values
                ...mapActions("flowcharteditor/", ["setDialog", "setFormatBarType", "setSelectedCell"]),
                /**
                 * Starts the flowchart editor, and inits defaults
                 * @memberof plugin.flowchartEditor
                 */
                startEditor() {
                    flowchartEditor.startEditor();
                    let setDialogmethod = this.setDialogState;
                    state.dialog.registerListener(function(val){
                        setDialogmethod(val);
                    })

                    /**
                     * register to the variable that will change when the variable changes.
                     * When something changes in the store of the flowchart editor 
                     * this function will be called in order to update the Vue store
                     * @memberof plugin.flowchartEditor
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
                /**
                 * Sets the correct dialogState
                 * @memberof plugin.flowchartEditor
                 * @param {dialogState} val 
                 */
                setDialogState(val) {
                    this.setDialog(val);
                },
                /**
                 * Function for flowchart plugin callbacks
                 * @memberof plugin.flowchartEditor
                 * @param {FormatBarType} val 
                 */
                setActiveFormatBar(val) {
                    this.setFormatBarType(val);
                },

                /**
                 * Sets the new selected cell.
                 * @memberof plugin.flowchartEditor
                 * @param {SelectedCell} val 
                 */
                setnewSelectedCell(val){
                    this.setSelectedCell(val);
                },

                /**
                 * Sets the new flowchart state
                 * @memberof plugin.flowchartEditor
                 * @param {FlowchartState} val 
                 */
                setFlowchartState(val) {
                    methods.setFlowchart(val);
                },

                /**
                 * Gets a flowchart by name and description. 
                 * @memberof plugin.flowchartEditor
                 * @param {String} name 
                 * @param {String} description 
                 * @todo improve this documentation.
                 */
                getFlowchart(name, description) {
                    return methods.getFlowchart(name, description);
                },

                /**
                 * Method from the flowchart plugin that you want to call whenever you apply new changes
                 * @memberof plugin.flowchartEditor
                */
                changeQuestionNode(questionNode, question, reason){
                    methods.changeQuestionNode(questionNode, question, reason);
                },
                
                /**
                 * Method from the flowchart plugin that you want to call whenever you apply new changes
                 * @memberof plugin.flowchartEditor
                */
                genericChangeNode(nodeName, name){
                    methods.genericChangeNode(nodeName, name);
                },
                
                /**
                 * Method from the flowchart plugin that you want to call whenever you apply new changes
                 * @memberof plugin.flowchartEditor
                */
                changeMultipleChoiceNode(nodeName, title, amountOfChoices, reason, loopSubQuestions){
                    methods.changeMultipleChoiceNode(nodeName, title, amountOfChoices, reason, loopSubQuestions);
                },
                
                /**
                 * Method from the flowchart plugin that you want to call whenever you apply new changes
                 * @memberof plugin.flowchartEditor
                */
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