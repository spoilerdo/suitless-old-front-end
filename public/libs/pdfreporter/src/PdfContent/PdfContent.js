/**
 * pdfContent contains the class that initializes a
 * pdfContent instance.
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 12-03-2019
 */

import { pdfContentEnum } from "./PdfContentEnum";
import { runInThisContext } from "vm";

/**
 * pdfContent class which the pdf Generator can use.
 */
export class pdfContent {

    addToDoc(doc, offset) {
        let lineOffset = 0.5;
        let pageWidth = 19; //TODO MAKE THIS DYNAMIC.

        this.setStyle(doc);
        var lines = doc.splitTextToSize(this.data, pageWidth);
        
        let internalOffset = 0;
        lines.forEach(line => {
            doc.text(line, 1, offset+internalOffset);
            internalOffset += lineOffset;
        });

        return this.getOffset() + (lines.length*lineOffset);
    }

}
