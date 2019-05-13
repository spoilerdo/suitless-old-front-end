/**
 * Contains common editor functions.
 * @author Julius Ammerlaan, Marco Driessen, Martijn Dormans
 * @version 3.0
 * @since 18-02-2019
 */
import { NodeEnum } from "./NodeEnum";
import { GraphCoder } from "./GraphCoder";

import { mxGraph, mxGraphModel, mxConstants, mxEllipse, mxHexagon, mxRectangle, mxCellRenderer, mxUtils } from "./MxGraph";

/**
 * This is the max depth of a flowchart AKA what is the longest path of a flowchart.
 * This only counts the amount of questions
 */
let maxDepth = 0;

/**
 * Contains common graph functions such as adding or connecting nodes.
 */
export let graphFunctions = {
    /**
     * adds a vertex to the editor.
     * @param {NodeEnum} nodeEnum 
     * @param {MxGraph} graph
     * @param {object} json
     */
    addVertex(nodeEnum, graph, json, x, y) {
        let parent = graph.getDefaultParent();
        //Enabled the graph to be updated.
        graph.getModel().beginUpdate();
        try {
            //Check Node type and add the correct node.
            switch (nodeEnum) {
                case NodeEnum.Start:
                    return addStart(graph, parent, json, x, y);
                case NodeEnum.Question:
                    return addQuestion(graph, parent, json, x, y);
                case NodeEnum.Module:
                    return addModule(graph, parent, json, x, y);
                case NodeEnum.End:
                    return addEnd(graph, parent, json, x, y);
                case NodeEnum.Notification:
                    return addNotification(graph, parent, json, x, y);
                case NodeEnum.Note:
                    return addNote(graph, parent, json, x, y);
            }
        }
        finally {
            // Updates the display
            graph.getModel().endUpdate();
        }
    },

    /**
     * adds an unconnected edge to the graph.
     * @param {mxGraph} graph
     * @param {object} flow
     */
    addEdge(graph, flow) {
        let parent = graph.getDefaultParent();
        //Enabled the graph to be updated.
        graph.getModel().beginUpdate();
        try {
            let selectedCells;
            let value = '';
            if (flow !== null) {
                selectedCells = [flow.fromCell, flow.targetCell];
                value = flow.value;
            } else {
                selectedCells = graph.getSelectionCells();
            }
            let firstCell = selectedCells[0];
            let secondCell = selectedCells[1];

            graph.insertEdge(parent, null, value, firstCell, secondCell, "edgeStyle=orthogonalEdgeStyle;html=1;jettySize=auto;orthogonalLoop=1;");
            this.updateDepth(secondCell, firstCell);
            this.checkDepth(secondCell, null);
        }
        finally {
            // Updates the display
            graph.getModel().endUpdate();
        }
    },

    /**
     * registers ehvLINC dedicated shapes to the mxGraph.
     * @param {mxGraph} graph 
     */
    addCustomShapes(graph) {
        //Ellipse that represents the start node
        function ellipse() { };
        ellipse.prototype = new mxEllipse();
        ellipse.prototype.constructor = ellipse;

        registerCustomShape(graph, ellipse, NodeEnum.Start);

        //Dotted ellipse that represents a module you can refer to
        function dottedEllipse() { };
        dottedEllipse.prototype = new mxEllipse();
        dottedEllipse.prototype.constructor = dottedEllipse;
        dottedEllipse.prototype.isDashed = true;

        registerCustomShape(graph, dottedEllipse, NodeEnum.Module);

        //Dotted hexagon that represents a notification you can refer to
        function hexagon() { };
        hexagon.prototype = new mxHexagon();
        hexagon.prototype.constructor = hexagon;

        registerCustomShape(graph, hexagon, NodeEnum.Notification);
    },

    /**
    * Export chart to a json string.
    * @param {mxGraph} graph
    */
    exportChart(graph, name, description) {
        return GraphCoder.encodeGraphToJSON(graph, name, description, maxDepth);
    },

    /**
    * Import chart from a json string.
    * @param {JSON} json
    * @param {mxGraph} graph
    * @param {mxGraphModel} model
    */
    importChart(graph, json, model) {
        let cells = [];
        json.forEach(n => {
            this.addVertex(parseInt(n.style), graph, n);
            let cellflows = n.flows;
            let cell = {
                cellflows,
                id: n.id,
            }
            cells = cells.concat(cell);
        })

        cells.forEach(c => {
            let fromCell = model.getCell(c.id);
            //console.log(c);
            c.cellflows.forEach(f => {
                let targetCell = model.getCell(f.targetID);
                let flow = {
                    fromCell,
                    targetCell,
                    value: f.value
                }
                this.addEdge(graph, flow);
            })
        })
    },

    /**
    * changes the active graph style.
    * @param {mxGraph} graph 
    * @param {string} name
    */
    setCustomShape(graph, name) {
        var style = graph.getStylesheet().getDefaultVertexStyle();
        style[mxConstants.STYLE_SHAPE] = name;

        return style
    },

    /**
    * Update the depth of a qualifite node
    */
    updateDepth(cell, source) {
        //get the previouse cell's depth and set the next cells depth + 1
        if (cell.lincType === NodeEnum.Question) {
            cell.depth = source.depth + 1;
        } else if (cell.lincType === NodeEnum.Notification) {
            cell.depth = source.depth;
        }
    },

    /**
     * This function will check the depth of the newly connected node to the flowchart.
     * So this functions fires when a new edge is connected to a node.
     * It checks if the depth of the new node is bigger than the maxDepth of the flowchart.
     * If so than the maxDepth = the depth of the node
     * !!Only works with question nodes and notifications!!
     */
    checkDepth(cell, source) {
        let parent = source;
        if (parent == null) {
            parent = cell.edges[0].source;
        }
        if (parent.lincType === NodeEnum.Question || parent.lincType === NodeEnum.Notification) {
            //the connected edge is a question so get the depth from it
            //if it is a notification node than the depth of it is equal to the priour connected question node
            if (parent.depth > maxDepth) {
                maxDepth = parent.depth;
            }
        }
    }
}

/**
 * Inserts vertex with Question parameters and json if given
 * @param {mxGraph} graph 
 * @param {DefaultParent} parent 
 * @param {object} json
 * @param {String} x
 * @param {String} y
 */
function addQuestion(graph, parent, json, x, y) {
    graphFunctions.setCustomShape(graph, NodeEnum.Question);

    let data = [{
        "key": "reason",
        "value": "Reason for the question"
    }]
    return genericAddVertex(graph, parent, json, NodeEnum.Question, data, 80, x, y, 'shape='+NodeEnum.Question);
}

/**
 * Inserts vertex with Start parameters and json if given
 * @param {mxGraph} graph 
 * @param {DefaultParent} parent 
 * @param {object} json
 * @param {String} x
 * @param {String} y
 */
function addStart(graph, parent, json, x, y) {
    graphFunctions.setCustomShape(graph, NodeEnum.Start);

    return genericAddVertex(graph, parent, json, NodeEnum.Start, null, 80, x, y, 'shape='+NodeEnum.Start+';perimeter=ellipsePerimeter;');
}

/**
 * Inserts vertex with Module parameters and json if given
 * @param {mxGraph} graph
 * @param {DefaultParent} parent
 * @param {object} json
 * @param {String} x
 * @param {String} y
 */
function addModule(graph, parent, json, x, y) {
    graphFunctions.setCustomShape(graph, NodeEnum.Module);

    let data = [{
        "key": "module",
        "value": "Module name"
    }]
    return genericAddVertex(graph, parent, json, NodeEnum.Module, data, 80, x, y, 'shape='+NodeEnum.Module+';perimeter=ellipsePerimeter;');
}

/**
 * Inserts End vertex and json if given
 * @param {mxGraph} graph 
 * @param {DefaultParent} parent 
 * @param {object} json
 * @param {String} x
 * @param {String} y
 */
function addEnd(graph, parent, json, x, y) {
    graphFunctions.setCustomShape(graph, NodeEnum.Start);

    return genericAddVertex(graph, parent, json, NodeEnum.End, null, 80, x, y, 'shape='+NodeEnum.Start+';perimeter=ellipsePerimeter;');
}

/**
 * Inserts vertex with Notification parameters and json if given
 * @param {mxGraph} graph
 * @param {DefaultParent} parent
 * @param {object} json
 * @param {String} x
 * @param {String} y
 */
function addNotification(graph, parent, json, x, y) {
    graphFunctions.setCustomShape(graph, NodeEnum.Notification);

    let data = [{
        "key": "notify",
        "value": "this is a notification"
    }]
    return genericAddVertex(graph, parent, json, NodeEnum.Notification, data, 80, x, y, 'shape='+NodeEnum.Notification+';perimeter=ellipsePerimeter;');
}

/**
 * Inserts vertex with Note parameters and json if given
 * @param {mxGraph} graph
 * @param {DefaultParent} parent
 * @param {object} json
 * @param {String} x
 * @param {String} y
 */
function addNote(graph, parent, json, x, y) {
    graphFunctions.setCustomShape(graph, NodeEnum.Question);
    let style = graph.getStylesheet().getDefaultVertexStyle();
    style[mxConstants.STYLE_FILLCOLOR] = '#fcea76';

    return genericAddVertex(graph, parent, json, NodeEnum.Note, null, 80, x, y);
}

var posX = 20, posY = 20;

/**
 * Generic insert vertex method with vertex type, data parameters and json if given
 * @param {mxGraph} graph 
 * @param {DefaultParent} parent 
 * @param {object} json 
 * @param {NodeEnum} nodeEnum 
 */
function genericAddVertex(graph, parent, json, nodeEnum, data, defaultSize, x, y, style) {
    let vertex;
    if (json != null) {
        vertex = graph.createVertex(parent, json.id, json.value, json.posX, json.posY, json.width, json.height, style);
        data = json.lincData;
    } else if (x == null || y == null) {
        vertex = graph.createVertex(parent, null, NodeEnum[nodeEnum], posX, posY,
            defaultSize, defaultSize, style);
        posY += 20;
    } else {
        vertex = graph.createVertex(parent, null, NodeEnum[nodeEnum], x, y,
            defaultSize, defaultSize, style);
    }

    vertex.lincType = nodeEnum;
    if (data != null) {
        vertex.lincData = data;
    }

    //Add depth to a question or notification node
    if (nodeEnum === NodeEnum.Question || nodeEnum === NodeEnum.Notification || nodeEnum === NodeEnum.Start) {
        vertex.depth = 0;
    }

    graph.addCell(vertex, parent);
    return vertex;
}

/**
 * registers an mxShape to the mxCellRenderer and allows it to be
 * used in the style by using its name.
 * @param {mxGraph} graph 
 * @param {mxShape} shape 
 * @param {string} name 
 */
function registerCustomShape(graph, shape, name) {
    mxCellRenderer.registerShape(name, shape);

    let style = graph.getStylesheet().getDefaultVertexStyle();
    style[mxConstants.STYLE_SHAPE] = name;
    style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
    style[mxConstants.STYLE_STROKECOLOR] = '#000000';
    style[mxConstants.STYLE_FONTCOLOR] = '#000000';
    style[mxConstants.STYLE_FONTSIZE] = '16';

    style = graph.getStylesheet().getDefaultEdgeStyle();
    style[mxConstants.STYLE_STROKECOLOR] = '#000000';
    style[mxConstants.STYLE_FONTCOLOR] = '#000000';
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#ffffff';
    style['fontStyle'] = '0';
    style['fontStyle'] = '0';
    style[mxConstants.STYLE_FONTSIZE] = '16';
    style['startSize'] = '8';
    style['endSize'] = '8';
}