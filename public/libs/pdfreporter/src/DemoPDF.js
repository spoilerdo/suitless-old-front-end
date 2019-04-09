/**
 * responsible for the demoPDF Content.
 * @author Julius Ammerlaan
 * @version 1.0
 * @since 12-03-2019
 */

import { pdfContentQuestion } from "./PdfContent/PdfContentQuestion"
import { pdfContentReply } from "./PdfContent/PdfContentReply"
import { pdfContentResult } from "./PdfContent/PdfContentResult"
import { pdfContentTitle } from "./PdfContent/PdfContentTitle"
import { pdfContentWarning } from "./PdfContent/PdfContentWarning"

import { pdfContent } from "./PdfContent/PdfContent"
import { pdfContentEnum } from "./PdfContent/PdfContentEnum"

 /**
  * returns the demoPDF Contents.
  */
export function getDemoPdfContents() {
    let pdfContents = [];

    var today = new Date();
    pdfContents.push(new pdfContentTitle(
        "ehvLINC REPORT  " + today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate()
    ));

    pdfContents.push(new pdfContentQuestion(
        "potje pool? d askd daldj adkald sndkj jksaj da sasljdalsdjas askljdal aldjas asnsaijd aid adjlasd ajdlasjd y ddh flkfjf fjkfdiufd jdduduasdj  f fsdfs fs fdf ssfskjfh jakf" +
        "dadah dj aldjahdka laldja jdakd9d wokdjwoijdjklsadjiwojijowia djaods dlaksdjaldjowjda lskldjawiduasldjs aldwoidljsakdjaklwkjdowa9 owid daslkdjaslkdjiowadjawdljwalj"
    ));
    pdfContents.push(new pdfContentReply(
        "Tsja, zometeen, in de pauze dahdsa a dadadakdhad kasaldasdjlakjd salj daljdaldasd asdja jsldja skdjas sljda asljjadiw skdjaskdj awidsa djksadjwoidsa jdjlkadj asldj adlad " +
        "dakhdakjdalkha a ljdal;sadldjasdn skdas;dald aśdlaldasldasdka ias ljdaj ahdk asjda kd ahkadjakduajadhkdsa kfsfjdsfs,djf ,hgsfh fsdfjsd;fks lfjsdfmsdfakfam ,as sa ha "
    ));
    pdfContents.push(new pdfContentResult(
        "Een potje pool moet altijd snel! dsada da dsadsad asldj asjdkha amjdamasdamhasjadahdadadadjaaas a da dadagjdajgdahsdajk jhdadjakdahj jkdajgdada adadagd damdha d akjd dadgad " + 
        "da h kdakduaskd d hdald kd   dadhkad akda dakd ,dkda dsad adask das a djdjadajdajdklas ahdasld asjda a jdasljd ahdwaio ad ha "
    ));
    pdfContents.push(new pdfContentWarning(
        "Pas op! Als je te lang geen potje pool speelt, wordt Nick verdrietig.. en daarom ga ik nu een hele lange regel typen om multi-line te testen... dasdasdasdsadhsadkada sadasdadad" +
        "ddas sadsa dasd akd aasjdasl adksakd adka ,asd k das kdsd sad sakldas      jgadashdkasjd kadash das dhkasd ashk ad hasud ah jasjd ahd sa das as jg"
    ));

    pdfContents.push(new pdfContentQuestion(
        "is het al pauze?"
    ));
    pdfContents.push(new pdfContentReply(
        "bijna, nog niet hemelaal"
    ));
    pdfContents.push(new pdfContentResult(
        "Dan houden we eerder pauze"
    ));

    return pdfContents;
}