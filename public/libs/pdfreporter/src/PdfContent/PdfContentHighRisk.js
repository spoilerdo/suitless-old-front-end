/**
 * pdfContent contains the class that initializes a pdfContent instance.
 * This specific content is used for an High Risk implication.
 * @author Martijn Dormans
 * @version 1.0
 * @since 02-07-2019
 */

import { pdfContentImplication } from "./PdfContentImplication";

export class pdfContentHighRisk extends pdfContentImplication {

    constructor(data){
        super(data);
        this.implicationLevel = "High risk";
    }

    /**
     * sets the text color appropriate for the type.
     */
    setStyle(doc) {
        doc.setTextColor(255, 102, 102); //Red
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