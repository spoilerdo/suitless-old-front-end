import { pdfContentQuestion } from "./PdfContent/PdfContentQuestion"
import { pdfContentReply } from "./PdfContent/PdfContentReply"
import { pdfContentResult } from "./PdfContent/PdfContentResult"
import { pdfContentTitle } from "./PdfContent/PdfContentTitle"
import { pdfContentImplication } from "./PdfContent/PdfContentImplication"
import { pdfContentHighPriority } from "./PdfContent/PdfContentHighPriority"
import { pdfContentBackgroundInformation } from "./PdfContent/PdfContentBackgroundInformation"
import { pdfContentHighPriorityDIY } from "./PdfContent/PdfContentHighPriorityDIY"
import { pdfContentHighRisk } from "./PdfContent/PdfContentHighRisk";
import { pdfContentAssumption } from "./PdfContent/PdfContentAssumption"
import { pdfContentWhitespace } from "./PdfContent/PdfContentWhitespace"
import { pdfContentListItem } from "./PdfContent/PdfContentListItem";


export let PdfContentQuestion = function(content) {
    return new pdfContentQuestion(content);
}

export let PdfContentReply = function(content) {
    return new pdfContentReply(content);
}

export let PdfContentResult = function(content) {
    return new pdfContentResult(content);
}

export let PdfContentTitle = function(content) {
    return new pdfContentTitle(content);
}

export let PdfContentHighPriority = function(content) {
    return new pdfContentHighPriority(content);
}

export let PdfContentBackgroundInformation = function(content) {
    return new pdfContentBackgroundInformation(content);
}

export let PdfContentHighPriorityDIY = function(content) {
    return new pdfContentHighPriorityDIY(content);
}

export let PdfContentHighRisk = function(content) {
    return new pdfContentHighRisk(content);
}

export let PdfContentAssumption = function(content) {
    return new pdfContentAssumption(content);
}

export let PdfContentImplication = function(content) {
    return new pdfContentImplication(content);
}

export let PdfContentWhitespace = function() {
    return new pdfContentWhitespace();
}

export let PdfContentListItem = function(content) {
    return new pdfContentListItem(content);
}