import flowchartEditor from '../../../public/libs/flowchartEditor/src/Main';
import { state, methods } from '../../../public/libs/flowchartEditor/src/store/flowcharteditor';
import { mapActions } from 'vuex';
import { NodeEnum } from '../../../public/libs/flowchartEditor/src/NodeEnum';
import { ImplicationEnum } from '../../../public/libs/flowchartEditor/src/ImplicationEnum';
import { ReasonEnum } from '../../../public/libs/flowchartEditor/src/ReasonEnum';
import { ImplicationColorEnum, ColorImplicationEnum } from "./implicationColorEnum";
import theme from '../vuetify/theme';

/**
 * The flowchart editor plugin, used in the flowchart editor pages
 * This script is used for a loose connection between the plugin and Vue.js
 * It will provide the nescesarry information to the flowcharteditor plugin by looking at the store in the plugin.
 * So if you want to use the flowcharteditor than this should be a complete configuration for your Vue.js setup.
 * The advantage this plugin script provides is the ability to modify the looks of the editor's formatbar and 
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

                    /**
                     * Give the flowchart editor the veutify theme of the linked vue.js project
                     * @memberof plugin.flowchartEditor
                     */
                    state.theme = theme;
                },
                /**
                 * Sets the correct dialogState.
                 * Its used for the import dialog. 
                 * Whenever the import has succeeded and the flowchart plugin is converting the data to a visual flowchart it will close the dialog window by this method.
                 * @memberof plugin.flowchartEditor
                 * @param {dialogState} val is a boolean
                 */
                setDialogState(val) {
                    this.setDialog(val);
                },
                /**
                 * Function for flowchart plugin callbacks.
                 * Its used to activate the correct formatbar for instance the QuestionNode formatbar.
                 * For clarification the instance is a Vue component.
                 * This method should call a store action that will change a state.
                 * @memberof plugin.flowchartEditor
                 * @param {FormatBarType} val 
                 */
                setActiveFormatBar(val) {
                    this.setFormatBarType(val);
                },

                /**
                 * Sets the new selected cell.
                 * Its used to retrieve cell information to fill the formatbar with.
                 * This method should call a store action that will change a state.
                 * @memberof plugin.flowchartEditor
                 * @param {SelectedCell} val a MXGraph cell class
                 */
                setnewSelectedCell(val){
                    this.setSelectedCell(val);
                },

                /**
                 * Sets the new flowchart that has been found by an API call to the back-end
                 * This will start the flowchart importation in the flowchart plugin by the state trigger in the Main.js script
                 * @memberof plugin.flowchartEditor
                 * @param {FlowchartState} val is the JSON of a flowchart
                 */
                setFlowchartState(val) {
                    methods.setFlowchart(val);
                },

                /**
                 * Exports the flowchart that has been made by the editor into a JSON format.
                 * @memberof plugin.flowchartEditor
                 * @param {String} name of the flowchart
                 * @param {String} description of the flowchart
                 * @param {String} lincData an array of mesceleanous data that can be used by the front-end
                 */
                getFlowchart(name, description, lincData) {
                    return methods.getFlowchart(name, description, lincData);
                },

                /**
                 * Changes the selected question nodes data.
                 * This will be called from a QuestionNode Formatbar Vue component
                 * @memberof plugin.flowchartEditor
                 * @param {String} questionNode the value of the selected question cell
                 * @param {String} question the question that will be asked in the survey front-end
                 * @param {String} reason the reason why you ask the question
                */
                changeQuestionNode(questionNode, question, reasons){
                    methods.changeQuestionNode(questionNode, question, reasons);
                },
                
                /**
                 * Changes the selected node data of a generic node.
                 * For instance a notification node.
                 * @memberof plugin.flowchartEditor
                 * @param {String} nodeName the value of the selected generic cell
                 * @param {String} name the value that will be used in the survey front-end 
                */
                genericChangeNode(nodeName, name){
                    methods.genericChangeNode(nodeName, name);
                },
                
                /**
                 * Changes the selected multi choice node data.
                 * @memberof plugin.flowchartEditor
                 * @param {String} nodeName the value of the selected multichoice cell
                 * @param {String} title the title of the multi choice, this will also be the question asked in the front-end
                 * @param {Number} amountOfChoices the amount of choices this multi choice contains
                 * @param {String} reason the reason why you ask the question
                 * @param {Boolean} loopSubQuestions used in order to loob the same subquestion if there are any.
                */
                changeMultipleChoiceNode(nodeName, title, amountOfChoices, reason, loopSubQuestions){
                    methods.changeMultipleChoiceNode(nodeName, title, amountOfChoices, reason, loopSubQuestions);
                },
                
                /**
                 * Change the selected edge data
                 * @memberof plugin.flowchartEditor
                 * @param {String} name the value of the selected edge
                 * @param {String} implications the implications of the edge/ answer of the question
                 * @param {String} imageName the name of the image that is used for this edge/ answer
                */
                changeEdge(nodeName, name, implications, implicationColor, imageName){
                    methods.changeEdge(nodeName, name, implications, implicationColor, imageName);
                }
            },
            /**
             * This contains some enums that can be used in the Vue project
             * @memberof plugin.flowchartEditor
             */
            data: function () {
                return {
                    /**
                     * @memberof plugin.flowchartEditor
                     * The nodeEnum can be used to alter between node format bar types or just to specify a certain node type
                     */
                    nodeEnum : NodeEnum,
                    /**
                     * The ReasonEnum can be used to keep track of all the different types of reason a builder give to the user
                     * @memberof plugin.flowchartEditor
                     */
                    reasonEnum : ReasonEnum,
                    /**
                     * @memberof plugin.flowchartEditor
                     * The implicationEnum can be used to keep track of all the different implications that are avaialble on an edge
                     */
                    implicationEnum : ImplicationEnum,
                    /**
                     * @memberof plugin.flowchartEditor
                     * The implication color enum can be used to map the implication to the veutify color theme
                     */
                    implicationColorEnum : ImplicationColorEnum,
                    /**
                     * @memberof plugin.flowchartEditor
                     * The color implication enum can be used to map the veutify color theme to the implication
                     */
                    colorImplicationEnum : ColorImplicationEnum
                };
            }
        })

    }
}