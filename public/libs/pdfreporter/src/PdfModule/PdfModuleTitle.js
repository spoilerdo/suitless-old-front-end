/**
 * the module base class for the pdfReporter
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 19-08-2019
 */

import { pdfModule } from "./PdfModule";
import { pdfContentLogo } from "../PdfContent/PdfContentLogo";
import { pdfContentTitle } from "../PdfContent/PdfContentTitle";
import { pdfContentNewPage } from "../PdfContent/PdfContentNewPage";

export class pdfModuleTitle extends pdfModule {

    constructor(title) {
        super("Title");
        this.Content = [
            new pdfContentTitle(`${title} - ${this.formatDate()}`),
            new pdfContentLogo(),
            new pdfContentNewPage()
        ];
    }

    formatDate() {
        return new Date().toLocaleString();
    }

}