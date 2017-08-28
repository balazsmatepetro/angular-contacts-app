/**
 * This class represents a group.
 * 
 * @export
 * @class Group
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class Group {
    /**
     * Creates an instance of Group.
     * 
     * @param {Number|undefined} id The ID of group.
     * @param {String} name The name of group.
     * @memberof Group
     */
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
