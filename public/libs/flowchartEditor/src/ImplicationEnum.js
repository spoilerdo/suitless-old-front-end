/**
 * ImplicationEnum to store all implication types linked to a color within the connected application.
 * keep the name to value and value to name mappings
 * in SYNC with the color scheme of your application
 * @author Martijn Dormans
 * @version 1.0
 * @since 10-6-2019
 */

export let ImplicationEnum = {
    /**
     * Name to Value mapping.
     */
    "High risk": 1,
    "High priority (Find specialist)" : 2,
    "High priority (To do yourself)": 3,
    "Background information" : 4,
    "Assumptions" : 5,

    /**
     * Value to Name mapping.
     */
    1 : "High risk",
    2 : "High priority (Find specialist)",
    3 : "High priority (To do yourself)",
    4 : "Background information",
    5 : "Assumptions"
}