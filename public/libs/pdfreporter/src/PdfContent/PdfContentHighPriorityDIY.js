/**
 * pdfContent contains the class that initializes a pdfContent instance.
 * This specific content is used for a High Priority DIY implication.
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 12-03-2019
 */

import { pdfContentImplication } from "./PdfContentImplication";

export class pdfContentHighPriorityDIY extends pdfContentImplication {

    constructor(data){
        super(data);
        this.implicationLevel = "High priority (To do yourself)";
    }

    /**
     * sets the text color appropriate for the type.
     */
    setStyle(doc) {
        doc.setTextColor(255, 204, 102); //Yellow
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