/**
 * the module base class for the pdfReporter
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 19-08-2019
 */

export class pdfModule {

    constructor(name) {
        this.Content = [];
        this.name = name;
    }

    getContent() {
        return this.Content;
    }

}