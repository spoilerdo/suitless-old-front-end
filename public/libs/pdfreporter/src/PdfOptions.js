/**
 * Contains all default pdfOptions, and pdfOptions
 * generators if they are needed.
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 12-03-2019
 */


/**
 * returns the default pdfOptions which will make jsPDF 
 * generate a blank A4 in portrait.
 */
export function getDefaultPdfOptions() {
    return {
        orientation: 'portrait',
        unit: 'cm',
    }
}
