/**
 * pdfContent contains the class that initializes a pdfContent instance.
 * This specific content is used for Background Information implications.
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 12-03-2019
 */

import { pdfContentImplication } from "./PdfContentImplication";

export class pdfContentBackgroundInformation extends pdfContentImplication {

    constructor(data){
        super(data);
        this.implicationLevel = "Background information";
    }

    /**
     * sets the text color appropriate for the type.
     */
    setStyle(doc) {
        doc.setTextColor(102, 178, 255); //Blue
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

