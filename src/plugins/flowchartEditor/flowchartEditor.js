import flowchartEditor from '../../../public/libs/flowchartEditor/src/Main';

export default {
    install(Vue){
        Vue.mixin({
            methods: {
                startEditor(){
                    flowchartEditor.startEditor();
                }
            }
        })
    }
}