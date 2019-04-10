import { mxClipboard, mxUtils, mxCodec, mxGraphModel, mxEvent } from "../MxGraph";

export function clipBoardFunctions() {
    var textInput = document.createElement('textarea');
    mxUtils.setOpacity(textInput, 0);
    textInput.style.width = '1px';
    textInput.style.height = '1px';

    var lastPaste = null;

    mxEvent.addListener(textInput, 'copy', mxUtils.bind(this, function (evt) {
        if (graph.isEnabled() && !graph.isSelectionEmpty()) {
            copyCells(graph, mxUtils.sortCells(graph.model.getTopmostCells(graph.getSelectionCells())));
            dx = 0;
            dy = 0;
        }
    }));

    var copyCells = function (graph, cells) {
        if (cells.length > 0) {
            var clones = graph.cloneCells(cells);

            // Checks for orphaned relative children and makes absolute
            for (var i = 0; i < clones.length; i++) {
                var state = graph.view.getState(cells[i]);

                if (state != null) {
                    var geo = graph.getCellGeometry(clones[i]);

                    if (geo != null && geo.relative) {
                        geo.relative = false;
                        geo.x = state.x / state.view.scale - state.view.translate.x;
                        geo.y = state.y / state.view.scale - state.view.translate.y;
                    }
                }
            }

            textInput.value = mxClipboard.cellsToString(clones);
        }

        textInput.select();
        lastPaste = textInput.value;
    };

    mxClipboard.cellsToString = function (cells) {
        var codec = new mxCodec();
        var model = new mxGraphModel();
        var parent = model.getChildAt(model.getRoot(), 0);

        for (var i = 0; i < cells.length; i++) {
            model.add(parent, cells[i]);
        }
        return mxUtils.getXml(codec.encode(model));
    };

    mxEvent.addListener(textInput, 'paste', function (evt) {
        // Clears existing contents before paste - should not be needed
        // because all text is selected, but doesn't hurt since the
        // actual pasting of the new text is delayed in all cases.
        textInput.value = '';
        if (graph.isEnabled()) {
            var xml = extractGraphModelFromEvent(evt);
            if (xml != null && xml.length > 0) {
                pasteText(xml);
            }
            else {
                // Timeout for new value to appear
                window.setTimeout(mxUtils.bind(this, function () {
                    pasteText(textInput.value);
                }), 0);
            }
        }

        textInput.select();
    });

    var extractGraphModelFromEvent = function (evt) {
        var data = null;

        if (evt != null) {
            var provider = (evt.dataTransfer != null) ? evt.dataTransfer : evt.clipboardData;

            if (provider != null) {
                if (document.documentMode == 10 || document.documentMode == 11) {
                    data = provider.getData('Text');
                }
                else {
                    data = (mxUtils.indexOf(provider.types, 'text/html') >= 0) ? provider.getData('text/html') : null;

                    if (mxUtils.indexOf(provider.types, 'text/plain' && (data == null || data.length == 0))) {
                        data = provider.getData('text/plain');
                    }
                }
            }
        }

        return data;
    };

    var pasteText = function (text) {
        var xml = mxUtils.trim(text);
        var x = graph.container.scrollLeft / graph.view.scale - graph.view.translate.x;
        var y = graph.container.scrollTop / graph.view.scale - graph.view.translate.y;

        if (xml.length > 0) {
            if (lastPaste != xml) {
                lastPaste = xml;
                dx = 0;
                dy = 0;
            }
            else {
                dx += gs;
                dy += gs;
            }

            // Standard paste via control-v
            if (xml.substring(0, 14) == '<mxGraphModel>') {
                graph.setSelectionCells(importXml(xml, dx, dy));
                graph.scrollCellToVisible(graph.getSelectionCell());
            }
        }
    };

    // Merges XML into existing graph and layers
    var importXml = function (xml, dx, dy) {
        dx = (dx != null) ? dx : 0;
        dy = (dy != null) ? dy : 0;
        var cells = []
        try {
            var doc = mxUtils.parseXml(xml);
            var node = doc.documentElement;

            if (node != null) {
                var model = new mxGraphModel();
                var codec = new mxCodec(node.ownerDocument);
                codec.decode(node, model);

                var childCount = model.getChildCount(model.getRoot());
                var targetChildCount = graph.model.getChildCount(graph.model.getRoot());

                // Merges existing layers and adds new layers
                graph.model.beginUpdate();
                try {
                    for (var i = 0; i < childCount; i++) {
                        var parent = model.getChildAt(model.getRoot(), i);

                        // Adds cells to existing layers if not locked
                        if (targetChildCount > i) {
                            // Inserts into active layer if only one layer is being pasted
                            var target = (childCount == 1) ? graph.getDefaultParent() : graph.model.getChildAt(graph.model.getRoot(), i);

                            if (!graph.isCellLocked(target)) {
                                var children = model.getChildren(parent);
                                cells = cells.concat(graph.importCells(children, dx, dy, target));
                            }
                        }
                        else {
                            // Delta is non cascading, needs separate move for layers
                            parent = graph.importCells([parent], 0, 0, graph.model.getRoot())[0];
                            var children = graph.model.getChildren(parent);
                            graph.moveCells(children, dx, dy);
                            cells = cells.concat(children);
                        }
                    }
                }
                finally {
                    graph.model.endUpdate();
                }
            }
        }
        catch (e) {
            alert(e);
            throw e;
        }

        return cells;
    };
}