<template>
  <v-layout fluid align-space-around justify-start row>
    <Drawer/>
    <div id="toolbarContainer" class="toolbar"></div>
    <v-layout id="flowchartContainer" class="flowchart"/>
    <div id="formatbarContainer" class="format">
        <GeneralFunctions v-show="formatBarType == null"/>
        <QuestionFunctions v-show="formatBarType == this.$data.nodeEnum.Question"/>
        <ModuleFunctions v-show="formatBarType == this.$data.nodeEnum.Module"/>
        <NotificationFunctions v-show="formatBarType == this.$data.nodeEnum.Notification"/>
        <MultipleChoiceFunctions v-show="formatBarType == this.$data.nodeEnum.MultipleChoice"/>
        <ChoiceFunctions v-show="formatBarType == this.$data.nodeEnum.Choice"/>
        <EdgeFunctions v-show="formatBarType == this.$data.nodeEnum.Edge"/>
    </div>
    <FlowchartForm id="importForm"/>
    <ImageSelectorDialog/>
  </v-layout>
</template>

<style>
#core-view {
    padding-bottom: 0;
}
.toolbar{
    width: 60px;
    height: 100%;
    background-color: #ffffff;
    padding-left: 15px;
    padding-right: 15px;
}
.flowchart{
    width: 100%;
    height: 95vh;
    overflow: hidden;
}
.format{
    width: 450px;
    max-height: 95vh;
    overflow-y: auto;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 25px;
}

.cellDiv {
    width: 100%;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

.cell {
    font-size: 24px;
    text-align: center;
    padding-bottom: 15px;
    margin: 0px;
}

.cellInput {
    resize: none;
    min-height: 50px;
    max-height: 150px;
    width: 100%;
    font-size: 16px;
    padding: 5px;
    margin-bottom: 15px;
    background-color: #efefef;
}

.cellButton {
    background-color: rgb(198, 18, 11);
    border-color: rgb(198, 18, 11);
    padding: 12px 30px;
    font-size: 12px;
    font-weight: 400 !important;
    height: auto;
    line-height: 1.5em;
    color: #ffffff !important;
    cursor: pointer;
    border-radius: 3px;
    text-transform: uppercase;
}

.cellConditionsDiv {
    width: 100%;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

.cellConditionsTitle {
    font-size: 24px;
    text-align: center;
    padding-bottom: 15px;
    margin: 0px;
}

.cellConditionsInputDiv {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.cellConditionInput {
    height: 50px;
    font-size: 16px;
    padding: 5px;
    margin-bottom: 15px;
}

.cellConditionsInputButton {
    background-color: rgb(198, 18, 11);
    border-color: rgb(198, 18, 11);
    padding: 12px 30px;
    font-size: 12px;
    font-weight: 400 !important;
    height: auto;
    line-height: 1.5em;
    color: #ffffff !important;
    cursor: pointer;
    border-radius: 3px;
    text-transform: uppercase;
}

.cellCondition {
    text-align: center;
    font-size: 21px;
    background: #EF8581;
    color: white;
    padding: 5px;
    width: 80%;
}

.cellConditionActive {
    font-size: 21px;
    text-align: center;
    background: #C6120B;
    color: white;
    padding: 5px;
    width: 80%;
}

.cellCondition:hover { 
    background-color: #d35c58;
    cursor: pointer;
  }

.cellConditionDiv {
    width: 100%;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

.cellConditionButton {
    background-color: rgb(198, 18, 11);
    border-color: rgb(198, 18, 11);
    padding: 12px 30px;
    font-size: 12px;
    font-weight: 400 !important;
    height: auto;
    line-height: 1.5em;
    color: #ffffff !important;
    cursor: pointer;
    border-radius: 3px;
    text-transform: uppercase;}

.questionSearchbar {
font-size: 16px;
padding: 5px;
margin-bottom: 15px;
}

.cellConditionsQuestionsDiv {
    width: 100%;
    max-height: 195px;
    overflow: auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 15px;
}

.mxToolbarItem{
    width: 30px;
    height: 30px;
    margin: 5px;
    background-size: 100%;
    text-align: center;
}

.mxRubberband{
    /* background-color: aqua; */
    outline: 2px groove black;
    position: absolute;
}
body div.mxPopupMenu {
    -webkit-box-shadow: 3px 3px 6px #C0C0C0;
    -moz-box-shadow: 3px 3px 6px #C0C0C0;
    box-shadow: 3px 3px 6px #C0C0C0;
    background: white;
    position: absolute;
    border: 3px solid #e7e7e7;
    padding: 3px;
}
body table.mxPopupMenu {
    border-collapse: collapse;
    margin: 0px;
}
body tr.mxPopupMenuItem {
    color: black;
    cursor: default;
}
body td.mxPopupMenuItem {
    padding: 6px 60px 6px 30px;
    font-family: Arial;
    font-size: 10pt;
}
body td.mxPopupMenuIcon {
    background-color: white;
    padding: 0px;
}
body tr.mxPopupMenuItemHover {
    background-color: #eeeeee;
    color: black;
}
table.mxPopupMenu hr {
    border-top: solid 1px #cccccc;
}
table.mxPopupMenu tr {
    font-size: 4pt;
}
</style>

<script>
import { mapState, mapActions } from "vuex";
import FlowchartForm from "@/components/flowcharteditor/FlowchartForm";
import ImageSelectorDialog from "@/components/flowcharteditor/ImageSelectorDialog";
import GeneralFunctions from "@/components/flowcharteditor/formatbar/GeneralFunctions";
import QuestionFunctions from "@/components/flowcharteditor/formatbar/question-functions/QuestionFunctions";
import MultipleChoiceFunctions from "@/components/flowcharteditor/formatbar/question-functions/MultipleChoiceFunctions";
import ChoiceFunctions from "@/components/flowcharteditor/formatbar/ChoiceFunctions";
import EdgeFunctions from "@/components/flowcharteditor/formatbar/edge-functions/EdgeFunctions";
import NotificationFunctions from "@/components/flowcharteditor/formatbar/NotificationFunctions";
import ModuleFunctions from "@/components/flowcharteditor/formatbar/ModuleFunctions";
import Drawer from "@/components/core/Drawer";

/**
 * Returns the flowchart page, where the user can create and edit flowcharts
 * @memberof view
 */
export default {
    components: {
        Drawer,
        ImageSelectorDialog,
        FlowchartForm,
        GeneralFunctions,
        QuestionFunctions,
        MultipleChoiceFunctions,
        ChoiceFunctions,
        EdgeFunctions,
        NotificationFunctions,
        ModuleFunctions
    },
    mounted(){
        this.startEditor();
    },
    methods: {
        ...mapActions("app/", ["setBackground", "setFooterColor"])
    },
    beforeMount() {
        this.setBackground("transparent");
        this.setFooterColor("#c01833");
    },
    beforeDestroy() {
        this.setFooterColor("#fff");
    },
    computed: {
        ...mapState("flowcharteditor/", ["formatBarType"])
    }
}
</script>