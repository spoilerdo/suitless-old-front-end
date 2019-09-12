/**
 * Every Node has certain data values stored in a key, value pair array.
 * In order to strucerize these data arrays every Node has a class contianing all the data options
 * This class contains all the data a notification node can contain.
 * @author Martijn Dormans
 * @version 1.0
 * @since 28-08-2019
 */
export class NotificationNode {
    constructor(name, title){
        this.name = name;
        this.title = title;
    }

    getData() {
        return [
            {
                "key": "notify",
                "value": this.name
            },
            {
                "key": "title",
                "value": this.title
            }
        ]
    }
}