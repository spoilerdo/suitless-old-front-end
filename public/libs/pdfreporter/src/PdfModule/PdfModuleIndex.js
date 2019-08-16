/**
 * the module base class for the pdfReporter
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 19-08-2019
 */

import { pdfModule } from "./PdfModule";
import { pdfContentIndexItem } from "../PdfContent/PdfContentIndexItem";
import { pdfContentNewPage } from "../PdfContent/PdfContentNewPage";
import { pdfContentWhitespace } from "../PdfContent/PdfContentWhitespace";
import { pdfContentTitle } from "../PdfContent/PdfContentTitle";

export class pdfModuleIndex extends pdfModule {

    constructor(modules) {
        super("Table of Contents");
        this.Content = [
            new pdfContentTitle("Table of Contents")
        ];
        this.getIndexItems(modules);
        this.Content.push(new pdfContentNewPage());
    }

    /**
     * adds an entry for each pdfModule
     * @param {pdfModules} modules 
     */
    getIndexItems(modules){
        for(let i = 0; i < modules.length; i++){
            this.Content.push(
                new pdfContentIndexItem(`${modules[i].name}`)
            )
        }
    }

}