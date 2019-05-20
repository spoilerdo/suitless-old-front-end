/**
 * Contains common editor functions.
 * @author Julius Ammerlaan, Marco Driessen, Martijn Dormans
 * @version 3.0
 * @since 18-02-2019
 */
import { NodeEnum } from "../NodeEnum";
import { GraphCoder } from "../GraphCoder";
import { addQuestion, addStart, addModule, addEnd, addNotification, addNote, registerCustomShape, addMultipleChoice } from "./PrivateFunctions";

import { mxGraph, mxGraphModel, mxConstants, mxEllipse, mxHexagon, mxSwimlane } from "../MxGraph";

/**
 * This is the max depth of a flowchart AKA what is the longest path of a flowchart.
 * This only counts the amount of questions
 */
let maxDepth = 0;

/**
 * Contains common graph functions such as adding or connecting nodes.
 */
export let editorFunctions = {
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
                case NodeEnum.MultipleChoice:
                    return addMultipleChoice(graph, parent, json, x, y);
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

            let edge = graph.createEdge(parent, null, value, firstCell, secondCell, "edgeStyle=orthogonalEdgeStyle;html=1;jettySize=auto;orthogonalLoop=1;");

            edge.lincType = NodeEnum.Edge;

            let data = [
                {
                    "key": "implication",
                    "value": "Implication of the answer"
                },
                {
                    "key": "implicationLevel",
                    "value": "Info"
                }
            ]

            edge.lincData = data;

            graph.addEdge(edge, parent, firstCell, secondCell);

            //graph.insertEdge(parent, null, value, firstCell, secondCell, "edgeStyle=orthogonalEdgeStyle;html=1;jettySize=auto;orthogonalLoop=1;");
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

        //Swimlane that represents a multiple choice node you can refer to
        function swimLane() { };
        swimLane.prototype = new mxSwimlane();
        swimLane.prototype.constructor = swimLane;
        swimLane.prototype.editable = 0;
        swimLane.prototype.resizable = false;


        registerCustomShape(graph, swimLane, NodeEnum.MultipleChoice);
    },

    /**
    * Export chart to a json string.
    * @param {mxGraph} graph
    */
    exportChart(graph, name, description) {
        GraphCoder.encodeGraphToJSON(graph, name, description, maxDepth);
    },

    /**
    * Import chart from a json string.
    * @param {JSON} json
    * @param {mxGraph} graph
    * @param {mxGraphModel} model
    */
    importChart(graph, json, model) {
        //delete existing graph
        graph.removeCells(graph.getChildVertices(graph.getDefaultParent()))

        let cells = [];
        json.forEach(n => {
            if(n.style != NodeEnum.Choice){
                if(n.style == NodeEnum.MultipleChoice){
                    //The multiplechoice needs some childs
                    let data = n.lincData.filter(c => c.key !== "question")

                    let childs = [];
                    data.forEach(child => {
                        //get child from json array and ad it to the parent
                        childs = childs.concat(json.find(c => c.id == child.value));
                    });
                    n.children = childs;
                }

                this.addVertex(parseInt(n.style), graph, n);
            }
            let cellflows = n.flows;
            let cell = {
                cellflows,
                id: n.id,
            }

            cells = cells.concat(cell);
        })

        cells.forEach(c => {
            let fromCell = model.getCell(c.id);
            
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
        style['movable'] = '1';
        style['resizable'] = '1';

        return style
    },

    /**
    * Update the depth of a qualifite node
    */
    updateDepth(cell, source) {
        //get the previouse cell's depth and set the next cells depth + 1
        if (cell.lincType === NodeEnum.Question || cell.lincType === NodeEnum.MultipleChoice || cell.lincType === NodeEnum.Choice) {
            cell.depth = source.depth + 1;
            if(cell.children != null){
                cell.children.forEach(child => {
                    child.depth = cell.depth;
                });
            }
        } else if (cell.lincType === NodeEnum.Notification) {
            cell.depth = source.depth;
        }
    },

    /**
     * This function will check the depth of the newly connected node to the flowchart.
     * So this functions fires when a new edge is connected to a node.
     * It checks if the depth of the new node is bigger than the maxDepth of the flowchart.
     * If so than the maxDepth = the depth of the node
     */
    checkDepth(cell, source) {
        if (cell.lincType === NodeEnum.Question || cell.lincType === NodeEnum.Notification || cell.lincType === NodeEnum.MultipleChoice || cell.lincType === NodeEnum.Choice) {
            //the connected edge is a question so get the depth from it
            //if it is a notification node than the depth of it is equal to the priour connected question node
            if (cell.depth > maxDepth) {
                maxDepth = cell.depth;
            }
        }
    }
}

