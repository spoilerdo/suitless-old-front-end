/**
 * NodeEnum to store all types of nodes.
 * keep the name to value and value to name mappings
 * in SYNC.
 * @author Julius Ammerlaan, Martijn Dormans
 * @version 1.3
 * @since 18-02-2019
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
    Note: 6,
    MultipleChoice: 7,
    Choice: 8,
    Edge: 9,

    /**
     * Value to Name mapping.
     */
    0 : "Start",
    1 : "Question",
    2 : "End",
    3 : "Condition",
    4 : "Module",
    5 : "Notification",
    6 : "Note",
    7 : "MultipleChoice",
    8 : "Choice",
    9 : "Edge"
}