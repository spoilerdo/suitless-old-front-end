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

import { mxClient, mxGraph, mxUtils, mxEvent, mxConstraintHandler, mxConnectionHandler, mxEditor, mxGraphModel, mxKeyHandler, mxUndoManager, mxConstants, mxGraphView } from "./MxGraph";

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

        //WHEN CELLS GET SELECTED OR DESELECTED ADJUST THE BOUNDARIES OF THE CELLS TO THE TEXT
        graph.getSelectionModel().addListener(mxEvent.CHANGE, (sender, evt) => {
            //GET SELECTED AND DESELECTED CELLS
            let removedCells = evt.getProperty('removed')
            let addedCells = evt.getProperty('added')

            let cells = []
            if (addedCells != undefined) {
                addedCells.forEach(c => {
                    cells.push(c)
                })
            }
            if (removedCells != undefined) {
                removedCells.forEach(c => {
                    cells.push(c)
                })
            }

            //LOOP THROUGH EACH CELL AND GET THEIR PREFERRED BOUNDARIES
            cells.forEach(c => {
                let newRect = {}
                let rect = c.geometry
                let preffered = graph.getPreferredSizeForCell(c)

                newRect.x = rect.x
                newRect.y = rect.y

                //IF THEY ARE UNDER A MINIMUM OF 80 BY 80 RESIZE THEM BIGGER 
                newRect.width = (preffered.width + 10 < 80) ? 80 : preffered.width + 10
                newRect.height = (preffered.height + 25 < 80) ? 80 : preffered.height + 25

                graph.resizeCell(c, newRect)
            })
        });

        createSnapPoints(graph, model);

        // Enables rubberband selection
        createRubberband(graph);

        mxConstants.WORD_WRAP = 'break-word';

        graphFunctions.addCustomShapes(graph);
        createToolbar(toolbarContainer, editor, model, keyHandler, window, undoManager);
        createFormatbar(formatbarContainer, editor, model);
        backgroundFunctions.init(graph);
        var mxGraphViewValidateBackground = mxGraphView.prototype.validateBackground;
        mxGraphView.prototype.validateBackground = function () {
            mxGraphViewValidateBackground.apply(this, arguments);
            backgroundFunctions.repaintGrid();
        };

        clipBoardFunctions(graph);

        StartFlowchart(graph);

        state.flowchart.registerListener(function (val) {
            graphFunctions.importChart(graph, val.nodes, model);
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