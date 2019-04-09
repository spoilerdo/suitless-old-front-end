/**
 * pdfContent ENUM contains all pdfContent types
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 12-03-2019
 */


/**
 * pdfContentEnum to store all types of pdfContent.
 * keep the name to value and value to name mappings
 * in SYNC.
 */
export let pdfContentEnum = {
    /**
     * Name to Value mapping.
     */
    question: 0,
    title: 1,
    result: 2,
    warning: 3,
    reply: 4,

    /**
     * Value to Name mapping.
     */
    0: "question",
    1: "title",
    2: "result",
    3: "warning",
    4: "reply"
}
