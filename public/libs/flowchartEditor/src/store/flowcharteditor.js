export const state = {
    dialog: {
        dialogInternal: false,
        dialogListener: function (val) { },
        set set(val) {
            this.dialogInternal = val;
            this.dialogListener(val);
        },
        get get() {
            return this.dialogInternal;
        },
        registerListener: function (listener) {
            this.dialogListener = listener;
        }
    },
    flowchart: {
        flowchartInternal: null,
        flowchartListener: function (val) { },
        set set(val) {
            this.flowchartInternal = val;
            this.flowchartListener(val);
        },
        get get() {
            return this.flowchartInternal;
        },
        registerListener: function (listener) {
            this.flowchartListener = listener;
        }
    }
};

export const methods = {
    setDialog(val) {
        state.dialog.set = val;
    },
    setFlowchart(val) {
        state.flowchart.set = val;
    }
}