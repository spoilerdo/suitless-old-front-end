/**
 * Node ENUM contains all node types
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 18-02-2019
 */


/**
 * NodeEnum to store all types of nodes.
 * keep the name to value and value to name mappings
 * in SYNC.
 */
export let NodeEnum = {
    /**
     * Name to Value mapping.
     */
    Start : 0,
    Question : 1,
    End: 2,
    Condition: 3,
    Module: 4,
    Notification: 5,

    /**
     * Value to Name mapping.
     */
    0 : "Start",
    1 : "Question",
    2 : "End",
    3 : "Condition",
    4 : "Module",
    5 : "Notification"
}