/**
 * Saves your flowchart to convert it to JSON
 * @author Marco Driessen, Martijn Dormans
 * @version 1.0
 * @since 27-02-2019
 */
export let GraphCoder = {
    encodeGraphToJSON(graph, name, description, maxDepth) {
        let cells =  graph.getChildVertices(graph.getDefaultParent())
        let nodes = [];
        cells.forEach(n => {
            if(n.children != null && n.children.length > 0){
                //the node contains children that need to be exported correctly
                n.children.forEach(child => {
                    //add child-node to the nodes array
                    nodes.push(this.createNode(child));
                    
                    //add some lincdata to the parent node in order to save the child
                    //it will save the child-node's name and id in order to get a reference to
                    n.lincData.push({
                        "key": child.value,
                        "value": child.id
                    });
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

        return JSON.stringify(module, null, "\t")
    },

    checkEdges(cell){
        let output = [];
        if(cell.edges !== null){
            for (var i = 0; i < cell.edges.length; i++) {
                if(cell.id === cell.edges[i].source.id && cell.edges[i].target.id !== null){
                   output.push({
                       targetID: cell.edges[i].target.id,
                       value: cell.edges[i].value,
                       implication: cell.edges[i].lincData[0].value,
                       implicationLevel: cell.edges[i].lincData[1].value
                   }) 
                }
            }
        }
        return output;
    },

    createNode(node){
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