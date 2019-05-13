import pdfReporter from '../../../public/libs/pdfreporter/src/Main';

import { pdfContentQuestion } from "../../../public/libs/pdfreporter/src/PdfContent/PdfContentQuestion"
import { pdfContentReply } from "../../../public/libs/pdfreporter/src/PdfContent/PdfContentReply"
import { pdfContentResult } from "../../../public/libs/pdfreporter/src/PdfContent/PdfContentResult"
import { pdfContentTitle } from "../../../public/libs/pdfreporter/src/PdfContent/PdfContentTitle"
import { pdfContentWarning } from "../../../public/libs/pdfreporter/src/PdfContent/PdfContentWarning"

export default {
    install(Vue){ 

        Vue.mixin({
            methods: {
                generatePdf(pdfOptions, pdfContents, pdfName) {
                    pdfReporter.generatePDF(pdfOptions,pdfContents, pdfName);
                },
                generateDemoPDF() {
                    pdfReporter.generateDemoPDF();
                },
                pdfContentQuestion(content) {
                    return new pdfContentQuestion(content);
                },
                pdfContentReply(content){
                    return new pdfContentReply(content);
                },
                pdfContentResult(content){
                    return new pdfContentResult(content);
                },
                pdfContentTitle(content){
                    return new pdfContentTitle(content);
                },
                pdfContentWarning(content){
                    return new pdfContentWarning(content);
                }
            }
        })
    }
}