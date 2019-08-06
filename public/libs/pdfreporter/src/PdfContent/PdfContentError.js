/**
 * pdfContent contains the class that initializes a pdfContent instance.
 * This specific content is used for an error implication.
 * @author Martijn Dormans
 * @version 1.0
 * @since 02-07-2019
 */

import { pdfContent } from "./PdfContent"

export class pdfContentError extends pdfContent {

    constructor(data){
        super();
        this.data = data;
    }

    /**
     * sets the text color appropriate for the type.
     */
    setStyle(doc) {
        doc.setTextColor(192, 24, 51);
        doc.setFontSize(11);
        doc.setFont("Times","normal");
    }

    /**
     * returns the correct offset for this pdfContent
     * object
     */
    getOffset() {
        return 0.2;
    }
}