import pdfReporter from '../../../public/libs/pdfreporter/src/Main';

import { pdfContentQuestion } from "../../../public/libs/pdfreporter/src/PdfContent/PdfContentQuestion"
import { pdfContentReply } from "../../../public/libs/pdfreporter/src/PdfContent/PdfContentReply"
import { pdfContentResult } from "../../../public/libs/pdfreporter/src/PdfContent/PdfContentResult"
import { pdfContentTitle } from "../../../public/libs/pdfreporter/src/PdfContent/PdfContentTitle"
import { pdfContentWarning } from "../../../public/libs/pdfreporter/src/PdfContent/PdfContentWarning"
import { pdfContentInfo } from "../../../public/libs/pdfreporter/src/PdfContent/PdfContentInfo"
import { pdfContentSuccess } from "../../../public/libs/pdfreporter/src/PdfContent/PdfContentSuccess"
import { pdfContentSub } from "../../../public/libs/pdfreporter/src/PdfContent/PdfContentSub"
import { pdfContentWhitespace } from "../../../public/libs/pdfreporter/src/PdfContent/PdfContentWhitespace"

/**
 * PdfReporter plugin used to create PDF's and offer them as a download.
 * @memberof plugin
 */
export default {
    install(Vue){ 

        Vue.mixin({
            methods: {
                /**
                 * Creates a new PDF
                 * @memberof plugin.pdfreporter
                 */
                generatePdf(pdfOptions, pdfContents, pdfName) {
                    pdfReporter.generatePDF(pdfOptions,pdfContents, pdfName);
                },
                /**
                 * Creates a demo PDF
                 * @memberof plugin.pdfreporter
                 */
                generateDemoPDF() {
                    pdfReporter.generateDemoPDF();
                },
                /**
                 * Creates a new PDF Content object
                 * @class
                 * @memberof plugin.pdfreporter
                 */
                pdfContentQuestion(content) {
                    return new pdfContentQuestion(content);
                },
                /**
                 * Creates a new PDF Content object
                 * @class
                 * @memberof plugin.pdfreporter
                 */
                pdfContentReply(content){
                    return new pdfContentReply(content);
                },
                /**
                 * Creates a new PDF Content object
                 * @class
                 * @memberof plugin.pdfreporter
                 */
                pdfContentResult(content){
                    return new pdfContentResult(content);
                },
                /**
                 * Creates a new PDF Content object
                 * @class
                 * @memberof plugin.pdfreporter
                 */
                pdfContentTitle(content){
                    return new pdfContentTitle(content);
                },
                /**
                 * Creates a new PDF Content object
                 * @class
                 * @memberof plugin.pdfreporter
                 */
                pdfContentWarning(content){
                    return new pdfContentWarning(content);
                },
                /**
                 * Creates a new PDF Content object
                 * @class
                 * @memberof plugin.pdfreporter
                 */
                pdfContentInfo(content) {
                    return new pdfContentInfo(content);
                },
                /**
                 * Creates a new PDF Content object
                 * @class
                 * @memberof plugin.pdfreporter
                 */
                pdfContentSuccess(content) {
                    return new pdfContentSuccess(content);
                },
                /**
                 * Creates a new PDF Content object
                 * @class
                 * @memberof plugin.pdfreporter
                 */
                pdfContentSub(content) {
                    return new pdfContentSub(content);
                },
                /**
                 * Creates a new PDF Content object
                 * @class
                 * @memberof plugin.pdfreporter
                 */
                pdfContentWhitespace(){
                    return new pdfContentWhitespace();
                }
            }
        })
    }
}