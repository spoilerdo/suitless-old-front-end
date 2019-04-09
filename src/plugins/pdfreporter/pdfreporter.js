import pdfReporter from '../../../public/libs/pdfreporter/src/Main';

export default {
    install(Vue){ 
        Vue.mixin({
            methods: {
                generatePdf(pdfOptions, pdfContents, pdfName) {
                    pdfReporter.generatePdf(pdfOptions,pdfContents, pdfName);
                },
                generateDemoPDF() {
                    pdfReporter.generateDemoPDF();
                }
            }
        })
    }
}