/**
 * spawns a toolbar with tools attached to the mxGraph.
 * @author Julius Ammerlaan, Martijn Dormans
 * @version 2.0
 * @since 18-02-2019
 */

import { addKeyActions } from "./MxNative/keyActions"
import { mxUtils, mxToolbar, mxClipboard } from "./MxGraph";

/**
 * Creates the mxToolbar and adds the 
 * needed toolbar items.
 * @param {Element} toolbarContainer 
 * @param {mxEditor} editor 
 * @param {mxKeyhandler} keyHandler
 * @param {XmlDocument} doc
 * @param {mxUndoManager} undoManager
 */
export function createToolbar(toolbarContainer, editor, model, keyHandler, graphcontainer, undoManager) {

    let toolbar = new mxToolbar(toolbarContainer);

    addDefaultActions(toolbar, editor.graph);
    addKeyActions(keyHandler, editor.graph, graphcontainer, undoManager);
}

/**
 * uses the addItem function of the mxDefaultToolbar to add most basic
 * actions to the toolbar.
 * @param {mxDefaultToolbar} toolbar 
 */
function addDefaultActions(toolbar, graph) {
    toolbar.addItem('Copy', "http://startupseindhoven.nl/api/cdn/Copy", mxUtils.bind(this, function () {
        mxClipboard.copy(graph);
    }), null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem('Paste', "http://startupseindhoven.nl/api/cdn/Paste", mxUtils.bind(this, function () {
        mxClipboard.paste(graph);
    }), null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem('Delete', "http://startupseindhoven.nl/api/cdn/Delete", mxUtils.bind(this, function () {
        graph.removeCells();
    }), null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem('Cut', "http://startupseindhoven.nl/api/cdn/Cut", mxUtils.bind(this, function () {
        mxClipboard.cut(graph);
    }), null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem('Zoom out', "http://startupseindhoven.nl/api/cdn/MagnifyMinus", mxUtils.bind(this, function () {
        graph.zoomOut();
    }), null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem('Zoom In', "http://startupseindhoven.nl/api/cdn//MagnifyPlus", mxUtils.bind(this, function () {
        graph.zoomIn();
    }), null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem('To Front', "http://startupseindhoven.nl/api/cdn//ToFront", mxUtils.bind(this, function () {
        graph.orderCells(false);
    }), null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem('To Back', "http://startupseindhoven.nl/api/cdn//ToBack", mxUtils.bind(this, function () {
        graph.orderCells(true);
    }), null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem('Fit screen', "http://startupseindhoven.nl/api/cdn//Fit", mxUtils.bind(this, function () {
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
/*function addDedicatedActions(toolbar, editor, model) {
    toolbar.addItem('Add question node', "http://ironsm4sh.nl:3305/questionNode",
        (click) => {
            editorFunctions.addVertex(NodeEnum.Question, editor.graph, null, null, null);
        }, null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem('Add module node', "http://ironsm4sh.nl:3305/moduleNode",
        (click) => {
            editorFunctions.addVertex(NodeEnum.Module, editor.graph, null, null, null);
        }, null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem("Add end node", "http://ironsm4sh.nl:3305/endNode",
        (click) => {
            editorFunctions.addVertex(NodeEnum.End, editor.graph, null, null, null)
        }, null, "v-icon mdi theme--light mxToolbarItem")
    toolbar.addItem("Add notepad node", "http://ironsm4sh.nl:3305/questionNode",
        (click) => {
            editorFunctions.addVertex(NodeEnum.MultipleChoice, editor.graph, null, null, null);
        }, null, "v-icon mdi theme--light mxToolbarItem");
    toolbar.addItem("Add edge", "http://ironsm4sh.nl:3305/AddEdge",
        (click) => {
            editorFunctions.addEdge(editor.graph, null);
        }, null, "v-icon mdi theme--light mxToolbarItem");
}*/