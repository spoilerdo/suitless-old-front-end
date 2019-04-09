/**
 * spawns a toolbar with tools attached to the mxGraph.
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 18-02-2019
 */

import { environment } from "./EnvironmentVariables"
import { graphFunctions } from "./EditorFunctions"
import { addKeyActions } from "./MxNative/keyActions"
import { NodeEnum } from "./NodeEnum";
import { testJSON } from './testJSON';
import { mxUtils, mxEditor, mxGraphModel, mxToolbar, mxClipboard } from "./MxGraph";

/**
 * Creates the mxToolbar and adds the 
 * needed toolbar items.
 * @param {Element} toolbarContainer 
 * @param {mxEditor} editor 
 * @param {mxKeyhandler} keyHandler
 * @param {XmlDocument} doc
 */
export function createToolbar(toolbarContainer, editor, model, keyHandler, graphcontainer) {

    let toolbar = new mxToolbar(toolbarContainer);

    addDefaultActions(toolbar, editor.graph);
    addKeyActions(keyHandler, editor.graph, graphcontainer);
    addDedicatedActions(toolbar, editor, model);
}

/**
 * uses the addItem function of the mxDefaultToolbar to add most basic
 * actions to the toolbar.
 * @param {mxDefaultToolbar} toolbar 
 */
function addDefaultActions(toolbar, graph) {
    toolbar.addItem('Copy', "http://ironsm4sh.nl:3305/Copy", mxUtils.bind(this, function () {
        mxClipboard.copy(graph);
    }), null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem('Paste', "http://ironsm4sh.nl:3305/Paste", mxUtils.bind(this, function () {
        mxClipboard.paste(graph);
    }), null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem('Delete', "http://ironsm4sh.nl:3305/Delete", mxUtils.bind(this, function () {
        graph.removeCells();
    }), null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem('Cut', "http://ironsm4sh.nl:3305/Cut", mxUtils.bind(this, function () {
        mxClipboard.cut(graph);
    }), null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem('Zoom out', "http://ironsm4sh.nl:3305/MagnifyMinus", mxUtils.bind(this, function () {
        graph.zoomOut();
    }), null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem('Zoom In', "http://ironsm4sh.nl:3305/MagnifyPlus", mxUtils.bind(this, function () {
        graph.zoomIn();
    }), null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem('To Front', "http://ironsm4sh.nl:3305/ToFront", mxUtils.bind(this, function () {
        graph.orderCells(false);
    }), null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem('To Back', "http://ironsm4sh.nl:3305/ToBack", mxUtils.bind(this, function () {
        graph.orderCells(true);
    }), null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem('Fit screen', "http://ironsm4sh.nl:3305/Fit", mxUtils.bind(this, function () {
        graph.fit();
    }), null, "v-icon mdi theme--light mxToolbarItem");
}

/**
 * adds a hover in order to explain the icons
 */
/*function addHover(toolbar, graph){
    let hover = document.createElement("v-tooltip")
    hover.setAttribute("right", true)
    let template = document.createElement("template");
    template.setAttribute("v-slot:activator", "{ on }")
    toolbar.addItem('', null, mxgraph.mxUtils.bind(this, function () {
        mxgraph.mxClipboard.copy(graph);
    }), null, "v-icon mdi mdi-content-copy theme--light");
    hover.appendChild(document.createElement("template"))
}*/

/**
 * uses the mxToolbar to add dedicated ehvLINC actions.
 * @param {mxToolbar} toolbar
 * @param {mxEditor} editor
 * @param {mxGraphModel} model
 */
function addDedicatedActions(toolbar, editor, model) {
    toolbar.addItem('Add question node', "http://ironsm4sh.nl:3305/questionNode",
        (click) => {
            graphFunctions.addVertex(NodeEnum.Question, editor.graph, null, null, null);
        }, null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem('Add module node', "http://ironsm4sh.nl:3305/moduleNode",
        (click) => {
            graphFunctions.addVertex(NodeEnum.Module, editor.graph, null, null, null);
        }, null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem("Add end node", "http://ironsm4sh.nl:3305/endNode",
        (click) => {
            graphFunctions.addVertex(NodeEnum.End, editor.graph, null, null, null)
        }, null, "v-icon mdi theme--light mxToolbarItem")
    toolbar.addItem("Add notification node", "http://ironsm4sh.nl:3305/notificationNode",
        (click) => {
            graphFunctions.addVertex(NodeEnum.Notification, editor.graph, null, null, null);
        }, null, "v-icon mdi theme--light mxToolbarItem");
    /*toolbar.addItem("Add edge", "http://ironsm4sh.nl:3305/AddEdge",
        (click) => {
            graphFunctions.addEdge(editor.graph, null);
        }, null, "v-icon mdi theme--light mxToolbarItem");
    /*toolbar.addItem("Export chart", environment.img + "ExportTool.png",
        (click) => {
            graphFunctions.exportChart(editor.graph)
        }, null, "mxToolbarItem mxToolbarNode");
    toolbar.addItem("Import chart", environment.img + "CopyTool.png",
        (click) => {
            graphFunctions.importChart(editor.graph, testJSON, model)
        }, null, "mxToolbarItem mxToolbarNode");*/
}