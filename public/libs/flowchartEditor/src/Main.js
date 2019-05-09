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
import { snapToFixedPoint } from "./MxNative/Snapping";
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

//Script that is the store of the flowchart editor this script contains some general information 
//about the flowchart that will be shared with Vue trough the plugin script
import { state } from "./store/flowcharteditor";

//MXGraph library
import { mxClient, mxGraph, mxUtils, mxEvent, mxConstraintHandler, mxConnectionHandler, mxEditor, mxGraphModel, mxKeyHandler, mxConstants, mxGraphView } from "./MxGraph";

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
        // Snaps to fixed points
        mxConstraintHandler.prototype.intersects = function (icon, point, source, existingEdge) {
            return (!source || existingEdge) || mxUtils.intersects(icon.bounds, point);
        };
        // Special case: Snaps source of new connections to fixed points
        var mxConnectionHandlerUpdateEdgeState = mxConnectionHandler.prototype.updateEdgeState;
        mxConnectionHandler.prototype.updateEdgeState = function (pt) {
            snapToFixedPoint(pt, this);
            mxConnectionHandlerUpdateEdgeState.apply(this, arguments);
        };

        mxConnectionHandler.prototype.createTarget = true;
        mxConnectionHandler.prototype.linePreview = true;

        // Creates the graph inside the given container
        let editor = new mxEditor();
        let model = new mxGraphModel();
        let graph = new mxGraph(graphContainer, model);
        let keyHandler = new mxKeyHandler(graph);

        vertexOnDraw(mxEvent, graph);

        editor.graph = graph;

        graph.setCellsEditable(true);
        graph.setPanning(true);
        graph.setCellsDisconnectable(false);
        graph.setHtmlLabels(true);
        graph.setConnectable(true);

        createSnapPoints(graph, model);

        // Enables rubberband selection
        createRubberband(graph);

        mxConstants.WORD_WRAP = 'break-word';

        editorFunctions.addCustomShapes(graph);

        createToolbar(toolbarContainer, editor, model, keyHandler, window);
        
        createFormatbar(editor, model);

        backgroundFunctions.init(graph);
        var mxGraphViewValidateBackground = mxGraphView.prototype.validateBackground;
        mxGraphView.prototype.validateBackground = function () {
            mxGraphViewValidateBackground.apply(this, arguments);
            backgroundFunctions.repaintGrid();
        };

        clipBoardFunctions(graph);

        StartFlowchart(graph);

        state.flowchart.registerListener(function(val){
            editorFunctions.importChart(graph, val.nodes, model);
        })

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