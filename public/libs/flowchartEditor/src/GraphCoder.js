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