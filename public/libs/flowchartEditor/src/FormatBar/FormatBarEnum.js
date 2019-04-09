/**
 * FormatBar ENUM contains all format bar types
 * @author Martijn Dormans
 * @version 1.0
 * @since 03-04-2019
 */

/**
 * FormatBarEnum to store all types of formatbar.
 * keep the name to value and value to name mappings
 * in SYNC.
 */
export let FormatBarEnum = {
    /**
     * Name to value mapping
     */
    Question: 0,
    Reason: 1,
    Module: 2,
    Notification: 3,

    /**
     * Value to Name mapping
     */
    0: "Question",
    1: "Reason",
    2: "Module",
    3: "Notification"
}