/**
 * When cells get selected or deselected the cell size will adjust to the text length
 * @author Sueño de Kort
 * @version 1.0
 * @since 14-05-2019
 */        

import { mxEvent } from "../MxGraph";
import { NodeEnum } from "../NodeEnum";

export function autoResizeCells(graph) {
    graph.getSelectionModel().addListener(mxEvent.CHANGE, (sender, evt) => {
        //get selected and deselected cells
        let addedCells = evt.getProperty('added')

        let cells = []
        if (addedCells != undefined) {
            addedCells.forEach(c => {
                cells.push(c)
            })
        }

        //loop through each cell and get their preferred boundaries
        cells.forEach(c => {
            if(c.lincType != undefined && c.lincType != NodeEnum.MultipleChoice){

                let minHeight = 80;
                let heightSlack = 25;
                if(c.lincType == NodeEnum.Choice){
                    minHeight = 40;
                    heightSlack = 10;
                }

                let newRect = {}
                let rect = c.geometry
                let preffered = graph.getPreferredSizeForCell(c)
                if(preffered == null) { return; }

                newRect.x = rect.x
                newRect.y = rect.y

                //if they are under a minimum of 80 by 80 resize them bigger
                newRect.width = (preffered.width + 10 < 80) ? 80 : preffered.width + 10
                newRect.height = (preffered.height + heightSlack < minHeight) ? minHeight : preffered.height + heightSlack

                graph.resizeCell(c, newRect)
            }
        })
    });
}