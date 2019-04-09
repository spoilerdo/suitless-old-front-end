/**
 * Enables rubberband selections for a mxGraph
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 18-02-2019
 */

import { mxGraph, mxRubberband } from "../MxGraph";

/**
 * enables the mxRubberband effect which allows the user
 * to select multiple items by drag-clicking.
 * @param {mxGraph} graph 
 */
export function createRubberband(graph){
    let rubberband = new mxRubberband(graph);
    rubberband.defaultOpacity = 100;
    rubberband.enabled = true;
    rubberband.fadeOut = true;
}