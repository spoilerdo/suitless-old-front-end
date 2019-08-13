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
    "Hight priority (Find specialist)" : 1, //Warning
    "Background information" : 2,    //Info
    "Assumptions" : 3, //Default
    "High risk": 4,    //Error
    "High priority (To do yourself)": 5,   //Yellow

    /**
     * Value to Name mapping.
     */
    1 : "Hight priority (Find specialist)",
    2 : "Background information",
    3 : "Assumptions",
    4 : "High risk",
    5 : "High priority (To do yourself)"
}