/**
 * This class represents a contact group.
 * 
 * @export
 * @class ContactGroup
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class ContactGroup {
    /**
     * Creates an instance of ContactGroup.
     * 
     * @param {String} name The name of contact group.
     * @param {Array.<ContactPresenter>} contacts The collection of ContactPresenter instances. 
     * @memberof ContactGroup
     */
    constructor(name, contacts) {
        this.name = name;
        this.contacts = contacts;
    }
}
