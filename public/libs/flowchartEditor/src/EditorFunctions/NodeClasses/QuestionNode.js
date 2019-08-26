/**
 * Every Node has certain data values stored in a key, value pair array.
 * In order to strucerize these data arrays every Node has a class contianing all the data options
 * This class contains all the data a question node can contain.
 * @author Martijn Dormans
 * @version 1.0
 * @since 28-08-2019
 */
export class QuestionNode {
    constructor(question, reasons) {
        this.question = question;
        this.reasons = reasons;
    }

    getData() {
        let data = [
            {
                "key": "question",
                "value": this.question
            }
        ];

        this.reasons.forEach(reason => {
            data.push({"key": "reason", "value": reason.reason});
            data.push({"key": "reasonType", "value": reason.type});
        })

        return data;
    }
}