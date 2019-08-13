import { ImplicationEnum } from '../../../public/libs/flowchartEditor/src/ImplicationEnum';

/**
 * This enum will connect the flowcharteditor ImplicationEnum with the Veutify theme Enum
 * Keep the name to value and value to name mappings in SYNC
 * @author Martijn Dormans
 * @version 1.0
 * @since 13-08-2019
 */

export let ImplicationColorEnum = {
    /**
     * Name to Value mapping.
     */
    [ImplicationEnum[1]] : 1, //Warning
    [ImplicationEnum[2]] : 2,    //Info
    [ImplicationEnum[3]] : 3, //Default
    [ImplicationEnum[4]] : 4,    //Error
    [ImplicationEnum[5]] : 5,   //Yellow

    /**
     * Value to Name mapping
     */
    1 : "warning",
    2 : "info",
    3 : "default",
    4 : "error",
    5 : "yellow"
}

export let ColorImplicationEnum = {
    /**
     * Name to Value mapping
     */
    "warning": 1,
    "info": 2,
    "default": 3,
    "error": 4,
    "yellow": 5,

    /**
     * Value to Name mapping.
     */
    1 : ImplicationEnum[1],
    2 : ImplicationEnum[2],
    3 : ImplicationEnum[3],
    4 : ImplicationEnum[4],
    5 : ImplicationEnum[5]
}