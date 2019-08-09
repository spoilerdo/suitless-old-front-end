/**
 * the module base class for the pdfReporter
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 19-08-2019
 */

import { pdfModule } from "./PdfModule";
import { pdfContentQuestion } from "../PdfContent/PdfContentQuestion";
import { pdfContentListItem } from "../PdfContent/PdfContentListItem";

export class pdfModuleMultiChoice extends pdfModule {

    constructor(question, answer, implications) {
        super();
        this.Content = [
            new pdfContentQuestion(question),
        ];
        answer.forEach(ans => {
            //add all answers as a list to the PDF
            this.Content.push(new pdfContentListItem("- " + ans.answerValue));
        });
        this.Content = this.Content.concat(implications);
    }

}