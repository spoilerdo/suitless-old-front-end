/**
 * ImplicationEnum to store all implication types.
 * keep the name to value and value to name mappings
 * in SYNC.
 * @author Martijn Dormans
 * @version 1.0
 * @since 10-6-2019
 */

export let ImplicationEnum = {
    /**
     * Name to Value mapping.
     */
    Success : 1,
    Warning : 2,
    Info : 3,
    Default : 4,
    Error: 5,

    /**
     * Value to Name mapping.
     */
    1 : "success",
    2 : "warning",
    3 : "info",
    4 : "default",
    5 : "primary"
}