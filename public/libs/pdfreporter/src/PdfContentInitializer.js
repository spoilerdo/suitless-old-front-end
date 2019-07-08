import { pdfContentQuestion } from "./PdfContent/PdfContentQuestion"
import { pdfContentReply } from "./PdfContent/PdfContentReply"
import { pdfContentResult } from "./PdfContent/PdfContentResult"
import { pdfContentTitle } from "./PdfContent/PdfContentTitle"
import { pdfContentWarning } from "./PdfContent/PdfContentWarning"
import { pdfContentInfo } from "./PdfContent/PdfContentInfo"
import { pdfContentSuccess } from "./PdfContent/PdfContentSuccess"
import { pdfContentError } from "./PdfContent/PdfContentError";
import { pdfContentSub } from "./PdfContent/PdfContentSub"
import { pdfContentWhitespace } from "./PdfContent/PdfContentWhitespace"


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

export let PdfContentWarning = function(content) {
    return new pdfContentWarning(content);
}

export let PdfContentInfo = function(content) {
    return new pdfContentInfo(content);
}

export let PdfContentSuccess = function(content) {
    return new pdfContentSuccess(content);
}

export let PdfContentError = function(content) {
    return new pdfContentError(content);
}

export let PdfContentSub = function(content) {
    return new pdfContentSub(content);
}

export let PdfContentWhitespace = function() {
    return new pdfContentWhitespace();
}