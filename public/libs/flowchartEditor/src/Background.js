/**
 * Background.js contains all functions and variables
 * that are needed for drawing the background.
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 14-03-2019
 */

import { mxGraph, mxEvent, mxGraphView, mxPoint } from "./MxGraph";

export let backgroundFunctions = {

    /**
     * prepares the mxGraph for a background.
     * @param {mxGraph} _graph 
     */
    init(_graph) {
        canvas.style.position = 'absolute';
        canvas.style.top = '0px';
        canvas.style.left = '0px';
        canvas.style.zIndex = -1;
        canvas.className = 'flowchartCanvas';
        _graph.container.appendChild(canvas);
        graph = _graph;

        // Modify event filtering to accept canvas as container
        var mxGraphViewIsContainerEvent = mxGraphView.prototype.isContainerEvent;
        mxGraphView.prototype.isContainerEvent = function (evt) {
            return mxGraphViewIsContainerEvent.apply(this, arguments) ||
            mxEvent.getSource(evt) == canvas;
        };
    },

    /**
     * paints the background onto the graph.
     * this code is originally from mxGraph's grid demo.
     */
    repaintGrid() {
        if (ctx != null) {
            var bounds = graph.getGraphBounds();
            var width = Math.max(bounds.x + bounds.width, graph.container.clientWidth);
            var height = Math.max(bounds.y + bounds.height, graph.container.clientHeight);
            var sizeChanged = width != w || height != h;

            if (graph.view.scale != s || graph.view.translate.x != tr.x || graph.view.translate.y != tr.y ||
                gs != graph.gridSize || sizeChanged) {
                tr = graph.view.translate.clone();
                s = graph.view.scale;
                gs = graph.gridSize;
                w = width;
                h = height;

                // Clears the background if required
                if (!sizeChanged) {
                    ctx.clearRect(0, 0, w, h);
                }
                else {
                    canvas.setAttribute('width', w);
                    canvas.setAttribute('height', h);
                }

                var tx = tr.x * s;
                var ty = tr.y * s;

                // Sets the distance of the grid lines in pixels
                var minStepping = graph.gridSize;
                var stepping = minStepping * s;

                if (stepping < minStepping) {
                    var count = Math.round(Math.ceil(minStepping / stepping) / 2) * 2;
                    stepping = count * stepping;
                }

                var xs = Math.floor((0 - tx) / stepping) * stepping + tx;
                var xe = Math.ceil(w / stepping) * stepping;
                var ys = Math.floor((0 - ty) / stepping) * stepping + ty;
                var ye = Math.ceil(h / stepping) * stepping;

                xe += Math.ceil(stepping);
                ye += Math.ceil(stepping);

                var ixs = Math.round(xs);
                var ixe = Math.round(xe);
                var iys = Math.round(ys);
                var iye = Math.round(ye);

                // Draws the actual grid
                ctx.strokeStyle = '#f0f0f0';
                ctx.beginPath();

                for (var x = xs; x <= xe; x += stepping) {
                    x = Math.round((x - tx) / stepping) * stepping + tx;
                    var ix = Math.round(x);

                    ctx.moveTo(ix + 0.5, iys + 0.5);
                    ctx.lineTo(ix + 0.5, iye + 0.5);
                }

                for (var y = ys; y <= ye; y += stepping) {
                    y = Math.round((y - ty) / stepping) * stepping + ty;
                    var iy = Math.round(y);

                    ctx.moveTo(ixs + 0.5, iy + 0.5);
                    ctx.lineTo(ixe + 0.5, iy + 0.5);
                }

                ctx.closePath();
                ctx.stroke();
            }
        }
    }
}

var graph;
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

var s = 0;
var gs = 0;
var tr = new mxPoint();
var w = 0;
var h = 0;