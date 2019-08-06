
import { pdfContent } from "./PdfContent";

export class pdfContentListItem extends pdfContent {

    constructor(data){
        super();
        this.data = data;
    }

    /**
     * sets the text color appropiate for the type
     */
    setStyle(doc) {
        doc.setTextColor(0, 0, 0);
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

    getX(){
        return 2;
    }
}