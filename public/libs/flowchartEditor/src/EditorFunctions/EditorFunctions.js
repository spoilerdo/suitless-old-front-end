/**
 * Contains common editor functions.
 * @author Julius Ammerlaan, Marco Driessen, Martijn Dormans
 * @version 3.0
 * @since 18-02-2019
 */
import { NodeEnum } from "../NodeEnum";
import { ShapeEnum } from "./ShapeEnum";
import { GraphCoder } from "../GraphCoder";
import { state } from "../store/flowcharteditor";
import { addQuestion, addStart, addModule, addEnd, addNotification, addNote, registerCustomShape, addMultipleChoice } from "./PrivateFunctions";

import { mxConstants, mxEllipse, mxHexagon, mxSwimlane, mxRectangle, mxEvent } from "../MxGraph";

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
     * @param {object} lincData
     */
    addEdge(graph, flow, lincData) {
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
                    "key": "answer",
                    "value": ""
                },
                {
                    "key": "imageName",
                    "value": "DefaultEdgeImage"
                }
            ]

            if (lincData) {
                data = lincData;
            }

            //Certain edges are not allowed to be added
            if (firstCell.lincType != NodeEnum.Start && firstCell.lincType != NodeEnum.Notification && firstCell.lincType != NodeEnum.MultipleChoice && firstCell.lincType != NodeEnum.Choice) {
                edge.lincData = data;
            }

            graph.addEdge(edge, parent, firstCell, secondCell);

            this.updateDepth(secondCell, firstCell);
            this.checkDepth(secondCell, null);

            return edge;
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
        //Ellipse that represents a start or end node
        function ellipse() { }
        ellipse.prototype = new mxEllipse();
        ellipse.prototype.constructor = ellipse;

        registerCustomShape(graph, ellipse, ShapeEnum.Ellipse);

        //Dotted ellipse that represents special node with a special functions
        function dottedEllipse() { }
        dottedEllipse.prototype = new mxEllipse();
        dottedEllipse.prototype.constructor = dottedEllipse;
        dottedEllipse.prototype.isDashed = true;

        registerCustomShape(graph, dottedEllipse, ShapeEnum.DottedEllipse);

        //Dotted hexagon that represents a special node with a special functions
        function hexagon() { }
        hexagon.prototype = new mxHexagon();
        hexagon.prototype.constructor = hexagon;

        registerCustomShape(graph, hexagon, ShapeEnum.Hexagon);

        //Swimlane that represents a special question node with some special functions
        function swimLane() { }
        swimLane.prototype = new mxSwimlane();
        swimLane.prototype.constructor = swimLane;

        registerCustomShape(graph, swimLane, ShapeEnum.Swimlane);
    },

    /**
    * Export chart to a json string.
    * @param {mxGraph} graph
    */
    exportChart(graph, name, description, lincData) {
        return GraphCoder.encodeGraphToJSON(graph, name, description, maxDepth, lincData);
    },

    /**
    * Import chart from a json string.
    * @param {JSON} json
    * @param {mxGraph} graph
    * @param {mxGraphModel} model
    */
    importChart(graph, json, model) {
        //delete existing graph but first remove te style of the start node otherwise you can't destroy it
        graph.getModel().setStyle(graph.getChildVertices()[0], '')
        graph.removeCells(graph.getChildVertices(graph.getDefaultParent()));

        let cells = [];
        json.forEach(n => {
            if (n.style != NodeEnum.Choice || n.style != NodeEnum.Start) {
                if (n.style == NodeEnum.MultipleChoice) {
                    //The multiplechoice needs some childs|
                    let data = n.lincData.filter(c => c.key !== "question" && c.key !== "loopsubQuestions" && c.key !== "reason")
                    console.log(data);

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
                this.addEdge(graph, flow, f.lincData);
            })
        })
    },

    /**
     * Changes the edge color by the implication level.
     * Watch out that the theme in the store is not null otherwise the method will not work proparly 
     * @param {mxEdge} edge 
     * @param {String} implicationLevel 
     */
    changeEdgeColor(edge, implicationLevel) {
        if (state.theme == null || implicationLevel == null) { return; }

        if (edge.style.includes("strokeColor")) {
            //the first index are the styles that you want to reuse
            //the second index is the part that you want to replace
            let styles = edge.style.split("strokeColor");
            edge.style = styles[0];
        }

        let levels = Object.getOwnPropertyNames(state.theme);
        if (levels == null) { return; }

        let index = levels.indexOf(implicationLevel.toLowerCase());
        let level = Object.values(state.theme)[index];

        edge.style += "strokeColor=" + level;
        state.editor.graph.refresh();
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
        if (cell.lincType === NodeEnum.Question || cell.lincType === NodeEnum.MultipleChoice || cell.lincType === NodeEnum.Choice || cell.lincType === NodeEnum.Notification) {
            cell.depth = source.depth + 1;
            if (cell.children != null) {
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
    checkDepth(cell) {
        if (cell.lincType === NodeEnum.Question || cell.lincType === NodeEnum.Notification || cell.lincType === NodeEnum.MultipleChoice || cell.lincType === NodeEnum.Choice) {
            //the connected edge is a question so get the depth from it
            //if it is a notification node than the depth of it is equal to the priour connected question node
            if (cell.depth > maxDepth) {
                maxDepth = cell.depth;
            }
        }
    }
}

