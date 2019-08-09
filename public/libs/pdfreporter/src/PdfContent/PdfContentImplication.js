import { pdfContent } from "./PdfContent";

/**
 * pdfContent contains the class that initializes a pdfContent instance.
 * This is a base class
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 12-03-2019
 */


/**
 * pdfContent class which the pdf Generator can use.
 */
export class pdfContentImplication extends pdfContent {

    constructor(data) {
        super()
        this.data = data;
        this.implicationLevel = "Unknown";
    }

    addToDoc(doc, offset) {
        this.setDefaultStyle(doc)

        let internalOffset = 0;
        doc.text(`${this.implicationLevel}: `, this.getX(), offset+internalOffset);
        internalOffset += this.lineOffset;

        this.setStyle(doc);

        var lines = doc.splitTextToSize(this.data, this.pageWidth);
        
        lines.forEach(line => {
            doc.text(line, this.getX(), offset+internalOffset);
            internalOffset += this.lineOffset;
        });

        return this.getOffset() + (lines.length*this.lineOffset);
    }

    /**
     * sets the text color appropriate for the type.
     */
    setStyle(doc) {
        doc.setTextColor(0, 0, 0); //Black
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
