import { apiCall } from "../../../../src/api/api";

/**
 * Saves your flowchart to convert it to JSON and return it to the EditorFunctions.js script
 * @author Marco Driessen, Martijn Dormans
 * @version 1.0
 * @since 27-02-2019
 */
export let GraphCoder = {
    encodeGraphToJSON(graph, name, description, maxDepth) {
        let cells = graph.getChildVertices(graph.getDefaultParent())
        let nodes = [];
        cells.forEach(n => {
            if (n.children != null && n.children.length > 0) {
                //the node contains children that need to be exported correctly
                n.children.forEach(child => {
                    //add child-node to the nodes array
                    nodes.push(this.createNode(child));

                    //Add some lincdata to the parent node in order to save the child.
                    //It will save the child-node's name and id in order to get a reference to in the survey front-end.

                    //But first we need to check if the node already contains the choice data.
                    //If so than you will need to update these
                    console.log(n.lincData.filter(c => c.value === child.id));
                    let oldChoice = n.lincData.filter(c => c.value === child.id);
                    if (oldChoice.length != 0) {
                        let newChoice = oldChoice[0].key = child.value;
                        let index = n.lincData.indexOf(oldChoice);
                        n.lincData[index] = newChoice;
                    } else {
                        //If it's new than just push it
                        n.lincData.push({
                            "key": child.value,
                            "value": child.id
                        });
                    }
                })
            }

            nodes.push(this.createNode(n))
        })

        let module = {
            name,
            description,
            maxDepth,
            nodes
        }

        console.log(JSON.stringify(module, null, "\t"))
        //apiCall('post', "http://ironsm4sh.nl:3303/modules/", JSON.stringify(module, null, "\t"));
        return JSON.stringify(module, null, "\t")
    },

    checkEdges(cell) {
        let output = [];
        if (cell.edges !== null) {
            for (var i = 0; i < cell.edges.length; i++) {
                if (cell.id === cell.edges[i].source.id && cell.edges[i].target.id !== null) {
                    if (cell.edges[i].lincData != null) {
                        output.push({
                            targetID: cell.edges[i].target.id,
                            value: cell.edges[i].value,
                            implication: cell.edges[i].lincData[0].value,
                            implicationLevel: cell.edges[i].lincData[1].value
                        })
                    } else {
                        output.push({
                            targetID: cell.edges[i].target.id,
                            value: cell.edges[i].value,
                        })
                    }
                }
            }
        }
        return output;
    },

    createNode(node) {
        return {
            id: parseInt(node.id),
            style: node.lincType,
            value: node.value,
            lincData: node.lincData,
            height: node.geometry.height,
            width: node.geometry.width,
            posX: node.geometry.x,
            posY: node.geometry.y,
            flows: this.checkEdges(node)
        }
    },
}