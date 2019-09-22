/**
 * Code inspired by MxGraph's github examples and source code
 * MxconnectionHandler factory for some custom functionality
 * https://github.com/jgraph/mxgraph/blob/master/javascript/examples/grapheditor/www/js/Graph.js
 * @author Martijn Dormans
 * @version 1.0
 * @since 09-07-2019
 */
import { state } from "../store/flowcharteditorEndpoint";
import { mxConnectionHandler, mxUtils, mxConstraintHandler, mxCellState } from "../MxGraph";

export function connectionHandlerFunctions(graph) {
    // Overrides edge preview to use current edge shape and default style
    mxConnectionHandler.prototype.livePreview = true;
    mxConnectionHandler.prototype.cursor = 'crosshair';

    var connectionHandlerCreateShape = mxConnectionHandler.prototype.createShape;
    mxConnectionHandler.prototype.createShape = function () {
        var shape = connectionHandlerCreateShape.apply(this, arguments);

        shape.isDashed = '0';
        shape.myEdgeStyle = 'orthogonalEdgeStyle'

        return shape;
    }

    // Overrides live preview to keep current style
    mxConnectionHandler.prototype.updatePreview = function () {
        // do not change color of preview
    };

    // Snaps to fixed points
    mxConstraintHandler.prototype.intersects = function (icon, point, source, existingEdge) {
        return (!source || existingEdge) || mxUtils.intersects(icon.bounds, point);
    };


    // Connect preview
    graph.connectionHandler.createEdgeState = function () {
        var edge = graph.createEdge(null, null, null, null, null, 'edgeStyle=orthogonalEdgeStyle');

        return new mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge));
    };
    let test = graph.connectionHandler.createEdgeState();
    mxConnectionHandler.prototype.edgeState = test;

    // Special case: Snaps source of new connections to fixed points
    var mxConnectionHandlerUpdateEdgeState = mxConnectionHandler.prototype.updateEdgeState;
    mxConnectionHandler.prototype.updateEdgeState = function (pt) {
        if (pt != null && this.previous != null) {
            var constraints = this.graph.getAllConnectionConstraints(this.previous);
            var nearestConstraint = null;
            var dist = null;

            for (var i = 0; i < constraints.length; i++) {
                var cp = this.graph.getConnectionPoint(this.previous, constraints[i]);

                if (cp != null) {
                    var tmp = (cp.x - pt.x) * (cp.x - pt.x) + (cp.y - pt.y) * (cp.y - pt.y);

                    if (dist == null || tmp < dist) {
                        nearestConstraint = constraints[i];
                        dist = tmp;
                    }
                }
            }

            if (nearestConstraint != null) {
                this.sourceConstraint = nearestConstraint;
                state.constraint = nearestConstraint;
            }

            // In case the edge style must be changed during the preview:
            // this.edgeState.style['edgeStyle'] = 'orthogonalEdgeStyle';
            // And to use the new edge style in the new edge inserted into the graph,
            // update the cell style as follows:
            //this.edgeState.cell.style = mxUtils.setStyle(this.edgeState.cell.style, 'edgeStyle', this.edgeState.style['edgeStyle']);
        }

        mxConnectionHandlerUpdateEdgeState.apply(this, arguments);
    };

    mxConnectionHandler.prototype.createTarget = true;
    mxConnectionHandler.prototype.linePreview = true;
}