/**
 * This class represents a contact.
 * 
 * @export
 * @class Contact
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class Contact {
    /**
     * Creates an instance of Contact.
     * 
     * @param {Number|undefined} The id of contact entry.
     * @param {String} firstName The first name of person.
     * @param {String} lastName The last name of person.
     * @param {Array.<Group>} The collection of groups which the person belongs to.
     * @memberof Contact
     */
    constructor(id, firstName, lastName, groups) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.groups = groups;
    }
}
