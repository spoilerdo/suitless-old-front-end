/**
 * Source code inspired by mxGraph's github examples: 
 * https://jgraph.github.io/mxgraph/javascript/examples/fixedpoints.html
 * @author Martijn Dormans
 * @version 1.0
 * @since 12-03-2019
 */

import { mxEdgeHandler, mxConnectionConstraint, mxCellState, mxPoint } from "../MxGraph";

/**
 * Creates the snap point on a vertex. 
 * These points can be used in order to draw a line from
 * @param {Element} graph
 */
export function createSnapPoints(graph, model){
    // Disables floating connections (only use with no connect image)
    if (graph.connectionHandler.connectImage == null)
    {
        graph.connectionHandler.isConnectableCell = (cell) =>
        {
            return false;
        };
        mxEdgeHandler.prototype.isConnectableCell = (cell) =>
        {
            return graph.connectionHandler.isConnectableCell(cell);
        };
    }
    
    graph.getAllConnectionConstraints = (terminal) =>
    {
        if (terminal != null && model.isVertex(terminal.cell))
        {
            return [new mxConnectionConstraint(new mxPoint(0, 0), true),
                new mxConnectionConstraint(new mxPoint(0.5, 0), true),
                new mxConnectionConstraint(new mxPoint(1, 0), true),
                new mxConnectionConstraint(new mxPoint(0, 0.5), true),
                new mxConnectionConstraint(new mxPoint(1, 0.5), true),
                new mxConnectionConstraint(new mxPoint(0, 1), true),
                new mxConnectionConstraint(new mxPoint(0.5, 1), true),
                new mxConnectionConstraint(new mxPoint(1, 1), true)];
        }

        return null;
    };
    
    // Connect preview
    graph.connectionHandler.createEdgeState = (me) =>
    {
        var edge = graph.createEdge(null, null, null, null, null, 'edgeStyle=orthogonalEdgeStyle');
        
        return new mxCellState(graph.view, edge, graph.getCellStyle(edge));
    };
}