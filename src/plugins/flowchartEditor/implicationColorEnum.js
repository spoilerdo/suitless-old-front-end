import { ImplicationEnum } from '../../../public/libs/flowchartEditor/src/ImplicationEnum';

/**
 * This enum will connect the flowcharteditor ImplicationEnum with the Veutify theme Enum
 * Keep the name to value and value to name mappings in SYNC
 * @author Martijn Dormans
 * @version 1.0
 * @since 13-08-2019
 */

export let ImplicationColorEnum, ColorImplicationEnum = {
    /**
     * Name to Value mapping.
     */
    [ImplicationEnum[1]] : 1,
    [ImplicationEnum[2]] : 2,
    [ImplicationEnum[3]] : 3,
    [ImplicationEnum[4]] : 4,
    [ImplicationEnum[5]] : 5,

    /**
     * Value to Name mapping
     */
    1 : ImplicationEnum[1],
    2 : ImplicationEnum[2],
    3 : ImplicationEnum[3],
    4 : ImplicationEnum[4],
    5 : ImplicationEnum[5]
}