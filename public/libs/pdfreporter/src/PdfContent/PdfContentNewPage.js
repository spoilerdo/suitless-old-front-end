/**
 * pdfContent contains the class that initializes a pdfContent instance.
 * This specific content is used for a new page
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 12-03-2019
 */

import { pdfContent } from "./PdfContent"

export class pdfContentNewPage extends pdfContent {

    constructor(){
        super();
        this.data = "";
    }

    /**
     * Add nothing, but act like our content is the max size.
     * @param {*} doc unused
     * @param {*} offset unused
     */
    addToDoc(doc, offset) {
        doc.addPage();
        return -offset;
    }
}

