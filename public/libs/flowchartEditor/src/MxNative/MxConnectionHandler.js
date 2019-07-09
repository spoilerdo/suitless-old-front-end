/**
 * Code inspired by MxGraph's github examples and source code
 * MxconnectionHandler factory for some custom functionality
 * https://github.com/jgraph/mxgraph/blob/master/javascript/examples/grapheditor/www/js/Graph.js
 * @author Martijn Dormans
 * @version 1.0
 * @since 09-07-2019
 */
import { snapToFixedPoint } from "./Snapping";
import { mxConnectionHandler, mxUtils, mxConstraintHandler } from "../MxGraph";

export function connectionHandlerFunctions() {
    // Overrides edge preview to use current edge shape and default style
    mxConnectionHandler.prototype.livePreview = true;
    mxConnectionHandler.prototype.cursor = 'crosshair';

    var connectionHandlerCreateShape = mxConnectionHandler.prototype.createShape;
    mxConnectionHandler.prototype.createShape = function () {
        var shape = connectionHandlerCreateShape.apply(this, arguments);

        shape.isDashed = '0';
        //edgeStyle=orthogonalEdgeStyle;html=1;jettySize=auto;orthogonalLoop=1;
        shape.myEdgeStyle = 'orthogonalEdgeStyle'

        return shape;
    }

    // Overrides live preview to keep current style
    mxConnectionHandler.prototype.updatePreview = function (valid) {
        // do not change color of preview
    };

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
}