/**
 * pdfContent contains the class that initializes a
 * pdfContent instance.
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 12-03-2019
 */

 import { pdfContent } from "./PdfContent"
import { pdfContentEnum } from "./PdfContentEnum";

export class pdfContentWarning extends pdfContent {

    constructor(data){
        super();
        this.type = pdfContentEnum.warning;
        this.data = data;
    }

    /**
     * sets the text color appropriate for the type.
     */
    setStyle(doc) {
        doc.setTextColor(250, 51, 51);
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

