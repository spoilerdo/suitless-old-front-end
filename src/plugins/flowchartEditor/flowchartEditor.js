import flowchartEditor from '../../../public/libs/flowchartEditor/src/Main';
import { state, methods } from '../../../public/libs/flowchartEditor/src/store/flowcharteditor';
import { mapActions } from 'vuex';

export default {
    install(Vue) {
        Vue.mixin({
            methods: {
                //Map the actions that will change the Vue store values
                ...mapActions("flowcharteditor/", ["setDialog", "setGeneralFunctions", "setQuestionFunctions", "setModuleFunctions", "setNotificationFunctions"]),
                startEditor() {
                    flowchartEditor.startEditor();
                    let setDialogmethod = this.setDialogState;
                    state.dialog.registerListener(function(val){
                        setDialogmethod(val);
                    })

                    /*
                    register to the booleans that will change when a window needs to be shown.
                    When something changes in the store of the flowchart editor 
                    these functions will be called in order to update the Vue store
                    */
                    let setGeneralFunctionsmethod = this.setGeneralFunctionsState;
                    state.generalfunctions.registerListener(function(val){
                        setGeneralFunctionsmethod(val);
                    })

                    let setQuestionFunctionsMethod = this.setQuestionFunctionsState;
                    state.questionfunctions.registerListener(function(val){
                        setQuestionFunctionsMethod(val);
                    })

                    let setModuleFunctionsMethod = this.setModuleFunctionsState;
                    state.modulefunctions.registerListener(function(val){
                        setModuleFunctionsMethod(val);
                    })

                    let setNotificationFunctionsMethod = this.setNotificationFunctionsState;
                    state.notificationfunctions.registerListener(function(val){
                        setNotificationFunctionsMethod(val);
                    })
                },
                setDialogState(val) {
                    this.setDialog(val);
                },

                /*
                Functions for the flowchart plugin callbacks
                */
                setGeneralFunctionsState(val) {
                    this.setGeneralFunctions(val);
                },
                setQuestionFunctionsState(val){
                    this.setQuestionFunctions(val);
                },
                setModuleFunctionsState(val){
                    this.setModuleFunctions(val);
                },
                setNotificationFunctionsState(val){
                    this.setNotificationFunctions(val);
                },

                setFlowchartState(val) {
                    methods.setFlowchart(val);
                },
                getFlowchart(name, description) {
                    return methods.getFlowchart(name, description)
                },

                /*
                Methods from the flowchart plugin that you want to call whenever you apply new changes
                */
                changeQuestionNode(questionNode, question, reason, implication){
                    methods.changeQuestionNode(questionNode, question, reason, implication);
                },
                changeModuleNode(moduleNode, moduleName){
                    methods.changeModuleNode(moduleNode, moduleName);
                },
                changeNotificationNode(notificationNode, notificationName){
                    methods.changeNotificationNode(notificationNode, notificationName);
                }
            }
        })

    }
}