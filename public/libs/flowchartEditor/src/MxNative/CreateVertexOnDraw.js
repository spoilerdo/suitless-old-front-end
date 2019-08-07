/**
 * Code inspired by mxGraph's github examples and source code
 * https://jgraph.github.io/mxgraph/javascript/examples/menustyle.html
 * https://github.com/jgraph/mxgraph/blob/master/javascript/src/js/handler/mxConnectionHandler.js
 * @author Martijn Dormans
 * @version 1.0
 * @since 15-03-2019
 */

import { NodeEnum } from "../NodeEnum";
import { editorFunctions } from "../EditorFunctions/EditorFunctions";
import { state } from "../store/flowcharteditor";

import { mxConnectionHandler, mxPoint } from "../MxGraph";

/**
 * When drawing a line this code will show a popup menu so you can chose which node you want to create
 * @param {MxEvent} mxEvent 
 * @param {MxGraph} graph 
 */
export function vertexOnDraw(mxEvent, graph) {
    mxEvent.disableContextMenu(document.body);

    //let edgeState = mxConnectionHandler.prototype.edgeState;

    let mouseThis;
    let mouseSource;
    let mouseTarget;
    let mouseMe;
    let currentPoint;
    let selectedvertexType;
    let vertexData;

    //Overide the mouseUp event from MXGraph in order to display a popup meny when you are drawing a new edge
    mxConnectionHandler.prototype.mouseUp = function (sender, me) {
        if (!me.isConsumed() && this.isConnecting()) {
            if (this.waypointsEnabled && !this.isStopEvent(me)) {
                this.addWaypointForEvent(me);
                me.consume();

                return;
            }

            var c1 = this.sourceConstraint;
            var c2 = this.constraintHandler.currentConstraint;

            var source = (this.previous != null) ? this.previous.cell : null;
            var target = null;

            if (this.constraintHandler.currentConstraint != null &&
                this.constraintHandler.currentFocus != null) {
                target = this.constraintHandler.currentFocus.cell;
            }

            if (target == null && this.currentState != null) {
                target = this.currentState.cell;
            }

            // Inserts the edge if no validation error exists and if constraints differ
            if (this.error == null && (source == null || target == null ||
                source != target || this.checkConstraints(c1, c2))) {
                mouseThis = this;
                mouseSource = source;
                mouseTarget = target;
                mouseMe = me;
                currentPoint = this.currentPoint;
                if (target == null) {
                    graph.popupMenuHandler.popup(currentPoint.x, currentPoint.y, null, null);
                } else {
                    mouseThis.connect(mouseSource, mouseTarget, mouseMe.getEvent(), mouseMe.getCell());
                }
            }
            else {
                // Selects the source terminal for self-references
                if (this.previous != null && this.marker.validState != null &&
                    this.previous.cell == this.marker.validState.cell) {
                    this.graph.selectCellForEvent(this.marker.source, me.getEvent());
                }

                // Displays the error message if it is not an empty string,
                // for empty error messages, the event is silently dropped
                if (this.error != null && this.error.length > 0) {
                    this.graph.validationAlert(this.error);
                }
            }

            // Redraws the connect icons and resets the handler state
            this.destroyIcons();
            me.consume();
        }

        if (this.first != null) {
            this.reset();
        }
    };

    //Override the createTargetVertex function from MXGraph in order to add the checkdepth function
    mxConnectionHandler.prototype.createTargetVertex = function (evt, source) {
        var geo = this.graph.getCellGeometry(source);

        while (geo != null && geo.relative) {
            source = this.graph.getModel().getParent(source);
            geo = this.graph.getCellGeometry(source);
        }

        let cell = editorFunctions.addVertex(selectedvertexType, this.graph, null, null, null);

        editorFunctions.updateDepth(cell, source);

        geo = this.graph.getModel().getGeometry(cell);

        if (geo != null) {
            var t = this.graph.view.translate;
            var s = this.graph.view.scale;
            var point = new mxPoint(currentPoint.x / s - t.x, currentPoint.y / s - t.y);
            geo.x = Math.round(point.x - geo.width / 2 - this.graph.panDx / s);
            geo.y = Math.round(point.y - geo.height / 2 - this.graph.panDy / s);

            // Aligns with source if within certain tolerance
            var tol = this.getAlignmentTolerance();

            if (tol > 0) {
                var sourceState = this.graph.view.getState(source);

                if (sourceState != null) {
                    var x = sourceState.x / s - t.x;
                    var y = sourceState.y / s - t.y;

                    if (Math.abs(x - geo.x) <= tol) {
                        geo.x = Math.round(x);
                    }

                    if (Math.abs(y - geo.y) <= tol) {
                        geo.y = Math.round(y);
                    }
                }
            }
        }
        editorFunctions.checkDepth(cell, source);

        return cell;
    };

    graph.connectionHandler.addListener(mxEvent.CONNECT, function (sender, evt) {
        var edge = evt.getProperty('cell');
        var style = graph.getCellStyle(edge); //style is in object form
        var newStyle = graph.stylesheet.getCellStyle("edgeStyle=orthogonalEdgeStyle;html=1;jettySize=auto;orthogonalLoop=1;", style);
        var array = [];
        for (var prop in newStyle)
            array.push(prop + "=" + newStyle[prop]);
        edge.style = array.join(';');
    });

    //Override the connect function from MXGraph in order to make the edge between the source and target trough the EditorFunctions' AddEdge function
    //This is needed so that you can add a lincType to it otherwise there wont be a format bar shown
    mxConnectionHandler.prototype.connect = function (source, target, evt, dropTarget) {
        if (target != null || this.isCreateTarget(evt) || this.graph.allowDanglingEdges) {
            // Uses the common parent of source and target or
            // the default parent to insert the edge
            var model = this.graph.getModel();
            var terminalInserted = false;
            var edge = null;

            model.beginUpdate();
            try {
                if (source != null && target == null && !this.graph.isIgnoreTerminalEvent(evt) && this.isCreateTarget(evt)) {
                    target = this.createTargetVertex(evt, source);

                    if (target != null) {
                        dropTarget = this.graph.getDropTarget([target], evt, dropTarget);
                        terminalInserted = true;

                        // Disables edges as drop targets if the target cell was created
                        if (dropTarget == null || !this.graph.getModel().isEdge(dropTarget)) {
                            var pstate = this.graph.getView().getState(dropTarget);

                            if (pstate != null) {
                                var tmp = model.getGeometry(target);
                                tmp.x -= pstate.origin.x;
                                tmp.y -= pstate.origin.y;
                            }
                        }
                        else {
                            dropTarget = this.graph.getDefaultParent();
                        }

                        this.graph.addCell(target, dropTarget);
                    }
                }

                var parent = this.graph.getDefaultParent();

                if (source != null && target != null &&
                    model.getParent(source) == model.getParent(target) &&
                    model.getParent(model.getParent(source)) != model.getRoot()) {
                    parent = model.getParent(source);

                    if ((source.geometry != null && source.geometry.relative) &&
                        (target.geometry != null && target.geometry.relative)) {
                        parent = model.getParent(parent);
                    }
                }

                // Uses the value of the preview edge state for inserting
                // the new edge into the graph
                var value = null;
                var style = null;

                let edgeState = mxConnectionHandler.prototype.edgeState;
                if (edgeState != null) {
                    value = edgeState.cell.value;
                    style = edgeState.cell.style;
                }

                edge = editorFunctions.addEdge(graph, { fromCell: source, targetCell: target, value: null });

                if (edge != null) {
                    // Updates the connection constraints
                    this.graph.setConnectionConstraint(edge, source, true, state.constraint);
                    this.graph.setConnectionConstraint(edge, target, false, this.constraintHandler.currentConstraint);

                    // Uses geometry of the preview edge state
                    if (edgeState != null) {
                        model.setGeometry(edge, edgeState.cell.geometry);
                    }

                    var parent = model.getParent(source);

                    // Inserts edge before source
                    if (this.isInsertBefore(edge, source, target, evt, dropTarget)) {
                        var index = null;
                        var tmp = source;

                        while (tmp.parent != null && tmp.geometry != null &&
                            tmp.geometry.relative && tmp.parent != edge.parent) {
                            tmp = this.graph.model.getParent(tmp);
                        }

                        if (tmp != null && tmp.parent != null && tmp.parent == edge.parent) {
                            model.add(parent, edge, tmp.parent.getIndex(tmp));
                        }
                    }

                    // Makes sure the edge has a non-null, relative geometry
                    var geo = model.getGeometry(edge);

                    if (geo == null) {
                        geo = new mxGeometry();
                        geo.relative = true;

                        model.setGeometry(edge, geo);
                    }

                    // Uses scaled waypoints in geometry
                    if (this.waypoints != null && this.waypoints.length > 0) {
                        var s = this.graph.view.scale;
                        var tr = this.graph.view.translate;
                        geo.points = [];

                        for (var i = 0; i < this.waypoints.length; i++) {
                            var pt = this.waypoints[i];
                            geo.points.push(new mxPoint(pt.x / s - tr.x, pt.y / s - tr.y));
                        }
                    }

                    if (target == null) {
                        var t = this.graph.view.translate;
                        var s = this.graph.view.scale;
                        var pt = (this.originalPoint != null) ?
                            new mxPoint(this.originalPoint.x / s - t.x, this.originalPoint.y / s - t.y) :
                            new mxPoint(this.currentPoint.x / s - t.x, this.currentPoint.y / s - t.y);
                        pt.x -= this.graph.panDx / this.graph.view.scale;
                        pt.y -= this.graph.panDy / this.graph.view.scale;
                        geo.setTerminalPoint(pt, false);
                    }

                    this.fireEvent(new mxEventObject(mxEvent.CONNECT, 'cell', edge, 'terminal', target,
                        'event', evt, 'target', dropTarget, 'terminalInserted', terminalInserted));
                }
            }
            catch (e) {

            }
            finally {
                model.endUpdate();
            }

            if (this.select) {
                this.selectCells(edge, (terminalInserted) ? target : null);
            }
        }
    };

    graph.popupMenuHandler.factoryMethod = function (menu, cell, evt) {
        if (evt != null) { return; }

        menu.addItem('Question Node', null, function () {
            if (mouseThis != null && currentPoint != null) {
                selectedvertexType = NodeEnum.Question;
                mouseThis.connect(mouseSource, mouseTarget, mouseMe.getEvent());
            }
        });

        menu.addItem('Module Node', null, function () {
            if (mouseThis != null && currentPoint != null) {
                selectedvertexType = NodeEnum.Module;
                mouseThis.connect(mouseSource, mouseTarget, mouseMe.getEvent());
            }
        });

        menu.addItem('Notification Node', null, function () {
            if (mouseThis != null && currentPoint != null) {
                selectedvertexType = NodeEnum.Notification;
                mouseThis.connect(mouseSource, mouseTarget, mouseMe.getEvent());
            }
        });

        menu.addItem('Multiple Choice Node', null, function () {
            if (mouseThis != null && currentPoint != null) {
                selectedvertexType = NodeEnum.MultipleChoice;
                mouseThis.connect(mouseSource, mouseTarget, mouseMe.getEvent());
            }
        });

        menu.addItem('End Node', null, function () {
            if (mouseThis != null && currentPoint != null) {
                selectedvertexType = NodeEnum.End;
                mouseThis.connect(mouseSource, mouseTarget, mouseMe.getEvent());
            }
        });
    };
}