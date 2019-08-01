/**
 * the entrypoint for pdfreport.js.
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 12-03-2019
 */

import { getDefaultPdfOptions } from "./PdfOptions"
import { getDemoPdfContents } from "./DemoPDF"
import { PdfContentQuestion, PdfContentReply, PdfContentResult, PdfContentTitle, PdfContentWarning, PdfContentInfo, PdfContentSuccess, PdfContentError, PdfContentSub, PdfContentWhitespace, PdfContentListItem } from "./PdfContentInitializer";
import jsPDF from 'jspdf'


const pdfReporter = {
    generateDemoPDF() {
        let pdfOptions = getDefaultPdfOptions();
        let pdfContents = getDemoPdfContents();

        generatePDF(pdfOptions, pdfContents, "report")
    },

    /**
     * This is the starting point of generating a PDF.
     * This will call the method that formats the answers into PDF content and sets the name of the PDF.
     * After that it will start to generate the PDF by calling the generatePDF method.
     * @param {pdfOptions} pdfOptions
     * @param {object} answers 
     */
    printPDF(pdfOptions, answers) {
        let pdfContents = getPDFContent(answers);
        let name = "report " + getFormattedDate();

        generatePDF(pdfOptions, pdfContents, name);
    }
}

export default pdfReporter;

/**
 * Generates a PDF, and offers the user to save it.
 * @param {pdfOptions} pdfOptions 
 * @param {pdfContent[]} pdfContents 
 * @param {string} pdfName 
 */
function generatePDF(pdfOptions, pdfContents, pdfName) {
    let doc = new jsPDF(pdfOptions);

    let startOffset = 2;
    let offset = startOffset;

    for (let i = 0; i < pdfContents.length; i++) {
        if (offset > doc.internal.pageSize.height - 2) {
            doc.addPage();
            offset = startOffset;
        }
        offset += pdfContents[i].addToDoc(doc, offset);
    }

    doc.save(pdfName + ".pdf");
}

/**
 * Get the current date and return it.
 */
function getFormattedDate() {
    var myDate = new Date();
    var month = ("0" + (myDate.getMonth() + 1)).slice(-2);
    var date = ("0" + myDate.getDate()).slice(-2);
    var year = myDate.getFullYear();
    return year + "/" + month + "/" + date;
}

/**
 * Converts the answers of a survey to PDF content
 * @param {object} answers all the answers of a survey
 */
function getPDFContent(answers) {
    let pdfContents = [];

    var today = new Date();
    pdfContents.push(
        PdfContentTitle(
            "ehvLINC REPORT  " +
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate()
        )
    );

    for (let i = 0; i < answers.length; i++) {
        //check if the question to be printed is multi or single choice
        let currentAnswer = answers[i];

        if (Array.isArray(currentAnswer)) {
            //print relevant question based on first answer given

            pdfContents.push(PdfContentQuestion(currentAnswer[0].questionValue));

            //multi choice answer
            currentAnswer.forEach(ans => {
                //add all answers as a list to the PDF
                pdfContents.push(PdfContentListItem("- " + ans.answerValue));
                pdfContents.push(PdfContentWhitespace());
            });

            let implications = fillImplications(currentAnswer);

            implications.forEach(impl => {
                pdfContents.push(impl);
            });

        } else if (currentAnswer.answerValue != null) {
            //single choice answer
            pdfContents.push(PdfContentQuestion(answers[i].questionValue));
            pdfContents.push(PdfContentReply(answers[i].answerValue));
            let implications = fillImplications(Array.of(answers[i]));
            implications.forEach(impl => {
                pdfContents.push(impl);
            });
        }
    }
    return pdfContents;
}

/**
 * This will make titles for every implication that will be given
 * @param {object} flows of a survey
 */
function fillImplications(flows) {
    let implicationContents = [];
    flows.forEach(flow => {
        if (flow.implications) {
            flow.implications.forEach(implication => {
                switch (implication.implicationLevel) {
                    case "success":
                        implicationContents.push(PdfContentSuccess("Success : "));
                        implicationContents.push(PdfContentSub(implication.implication));
                        implicationContents.push(PdfContentWhitespace());
                        break;
                    case "warning":
                        implicationContents.push(PdfContentWarning("Warning : "));
                        implicationContents.push(PdfContentSub(implication.implication));
                        implicationContents.push(PdfContentWhitespace());
                        break;
                    case "info":
                        implicationContents.push(PdfContentInfo("Info : "));
                        implicationContents.push(PdfContentSub(implication.implication));
                        implicationContents.push(PdfContentWhitespace());
                        break;
                    case "primary":
                        implicationContents.push(PdfContentError("Error : "))
                        implicationContents.push(PdfContentSub(implication.implication));
                        implicationContents.push(PdfContentWhitespace());
                        break;
                    case "default":
                        implicationContents.push(PdfContentSub(implication.implication));
                        implicationContents.push(PdfContentWhitespace());
                    default:
                        break;
                }
            })
        }
    });

    return implicationContents;
}