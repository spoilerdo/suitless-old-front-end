var mxgraph = require("mxgraph")({
    mxImageBasePath: "./libs/flowchartEditor/images",
    mxBasePath: "./libs/flowchartEditor/src"
})

export const {
    mxClient, mxGraph, mxUtils, mxEvent, mxConstraintHandler, mxConnectionHandler, mxUndoManager, mxEditor, mxGraphModel, mxKeyHandler, mxConstants, mxGraphView, mxEllipse, mxHexagon, mxRectangle, mxCellRenderer, mxPoint, mxRubberband, mxClipboard, mxToolbar, mxEdgeHandler, mxConnectionConstraint, mxCellState, mxCodec
} = mxgraph;