/**
 * Contains the private methods for the edit functions script.
 * This is made in order to reduce the line count in the EditorFunctions.js file
 * @author Martijn Dormans
 * @version 1.0
 * @since 07-05-2019
 */
import { NodeEnum } from "../NodeEnum";
import { mxGraph, mxConstants, mxCellRenderer } from "../MxGraph";
import { editorFunctions } from "./EditorFunctions";

/**
* Inserts vertex with Question parameters and json if given
* @param {mxGraph} graph 
* @param {DefaultParent} parent 
* @param {object} json
* @param {String} x
* @param {String} y
*/
export function addQuestion(graph, parent, json, x, y) {
    editorFunctions.setCustomShape(graph, NodeEnum.Question);

    let data = [
        {
            "key": "question",
            "value": "Question"
        },
        {
            "key": "reason",
            "value": "Reason for the question"
        }
    ]
    return genericAddVertex(graph, parent, json, NodeEnum.Question, data, 80, 80, x, y, 'shape=' + NodeEnum.Question);
}

/**
 * Inserts vertex with Start parameters and json if given
 * @param {mxGraph} graph 
 * @param {DefaultParent} parent 
 * @param {object} json
 * @param {String} x
 * @param {String} y
 */
export function addStart(graph, parent, json, x, y) {
    editorFunctions.setCustomShape(graph, NodeEnum.Start);

    return genericAddVertex(graph, parent, json, NodeEnum.Start, null, 80, 80, x, y, 'shape=' + NodeEnum.Start + ';perimeter=ellipsePerimeter;');
}

/**
 * Inserts vertex with Module parameters and json if given
 * @param {mxGraph} graph
 * @param {DefaultParent} parent
 * @param {object} json
 * @param {String} x
 * @param {String} y
 */
export function addModule(graph, parent, json, x, y) {
    editorFunctions.setCustomShape(graph, NodeEnum.Module);

    let data = [{
        "key": "module",
        "value": "Module name"
    }]
    return genericAddVertex(graph, parent, json, NodeEnum.Module, data, 80, 80, x, y, 'shape=' + NodeEnum.Module + ';perimeter=ellipsePerimeter;');
}

/**
 * Inserts End vertex and json if given
 * @param {mxGraph} graph 
 * @param {DefaultParent} parent 
 * @param {object} json
 * @param {String} x
 * @param {String} y
 */
export function addEnd(graph, parent, json, x, y) {
    editorFunctions.setCustomShape(graph, NodeEnum.Start);

    return genericAddVertex(graph, parent, json, NodeEnum.End, null, 80, 80, x, y, 'shape=' + NodeEnum.Start + ';perimeter=ellipsePerimeter;');
}

/**
 * Inserts vertex with Notification parameters and json if given
 * @param {mxGraph} graph
 * @param {DefaultParent} parent
 * @param {object} json
 * @param {String} x
 * @param {String} y
 */
export function addNotification(graph, parent, json, x, y) {
    editorFunctions.setCustomShape(graph, NodeEnum.Notification);

    let data = [{
        "key": "notify",
        "value": "this is a notification"
    }]
    return genericAddVertex(graph, parent, json, NodeEnum.Notification, data, 80, 80, x, y, 'shape=' + NodeEnum.Notification + ';perimeter=ellipsePerimeter;');
}

/**
 * Inserts vertex with Note parameters and json if given
 * @param {mxGraph} graph
 * @param {DefaultParent} parent
 * @param {object} json
 * @param {String} x
 * @param {String} y
 */
export function addNote(graph, parent, json, x, y) {
    editorFunctions.setCustomShape(graph, NodeEnum.Question);
    let style = graph.getStylesheet().getDefaultVertexStyle();
    style[mxConstants.STYLE_FILLCOLOR] = '#fcea76';

    return genericAddVertex(graph, parent, json, NodeEnum.Note, null, 80, 80, x, y);
}

/**
 * Inserts vertex with MultipleChoice parameters and json if given
 * Example: https://jgraph.github.io/mxgraph/javascript/examples/folding.html
 * @param {mxGraph} graph
 * @param {DefaultParent} parent
 * @param {object} json
 * @param {String} x
 * @param {String} y
 */
export function addMultipleChoice(graph, parent, json, x, y) {
    editorFunctions.setCustomShape(graph, NodeEnum.MultipleChoice);

    let data = [{
        "key": "question",
        "value": "this is the multiplechoice question"
    }]

    let parentSwimlane = genericAddVertex(graph, parent, json, NodeEnum.MultipleChoice, data, 300, 300, x, y, 'resizable=0');

    addSubVertexes(graph, parentSwimlane, json);
    
    return parentSwimlane;
}

var posX = 20, posY = 20;

/**
 * Generic insert vertex method with vertex type, data parameters and json if given
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

function addSubVertexes(graph, parent, json) {
    if(json != null){
        json.children.forEach(child => {
            genericAddVertex(graph, parent, child, NodeEnum.Choice, null, null, null, null, null, null);
        });
    } else {
        //add three standard sub vertexes
        for (let i = 0; i < 3; i++) {
            let data = [{
                "key": "choice",
                "value": "this is a choice"
            }]

            genericAddVertex(graph, parent, null, NodeEnum.Choice, data, 80, 40, 10, (70 + i * 50), 'movable=0');
        }
    }
}

/**
 * registers an mxShape to the mxCellRenderer and allows it to be
 * used in the style by using its name.
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
    style[mxConstants.STYLE_STROKECOLOR] = '#000000';
    style[mxConstants.STYLE_FONTCOLOR] = '#000000';
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#ffffff';
    style['fontStyle'] = '0';
    style['fontStyle'] = '0';
    style[mxConstants.STYLE_FONTSIZE] = '16';
    style['startSize'] = '8';
    style['endSize'] = '8';
}