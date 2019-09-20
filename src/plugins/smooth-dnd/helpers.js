/**
 * Hellper methods for the smooth drag and drop system used in the test survey environment.
 * This code originates from the following git:
 * https://github.com/kutlugsahin/vue-smooth-dnd/blob/master/demo/src/utils/helpers.js
 * @author Martijn Dormans
 * @version 1.0
 * @since 27-08-2019
 * 
 * @memberof plugin
 */

export const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult
    if (removedIndex === null && addedIndex === null) return arr

    const result = [...arr]
    let itemToAdd = payload

    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
    }

    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
    }

    return result
}

export const generateItems = (count, creator) => {
    const result = []
    for (let i = 0; i < count; i++) {
        result.push(creator(i))
    }
    return result
}