/**
 * Actions you can perform by using a keyboard or mouse
 * @author Martijn Dormans
 * @version 1.0
 * @since 02-04-2019
 */

import { mxGraph, mxClipboard, mxKeyHandler } from "../MxGraph";

/**
* uses the addItem function of the mxDefaultToolbar to add most basic
* scroll behaviour sources:
* https://stackoverflow.com/questions/3898130/check-if-a-user-has-scrolled-to-the-bottom
* https://stackoverflow.com/questions/31223341/detecting-scroll-direction
* actions to the toolbar.
* @param {mxKeyHandler} keyHandler 
* @param {mxGraph} graph

*/
export function addKeyActions(keyHandler, graph, graphcontainer) {
    keyHandler.bindKey(46, (evt) => {
        if (graph.isEnabled()) {
            graph.removeCells();
        }
    });
    keyHandler.bindControlKey(67, (evt) => {
        if (graph.isEnabled()) {
            mxClipboard.copy(graph);
        }
    });
    keyHandler.bindControlKey(86, (evt) => {
        if (graph.isEnabled()) {
            mxClipboard.paste(graph);
        }
    });
    keyHandler.bindControlKey(88, (evt) => {
        if (graph.isEnabled()) {
            mxClipboard.cut(graph);
        }
    });

    let crtlPressed = false;
    keyHandler.bindControlKey(17, (evt) => {
        if (graph.isEnabled()) {
            crtlPressed = true;
        }
    });

    graphcontainer.addEventListener('keyup', function(e){
        if(e.keyCode === 17){
            crtlPressed = false;
        }
    });

    graphcontainer.addEventListener('wheel', function (e) {
        if (crtlPressed) {
            event.preventDefault();

            if (e.deltaY < 0) {
                graph.zoomIn();
            }
            else if (e.deltaY > 0) {
                graph.zoomOut();
            }
        }
    });
}