/**
 * Saves your flowchart to convert it to JSON and return it to the EditorFunctions.js script
 * @author Marco Driessen, Martijn Dormans
 * @version 1.0
 * @since 27-02-2019
 */
export let GraphCoder = {
    encodeGraphToJSON(graph, name, description, maxDepth, lincData) {
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
                    let standardLincData = n.lincData.filter(c => c.value !== child.id);
                    //If it's new than just push it
                    standardLincData.push({
                        "key": child.value,
                        "value": child.id
                    });
                    n.lincData = standardLincData;
                })
            }

            nodes.push(this.createNode(n))
        })

        let module = {
            name,
            description,
            maxDepth,
            lincData,
            nodes
        }

        console.log(JSON.stringify(module, null, "\t"))
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
                            lincData: cell.edges[i].lincData
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