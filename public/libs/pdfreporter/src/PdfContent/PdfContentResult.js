/**
 * pdfContent contains the class that initializes a pdfContent instance.
 * This specific content is used for results
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 12-03-2019
 */

import { pdfContent } from "./PdfContent"

export class pdfContentResult extends pdfContent {

    constructor(data){
        super();
        this.data = data;
    }

    /**
     * sets the text color appropriate for the type.
     */
    setStyle(doc) {
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(11);
        doc.setFont("Times","normal");
    }

    /**
     * returns the correct offset for this pdfContent
     * object
     */
    getOffset() {
        return 0.5;
    }
}

