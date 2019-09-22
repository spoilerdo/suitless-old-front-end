import { QuestionNode } from "./QuestionNode";

/**
 * Every Node has certain data values stored in a key, value pair array.
 * In order to strucerize these data arrays every Node has a class contianing all the data options
 * This class contains all the data a multi choice node can contain.
 * @author Martijn Dormans
 * @version 1.0
 * @since 28-08-2019
 */
export class MultiChoiceNode extends QuestionNode {
    constructor(question, reasons, loopsubQuestions, choices) {
        super(question, reasons);
        this.loopsubQuestions = loopsubQuestions;
        if(choices) {
            this.choices = choices;
        }
    }

    addChoices(choices) {
        this.choices = choices;
    }

    getData() {
        let data = super.getData();
        data.push({
            "key": "loopsubQuestions",
            "value": this.loopsubQuestions
        })
        if (this.choices) {
            this.choices.forEach(choice => {
                data.push({
                    "key": "choice",
                    "value": choice
                });
            });
        }
        return data;
    }
}