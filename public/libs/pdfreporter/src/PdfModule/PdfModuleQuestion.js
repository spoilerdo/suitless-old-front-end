/**
 * the module base class for the pdfReporter
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 19-08-2019
 */

import { pdfModule } from "./PdfModule";
import { pdfContentQuestion } from "../PdfContent/PdfContentQuestion";
import { pdfContentReply } from "../PdfContent/PdfContentReply";

export class pdfModuleQuestion extends pdfModule {

    constructor(question, reply, implications) {
        super();
        this.Content = [
            new pdfContentQuestion(question),
            new pdfContentReply(reply)
        ];
        this.Content = this.Content.concat(implications);
    }

}