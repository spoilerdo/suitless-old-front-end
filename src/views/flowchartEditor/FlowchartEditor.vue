<template>
  <v-layout fluid align-space-around justify-start row fill-height>
    <div id="toolbarContainer" class="toolbar"></div>
    <v-layout id="flowchartContainer" class="flowchart" align-space-around justify-center row fill-height/>
    <div id="formatbarContainer" class="format"></div>
    <FlowchartForm id="importForm"/>
  </v-layout>
</template>

<style>
.toolbar{
    width: 60px;
    height: 100%;
    background-color: #ffffff;
    padding-left: 15px;
    padding-right: 15px;
}
.flowchart{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.format{
    width: 400px;
    padding-left: 15px;
    padding-right: 40px;
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
import {mapActions } from "vuex";
import FlowchartForm from "@/components/flowcharteditor/FlowchartForm";

export default {
    components: {
        FlowchartForm
    },
    mounted(){
        this.startEditor();
    },
    methods: {
        ...mapActions("app/", ["setBackground"]),
    },
    beforeMount() {
        this.setBackground("transparent");
    }
}
</script>
