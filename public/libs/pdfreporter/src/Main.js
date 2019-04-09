/**
 * the entrypoint for pdfreport.js.
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 12-03-2019
 */

import { getDefaultPdfOptions } from "./PdfOptions"
import { pdfContent } from "./PdfContent/PdfContent"
import { getDemoPdfContents } from "./DemoPDF"
import jsPDF from 'jspdf'


const pdfReporter = {
    generateDemoPDF() {
        let pdfOptions = getDefaultPdfOptions();
        let pdfContents = getDemoPdfContents();

        this.generatePDF(pdfOptions, pdfContents, "report")
    },

    /**
     * Generates a PDF, and offers the user to save it.
     * @param {pdfOptions} pdfOptions 
     * @param {pdfContent[]} pdfContents 
     * @param {string} pdfName 
     */
    generatePDF(pdfOptions, pdfContents, pdfName) {
        let doc = new jsPDF(pdfOptions);

        let offset = 1;
        for(let i = 0; i < pdfContents.length; i++){
            offset += pdfContents[i].addToDoc(doc, offset);
        }

        doc.save(pdfName + ".pdf");
    }
}

export default pdfReporter;