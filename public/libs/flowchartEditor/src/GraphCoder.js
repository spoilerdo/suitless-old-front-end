import { apiCall } from "../../../../src/api/api";

/**
 * Saves your flowchart to convert it to JSON
 * @author Marco Driessen, Martijn Dormans
 * @version 1.0
 * @since 27-02-2019
 */
export let GraphCoder = {
    encodeGraphToJSON(graph, name, description, maxDepth) {
        let cells =  graph.getChildVertices(graph.getDefaultParent())
        let nodes = []
        cells.forEach(e => {
            nodes.push({
                ID: e.id,
                style: e.lincType,
                value: e.value,
                lincData: this.createLincData(e.lincData),
                height: e.geometry.height,
                width: e.geometry.width,
                posX: e.geometry.x,
                posY: e.geometry.y,
                flows: this.checkEdges(e)
            })
        })

        let module = {
            name,
            description,
            maxDepth,
            nodes   
        }

        console.log(JSON.stringify(module, null, "\t"))
        apiCall('post', "http://localhost:3304/", JSON.stringify(module, null, "\t"));
    },

    createLincData(lincData){
        let lincs = [];

        //TODO: maak foreach en array van lincData

        lincs.push({
            key: "Reason", 
            value: "Reason for the question"
        });

        return lincs;
    },

    checkEdges(cell){
        let output = [];
        if(cell.edges !== null){
            for (var i = 0; i < cell.edges.length; i++) {
                if(cell.id === cell.edges[i].source.id && cell.edges[i].target.id !== null){
                   output.push({
                       targetID: cell.edges[i].target.id,
                       value: cell.edges[i].value
                   }) 
                }
            }
        }
        return output;
    }
}