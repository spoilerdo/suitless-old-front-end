/**
 * pdfContent contains the class that initializes a
 * pdfContent instance.
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 12-03-2019
 */

 import { pdfContent } from "./PdfContent"
import { pdfContentEnum } from "./PdfContentEnum";

export class pdfContentTitle extends pdfContent {

    constructor(data){
        super();
        this.type = pdfContentEnum.title;
        this.data = data;
    }

    /**
     * sets the text color appropriate for the type.
     */
    setStyle(doc) {
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(18);
        doc.setFont("Times","bold");
    }

    /**
     * returns the correct offset for this pdfContent
     * object
     */
    getOffset() {
        return 1;
    }
}

