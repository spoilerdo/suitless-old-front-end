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

import { mxConnectionHandler, mxPoint } from "../MxGraph";

/**
 * When drawing a line this code will show a popup menu so you can chose which node you want to create
 * @param {MxEvent} mxEvent 
 * @param {MxGraph} graph 
 */
export function vertexOnDraw(mxEvent, graph) {
    mxEvent.disableContextMenu(document.body);

    let mouseThis;
    let mouseSource;
    let mouseTarget;
    let mouseMe;
    let currentPoint;
    let selectedvertexType;
    let vertexData;

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
                if(target == null){
                    graph.popupMenuHandler.popup(currentPoint.x, currentPoint.y, null, null);
                }else{
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
    }

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
    }

    graph.connectionHandler.addListener(mxEvent.CONNECT, function (sender, evt){
        var edge = evt.getProperty('cell');
        var style = graph.getCellStyle(edge); //style is in object form
        var newStyle = graph.stylesheet.getCellStyle("edgeStyle=orthogonalEdgeStyle;html=1;jettySize=auto;orthogonalLoop=1;", style);
        var array = [];
           for (var prop in newStyle)
               array.push(prop + "=" + newStyle[prop]);
           edge.style = array.join(';'); 
   }),

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

        menu.addItem('Notification Node', null, function(){
            if(mouseThis != null && currentPoint != null) {
                selectedvertexType = NodeEnum.Notification;
                mouseThis.connect(mouseSource, mouseTarget, mouseMe.getEvent());
            }
        });

        menu.addItem('Multiple Choice Node', null, function(){
            if(mouseThis != null && currentPoint != null) {
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