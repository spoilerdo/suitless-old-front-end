/**
 * the module base class for the pdfReporter
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 19-08-2019
 */

import { pdfModule } from "./PdfModule";
import { PdfContentTitle } from "../PdfContentInitializer";

export class pdfModuleTitle extends pdfModule {

    constructor(title) {
        super();
        this.Content = [
            new PdfContentTitle(`${title} - ${this.formatDate()}`)
        ];
    }

    formatDate() {
        return new Date().toLocaleString();
    }

}