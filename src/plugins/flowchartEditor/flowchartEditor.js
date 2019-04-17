import flowchartEditor from '../../../public/libs/flowchartEditor/src/Main';
import { state, methods } from '../../../public/libs/flowchartEditor/src/store/flowcharteditor';
import { mapActions } from 'vuex';

export default {
    install(Vue) {
        Vue.mixin({
            methods: {
                ...mapActions("flowcharteditor/", ["setDialog"]),
                startEditor() {
                    flowchartEditor.startEditor();
                    let setDialogmethod = this.setDialogState;
                    state.dialog.registerListener(function(val){
                        setDialogmethod(val);
                    })
                },
                setDialogState(val) {
                    this.setDialog(val);
                },
                setFlowchartState(val) {
                    console.log("plugin flowchart");
                    methods.setFlowchart(val);
                }
            }
        })

    }
}