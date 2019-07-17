/**
 * Shape ENUM contains all custom shape types
 * @author Martijn Dormans
 * @version 1.0
 * @since 17-07-2019
 */


/**
 * ShapeEnum to store all custom shapes
 * keep the name to value and value to name mappings
 * in SYNC.
 */
export let ShapeEnum = {
    /**
     * Name to Value mapping.
     */
    Rectangle: 0,
    Ellipse: 1,
    DottedEllipse: 2,
    Hexagon: 3,
    Swimlane: 4,

    /**
     * Value to Name mapping
     */
    0 : "Rectangle",
    1 : "Ellipse",
    2 : "DottedEllipse",
    3 : "Hexagon",
    4 : "Swimlane"
}