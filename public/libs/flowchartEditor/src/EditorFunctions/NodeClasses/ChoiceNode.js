/**
 * Every Node has certain data values stored in a key, value pair array.
 * In order to strucerize these data arrays every Node has a class contianing all the data options
 * This class contains all the data a choice node can contain.
 * @author Martijn Dormans
 * @version 1.0
 * @since 28-08-2019
 */
export class ChoiceNode {
    constructor(name, imageName){
        this.name = name;
        this.imageName = imageName;
    }

    getData() {
        let data = [];

        if(this.name) {
            data.push({
                "key": "choice",
                "value": this.name
            })
        }

        if(this.imageName) {
            data.push({
                "key": "imageName",
                "value": this.imageName
            })
        }

        return data;
    }
}