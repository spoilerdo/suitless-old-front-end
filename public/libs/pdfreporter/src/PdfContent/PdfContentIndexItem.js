/**
 * pdfContent contains the class that initializes a pdfContent instance.
 * This specific content is used for index items.
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 12-03-2019
 */

import { pdfContent } from "./PdfContent";

export class pdfContentIndexItem extends pdfContent {

    constructor(data) {
        super();
        this.fontSize = 11;
        this.data = `» ${data}`;
    }

    addToDoc(doc, offset) {
        this.setStyle(doc);
        var lines = doc.splitTextToSize(this.data, this.pageWidth - this.getX());
        
        let internalOffset = 0;
        for(let i = 0; i < lines.length; i++){
            doc.text(lines[i], i == 0 ? this.getX() : 1.15 * this.getX(), offset+internalOffset);
            internalOffset += this.lineOffset;
        }

        return this.getOffset() + (lines.length*this.lineOffset);
    }

    /**
     * sets the text color appropiate for the type
     */
    setStyle(doc) {
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(this.fontSize);
        doc.setFont("Times", "bold");
    }

    /**
     * returns the correct offset for this pdfContent
     * object
     */
    getOffset() {
        return 0.2;
    }

    getX(){
        return 2;
    }
}