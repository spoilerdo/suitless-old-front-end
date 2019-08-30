/**
 * Every Node has certain data values stored in a key, value pair array.
 * In order to strucerize these data arrays every Node has a class contianing all the data options
 * This class contains all the data a module node can contain.
 * @author Martijn Dormans
 * @version 1.0
 * @since 28-08-2019
 */
export class EdgeNode{
    constructor(answer, imageName, implications) {
        this.answer = answer;
        this.imageName = imageName;
        this.implications = implications;
    }

    getData() {
        let data = []

        if(this.imageName) {
            data.push({
                "key": "imageName",
                "value": this.imageName
            });
        }

        if(this.answer) {
            data.push({
                "key": "answer",
                "value": this.answer
            });
        }

        this.implications.forEach(implication => {
            if(implication.implication){
                data.push({"key": "implication", "value": implication.implication});
                data.push({"key": "implicationLevel", "value": implication.implicationLevel});
            }
        });

        return data;
    }
}