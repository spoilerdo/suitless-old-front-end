/**
 * Contains the private methods for the edit functions script.
 * This is made in order to reduce the line count in the EditorFunctions.js file
 * It contains all the nodes that can be used within the flowchart editor 
 * and the generic add vertex and sub vertex method and also some default styling
 * @author Martijn Dormans
 * @version 1.0
 * @since 07-05-2019
 */
import { NodeEnum } from "../NodeEnum";
import { ShapeEnum } from "./ShapeEnum";
import { mxGraph, mxConstants, mxCellRenderer } from "../MxGraph";
import { editorFunctions } from "./EditorFunctions";

/**
* Inserts vertex with Question parameters and json if given
* A Question contains 2 data values:
* - question: question that is asked within the survey
* - reason: the reason this question is asked
* @param {mxGraph} graph 
* @param {DefaultParent} parent 
* @param {object} json
* @param {String} x
* @param {String} y
*/
export function addQuestion(graph, parent, json, x, y) {
    editorFunctions.setCustomShape(graph, ShapeEnum.Rectangle);

    let data = [
        {
            "key": "question",
            "value": ""
        },
        {
            "key": "reason",
            "value": ""
        }
    ]
    return genericAddVertex(graph, parent, json, NodeEnum.Question, data, 80, 80, x, y, 'shape=' + NodeEnum.Rectangle);
}

/**
 * Inserts vertex with Start parameters and json if given
 * Start contains no data because it isn't used in the survey front-end
 * @param {mxGraph} graph 
 * @param {DefaultParent} parent 
 * @param {object} json
 * @param {String} x
 * @param {String} y
 */
export function addStart(graph, parent, json, x, y) {
    editorFunctions.setCustomShape(graph, ShapeEnum.Ellipse);

    return genericAddVertex(graph, parent, json, NodeEnum.Start, null, 80, 80, x, y, 'shape=' + ShapeEnum.Ellipse + ';perimeter=ellipsePerimeter;deletable=0;');
}

/**
 * Inserts vertex with Module parameters and json if given
 * Module contains 1 data value:
 * - module: the name of the module you want to refer to
 * @param {mxGraph} graph
 * @param {DefaultParent} parent
 * @param {object} json
 * @param {String} x
 * @param {String} y
 */
export function addModule(graph, parent, json, x, y) {
    editorFunctions.setCustomShape(graph, ShapeEnum.DottedEllipse);

    let data = [{
        "key": "module",
        "value": ""
    }]
    let vertex = genericAddVertex(graph, parent, json, NodeEnum.Module, data, 80, 80, x, y, 'shape=' + ShapeEnum.DottedEllipse + ';perimeter=ellipsePerimeter;');
    vertex.setConnectable(false);
    return vertex;
}

/**
 * Inserts End vertex and json if given
 * End contains no data because it isn't used in the survey front-end (only for visual presentation in the flowchart-editor)
 * @param {mxGraph} graph 
 * @param {DefaultParent} parent 
 * @param {object} json
 * @param {String} x
 * @param {String} y
 */
export function addEnd(graph, parent, json, x, y) {
    editorFunctions.setCustomShape(graph, ShapeEnum.Ellipse);

    let vertex = genericAddVertex(graph, parent, json, NodeEnum.End, null, 80, 80, x, y, 'shape=' + ShapeEnum.Ellipse + ';perimeter=ellipsePerimeter;editable=0;');
    vertex.setConnectable(false);
    return vertex;
}

/**
 * Inserts vertex with Notification parameters and json if given
 * Notification contains 1 data value:
 * - notify: the notification text that will be shown in the survey front-end
 * @param {mxGraph} graph
 * @param {DefaultParent} parent
 * @param {object} json
 * @param {String} x
 * @param {String} y
 */
export function addNotification(graph, parent, json, x, y) {
    editorFunctions.setCustomShape(graph, ShapeEnum.Hexagon);

    let data = [{
        "key": "notify",
        "value": ""
    }]
    return genericAddVertex(graph, parent, json, NodeEnum.Notification, data, 80, 80, x, y, 'shape=' + ShapeEnum.Hexagon + ';perimeter=ellipsePerimeter;');
}

/**
 * Inserts vertex with Note parameters and json if given
 * Note contains no data because it's only used to add nodes to the flowchart-editor
 * for example: TODO's
 * @param {mxGraph} graph
 * @param {DefaultParent} parent
 * @param {object} json
 * @param {String} x
 * @param {String} y
 */
export function addNote(graph, parent, json, x, y) {
    editorFunctions.setCustomShape(graph, ShapeEnum.Rectangle);
    let style = graph.getStylesheet().getDefaultVertexStyle();
    style[mxConstants.STYLE_FILLCOLOR] = '#fcea76';

    return genericAddVertex(graph, parent, json, NodeEnum.Note, null, 80, 80, x, y);
}

/**
 * Inserts vertex with MultipleChoice parameters and json if given
 * Example: https://jgraph.github.io/mxgraph/javascript/examples/folding.html
 * MultipleChoice contains 3 data values:
 * - question: question that is asked within the survey
 * - reason: the reason this question is asked
 * - loopsubQuestions: is a boolean that will determine if the same subquestion will be asked multiple times
 * It is possible that some choices have the same subquestions and that you don't want to ask these multiple times
 * 
 * Warning: When exporting this node will have some data that contains a link to all the choices this question contains
 * 
 * @param {mxGraph} graph
 * @param {DefaultParent} parent
 * @param {object} json
 * @param {String} x
 * @param {String} y
 */
export function addMultipleChoice(graph, parent, json, x, y) {
    editorFunctions.setCustomShape(graph, ShapeEnum.Swimlane);

    let data = [
        {
            "key": "question",
            "value": ""
        },
        {
            "key": "reason",
            "value": ""
        },
        {
            "key": "loopsubQuestions",
            "value": true
        }
    ]

    let parentSwimlane = genericAddVertex(graph, parent, json, NodeEnum.MultipleChoice, data, 300, 300, x, y, 'shape=' + ShapeEnum.Swimlane);
    
    //add three standard sub vertexes
    addSubVertexes(graph, parentSwimlane, json, 3, 0);
    
    return parentSwimlane;
}

var posX = 20, posY = 20;

/**
 * Generic insert vertex method with vertex type, data parameters and json if given
 * This generic methods will add the vertex to the graph
 * The nodeEnum variable will determine which vertex will be added (e.g. question or start node)
 * @param {mxGraph} graph 
 * @param {DefaultParent} parent 
 * @param {object} json 
 * @param {NodeEnum} nodeEnum 
 */
export function genericAddVertex(graph, parent, json, nodeEnum, data, width, height, x, y, style) {
    let vertex;

    //when importing a flowchart from json this will be true
    if (json != null) {
        vertex = graph.createVertex(parent, json.id, json.value, json.posX, json.posY, json.width, json.height, style);
        data = json.lincData;
    } else if (x == null || y == null) {
        vertex = graph.createVertex(parent, null, NodeEnum[nodeEnum], posX, posY,
            width, height, style);
        posY += 20;
    } else {
        vertex = graph.createVertex(parent, null, NodeEnum[nodeEnum], x, y,
            width, height, style);
    }

    vertex.lincType = nodeEnum;
    if (data != null) {
        vertex.lincData = data;
    }

    //Add depth to a question or notification node
    if (nodeEnum === NodeEnum.Question || nodeEnum === NodeEnum.Notification || nodeEnum === NodeEnum.Start || nodeEnum === nodeEnum.MultipleChoice) {
        vertex.depth = 0;
    }
    graph.addCell(vertex, parent);
    return vertex;
}

/**
 * Generic insert vertex method that inserts sub vertexes into a parent vertex
 * if json given it will add the sub vertexes according trough the json of the parent
 * @param {mxGraph} graph 
 * @param {DefaultParent} parent 
 * @param {object} json 
 * @param {Number} amountOfChildren 
 * @param {Number} index 
 */
export function addSubVertexes(graph, parent, json, amountOfChildren, index) {
    if(json != null){
        json.children.forEach(child => {
            genericAddVertex(graph, parent, child, NodeEnum.Choice);
        });
    } else {
        for (let i = index; i < amountOfChildren; i++) {
            let data = [{
                "key": "choice ",
                "value": "this is a choice"
            }]

            genericAddVertex(graph, parent, null, NodeEnum.Choice, data, 80, 40, 10, (70 + i * 50), 'shape=' + ShapeEnum.Swimlane + ';movable=0');
        }
    }
}

/**
 * Registers an mxShape to the mxCellRenderer and allows it to be
 * Used in the style by using its name.
 * This is the basic style sheet used in the flowchart editor
 * @param {mxGraph} graph 
 * @param {mxShape} shape 
 * @param {string} name 
 */
export function registerCustomShape(graph, shape, name) {
    mxCellRenderer.registerShape(name, shape);

    let style = graph.getStylesheet().getDefaultVertexStyle();
    style[mxConstants.STYLE_SHAPE] = name;
    style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
    style[mxConstants.STYLE_STROKECOLOR] = '#000000';
    style[mxConstants.STYLE_FONTCOLOR] = '#000000';
    style[mxConstants.STYLE_FONTSIZE] = '16';

    style = graph.getStylesheet().getDefaultEdgeStyle();
    style[mxConstants.STYLE_STROKECOLOR] = '#424242';
    style[mxConstants.STYLE_FONTCOLOR] = '#000000';
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#ffffff';
    style['fontStyle'] = '0';
    style['fontStyle'] = '0';
    style[mxConstants.STYLE_FONTSIZE] = '16';
    style['startSize'] = '8';
    style['endSize'] = '8';
}