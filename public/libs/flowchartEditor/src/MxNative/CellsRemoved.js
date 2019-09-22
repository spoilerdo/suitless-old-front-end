/**
 * Code inspired by mxGraph's source code
 * https://github.com/jgraph/mxgraph/blob/master/javascript/src/js/view/mxGraph.js
 * Will call removeDepth to update the depth whenever cells are removed
 * @author Martijn Dormans
 * @version 1.0
 * @since 22-09-2019
 */

import { mxDictionary, mxUtils, mxPoint, mxEventObject, mxEvent } from "../MxGraph";
import { editorFunctions } from "../EditorFunctions/EditorFunctions";

export function cellsRemovedFunctions(graph) {
    graph.cellsRemoved = function (cells) {
        if (cells != null && cells.length > 0) {
            //Checks the depth and remove 1 or more points from the maxDepth and amountOfSubQuestions
            let vertices = cells.filter(cell => cell.edge !== true);
            vertices.forEach(function(cell) {
                editorFunctions.removeDepth(cell);
            });

            var scale = this.view.scale;
            var tr = this.view.translate;

            this.model.beginUpdate();
            try {
                // Creates hashtable for faster lookup
                var dict = new mxDictionary();

                for (var i = 0; i < cells.length; i++) {
                    dict.put(cells[i], true);
                }

                for (var i = 0; i < cells.length; i++) {
                    // Disconnects edges which are not being removed
                    var edges = this.getAllEdges([cells[i]]);

                    var disconnectTerminal = mxUtils.bind(this, function (edge, source) {
                        var geo = this.model.getGeometry(edge);

                        if (geo != null) {
                            // Checks if terminal is being removed
                            var terminal = this.model.getTerminal(edge, source);
                            var connected = false;
                            var tmp = terminal;

                            while (tmp != null) {
                                if (cells[i] == tmp) {
                                    connected = true;
                                    break;
                                }

                                tmp = this.model.getParent(tmp);
                            }

                            if (connected) {
                                geo = geo.clone();
                                var state = this.view.getState(edge);

                                if (state != null && state.absolutePoints != null) {
                                    var pts = state.absolutePoints;
                                    var n = (source) ? 0 : pts.length - 1;

                                    geo.setTerminalPoint(new mxPoint(
                                        pts[n].x / scale - tr.x - state.origin.x,
                                        pts[n].y / scale - tr.y - state.origin.y), source);
                                }
                                else {
                                    // Fallback to center of terminal if routing
                                    // points are not available to add new point
                                    // KNOWN: Should recurse to find parent offset
                                    // of edge for nested groups but invisible edges
                                    // should be removed in removeCells step
                                    var tstate = this.view.getState(terminal);

                                    if (tstate != null) {
                                        geo.setTerminalPoint(new mxPoint(
                                            tstate.getCenterX() / scale - tr.x,
                                            tstate.getCenterY() / scale - tr.y), source);
                                    }
                                }

                                this.model.setGeometry(edge, geo);
                                this.model.setTerminal(edge, null, source);
                            }
                        }
                    });

                    for (var j = 0; j < edges.length; j++) {
                        if (!dict.get(edges[j])) {
                            dict.put(edges[j], true);
                            disconnectTerminal(edges[j], true);
                            disconnectTerminal(edges[j], false);
                        }
                    }

                    this.model.remove(cells[i]);
                }

                this.fireEvent(new mxEventObject(mxEvent.CELLS_REMOVED, 'cells', cells));
            }
            finally {
                this.model.endUpdate();
            }
        }
    };
}