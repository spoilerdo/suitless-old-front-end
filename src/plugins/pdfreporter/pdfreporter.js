import pdfReporter from '../../../public/libs/pdfreporter/src/Main';

/**
 * PdfReporter plugin used to create PDF's and offer them as a download.
 * @memberof plugin
 */
export default {
    install(Vue){ 

        Vue.mixin({
            methods: {
                /**
                 * Creates a demo PDF
                 * @memberof plugin.pdfreporter
                 */
                generateDemoPDF() {
                    pdfReporter.generateDemoPDF();
                },
                printPDF(pdfOptions, answers){
                    pdfReporter.printPDF(pdfOptions, answers);
                }
            }
        })
    }
}