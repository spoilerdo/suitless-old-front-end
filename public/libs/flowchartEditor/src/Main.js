/**
 * Main.js loads the mxGraph, toolbar, rubberband, etc.
 * the entrypoint for flowhcart.js.
 * @author Julius Ammerlaan, Martijn Dormans
 * @version 1.1
 * @since 18-02-2019
 */

//Script that displays the toolbar on the left
import { createToolbar } from "./Toolbar"

//Script that contains the main functions for the formatbar on the right
import { createFormatbar } from "./FormatBar/Formatbar"

//Scripts that contains the main functions to draw lines between nodes 
//and giving a small menu when drawing a line without connecting it to a node
import { createRubberband } from "./MxNative/Rubberband"
import { createSnapPoints } from "./MxNative/SnapPoints";
import { vertexOnDraw } from "./MxNative/CreateVertexOnDraw";

//Script that contains the main editor functions (import-, export flowchart, create edges and nodes)
import { editorFunctions } from "./EditorFunctions/EditorFunctions";

//Some constants
import { environment } from "./EnvironmentVariables";

//Script that contains the main background functionality in order to adjust the grid size etc.
import { backgroundFunctions } from "./Background";

//Enum that contains all the nodes
import { NodeEnum } from "./NodeEnum";

//Script that contains the main Clipboard functionality (copy, paste and cut)
import { clipBoardFunctions } from "./MxNative/Clipboard";

//Script that contains the main resize cells functionality
import { autoResizeCells } from "./MxNative/AutoResizeCell";

//Script that contains some connection handler functionality
import { connectionHandlerFunctions } from "./MxNative/MxConnectionHandler";

//Script that will auto save the flowchart to the local storage
import { initAutoSave } from "./MxNative/AutoSave";

//Script that will be triggered whenever cells are removed
import { cellsRemovedFunctions } from "./MxNative/CellsRemoved";

//Script that is the store of the flowchart editor this script contains some general information 
//about the flowchart that will be shared with Vue trough the plugin script
import { state } from "./store/flowcharteditorEndpoint";

import { mxClient, mxGraph, mxUtils, mxEvent, mxEditor, mxGraphModel, mxKeyHandler, mxUndoManager, mxConstants, mxGraphView } from "./MxGraph";

/**
 * triggers the flowchart to be created.
 */
const flowchartEditor = {
    startEditor() {
        var graphContainer = document.getElementById(environment.graphContainerId);
        var toolbarContainer = document.getElementById(environment.toolbarContainerId)
        var formatbarContainer = document.getElementById(environment.formatbarContainerId)

        main(graphContainer, toolbarContainer, formatbarContainer);
    }
}

export default flowchartEditor;

/**
 * Entry point, should be fired when the graphContainer is loaded.
 * this fails if the browser is not supported.
 * @param {Element} graphContainer
 * @param {Element} toolbarContainer
 * @param {Element} formatbarContainer
 */
let main = (graphContainer, toolbarContainer, formatbarContainer) => {
    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported()) {
        // Displays an error message if the browser is not supported.
        mxUtils.error('Browser is not supported!', 200, false);
    }
    else {
        // Creates the graph inside the given container
        let editor = new mxEditor();
        let model = new mxGraphModel();
        let graph = new mxGraph(graphContainer, model);
        let keyHandler = new mxKeyHandler(graph);
        let undoManager = new mxUndoManager();

        let undoListener = function (sender, evt) {
            undoManager.undoableEditHappened(evt.getProperty('edit'));
        }
        vertexOnDraw(mxEvent, graph);

        editor.graph = graph;

        graph.setCellsEditable(true);
        graph.setPanning(true);
        graph.setCellsDisconnectable(false);
        graph.setHtmlLabels(true);
        graph.setConnectable(true);
        graph.getModel().addListener(mxEvent.UNDO, undoListener)
        graph.getView().addListener(mxEvent.UNDO, undoListener)

        connectionHandlerFunctions(graph);

        createSnapPoints(graph, model);

        createRubberband(graph);

        mxConstants.WORD_WRAP = 'break-word';

        editorFunctions.addCustomShapes(graph);

        createToolbar(toolbarContainer, editor, model, keyHandler, window, undoManager);
        createFormatbar(editor, model);

        backgroundFunctions.init(graph);
        var mxGraphViewValidateBackground = mxGraphView.prototype.validateBackground;
        mxGraphView.prototype.validateBackground = function () {
            mxGraphViewValidateBackground.apply(this, arguments);
            backgroundFunctions.repaintGrid();
        };

        clipBoardFunctions(graph);

        initAutoSave(graph, model);

        cellsRemovedFunctions(graph);

        autoResizeCells(graph);

        /**
         * When a new flowchart has been set this will trigger and activate the import function
         */
        state.flowchart.registerListener(function (val) {
            editorFunctions.importChart(graph, val.nodes, model);
        })

        let localModel = JSON.parse(localStorage.getItem("model")) || null;
        if(localModel && localModel.nodes && localModel.nodes.length > 1){
            editorFunctions.importChart(graph, localModel.nodes, model)
        } else {
            StartFlowchart(graph);
        }

        state.editor = editor;
    }
};

/**
 * Adds the startNode you want to begin a flowchart with
 * @param {mxGraph} graph 
 */
function StartFlowchart(graph) {
    //Adds cells to the model in a single step
    graph.getModel().beginUpdate();
    try {
        editorFunctions.addVertex(NodeEnum.Start, graph, null, 20, 20);
    } finally {
        graph.getModel().endUpdate();
    }
}