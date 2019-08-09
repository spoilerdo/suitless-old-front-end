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
export class pdfContent {

    constructor() {
        this.lineOffset = 0.5;
        this.pageWidth = 19; //TODO MAKE THIS DYNAMIC.
    }

    addToDoc(doc, offset) {

        this.setStyle(doc);
        var lines = doc.splitTextToSize(this.data, this.pageWidth);
        
        let internalOffset = 0;
        lines.forEach(line => {
            doc.text(line, this.getX(), offset+internalOffset);
            internalOffset += this.lineOffset;
        });

        return this.getOffset() + (lines.length*this.lineOffset);
    }

    /**
     * sets the text color appropriate for the type.
     */
    setDefaultStyle(doc) {
        doc.setTextColor(0, 0, 0); //Black
        doc.setFontSize(11);
        doc.setFont("Times","normal");
    }

    getX(){
        return 1;
    }
}
