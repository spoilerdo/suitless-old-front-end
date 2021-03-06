/**
 * the entrypoint for pdfreport.js.
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 12-03-2019
 */

import { getDefaultPdfOptions } from "./PdfOptions"
import * as pdfContent from "./PdfContentInitializer";
import { pdfModuleTitle } from "./PdfModule/PdfModuleTitle"
import jsPDF from 'jspdf'
import { pdfModuleMultiChoice } from "./PdfModule/PdfModuleMultiChoice";
import { pdfModuleQuestion } from "./PdfModule/PdfModuleQuestion";
import { pdfModuleIndex } from "./PdfModule/PdfModuleIndex";
import { pdfContentLogo } from "./PdfContent/PdfContentLogo";
import { ImplicationEnum } from "../../flowchartEditor/src/ImplicationEnum";


const pdfReporter = {
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

    let borderOffset = 2;
    let offset = borderOffset;

    pdfContents.forEach(pdfModule => {
        let testdoc = new jsPDF(pdfOptions);

        let height = 0;
        pdfModule.getContent().forEach(pdfContent => {
            height += pdfContent.addToDoc(testdoc, offset);
        })
        if (offset + height > doc.internal.pageSize.height - borderOffset) {
            doc.addPage();
            offset = borderOffset;
        }

        pdfModule.getContent().forEach(pdfContent => {
            offset += pdfContent.addToDoc(doc, offset);
            if(offset <= 0){ //This means that we have been send to a newpage.
                offset = borderOffset;
            }
        })
    });

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
    let pdfQuestions = [];
    for (let i = 0; i < answers.length; i++) {
        //check if the question to be printed is multi or single choice
        let currentAnswer = answers[i];

        if (Array.isArray(currentAnswer)) {
            //Multiple Choice
            pdfQuestions.push(new pdfModuleMultiChoice(
                currentAnswer[0].questionValue,
                currentAnswer,
                fillImplications(currentAnswer)
            ));
        } else if (currentAnswer.answerValue != null) {
            //single choice answer
            pdfQuestions.push(new pdfModuleQuestion(
                answers[i].questionValue,
                answers[i].answerValue,
                fillImplications(Array.of(answers[i]))
            ));
        }
    }

    let finalPdfContents = [];
    finalPdfContents.push(new pdfModuleTitle("Startupseindhoven"));
    finalPdfContents.push(new pdfModuleIndex(pdfQuestions));
    finalPdfContents = finalPdfContents.concat(pdfQuestions);

    return finalPdfContents;
}

/**
 * This will make titles for every implication that will be given
 * @param {object} flows of a survey
 */
function fillImplications(flows) {
    let implicationContents = [];
    flows.forEach(flow => {
        if (flow.implications) {
            flow.implications.implicationsObject.forEach(implication => {
                switch (implication.implicationLevel) {
                    case ImplicationEnum[1]:
                        implicationContents.push(pdfContent.PdfContentHighRisk(implication.implication));
                        break;
                    case ImplicationEnum[2]:
                        implicationContents.push(pdfContent.PdfContentHighPriority(implication.implication));
                        break;
                    case ImplicationEnum[3]:
                        implicationContents.push(pdfContent.PdfContentHighPriorityDIY(implication.implication));
                        break;
                    case ImplicationEnum[4]:
                        implicationContents.push(pdfContent.PdfContentBackgroundInformation(implication.implication));
                        break;
                    case ImplicationEnum[5]:
                        implicationContents.push(pdfContent.PdfContentAssumption(implication.implication));
                        break;
                    default:
                        implicationContents.push(pdfContent.PdfContentImplication(implication.implication));
                        break;
                }
                implicationContents.push(pdfContent.PdfContentWhitespace());
            })
        }
    });

    return implicationContents;
}