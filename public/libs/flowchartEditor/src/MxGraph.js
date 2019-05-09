/**
 * MXGraph library
 */

var mxgraph = require("mxgraph")({
    mxImageBasePath: "./libs/flowchartEditor/images",
    mxBasePath: "./libs/flowchartEditor/src"
})

export const {
    mxClient, mxGraph, mxUtils, mxEvent, mxConstraintHandler, mxConnectionHandler, mxEditor, mxGraphModel, mxKeyHandler, mxConstants, mxGraphView, mxEllipse, mxHexagon, mxSwimlane, mxRectangle, mxCellRenderer, mxPoint, mxRubberband, mxClipboard, mxToolbar, mxEdgeHandler, mxConnectionConstraint, mxCellState, mxCodec
} = mxgraph;