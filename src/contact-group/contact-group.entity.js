import isContact from '../core/is-contact';
import isContactPresenter from '../core/is-contact-presenter';
import isString from 'lodash.isstring';

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
     * @param {Array.<Contact|ContactPresenter>} [contacts=[]] The collection of Contact or ContactPresenter instances.
     * @throws {Error} Thrown when invalid argument given.
     * @memberof ContactGroup
     */
    constructor(name, contacts = []) {
        // If the given name is not a string, we have to throw an exception.
        if (!isString(name)) {
            throw new Error('The name must be a string!');
        }
        // If the given name is an empty string, we have to throw an exception.
        if (0 === name.length) {
            throw new Error('The name cannot be an empty string!');
        }
        // If the given contacts argument is not an array, we have to throw an exception.
        if (!Array.isArray(contacts)) {
            throw new Error('The "contacts" argument must be an array!');
        }
        // If the given contacts argument is not an empty array, we have to loop throgh the items...
        if (0 !== contacts.length) {
            contacts.forEach((contact) => {
                // ...and thrown an exception if one of them is not a Contact or ContactPresenter instance.
                if (!isContact(contact) && !isContactPresenter(contact)) {
                    throw new Error('All items must an instance of Contact or ContactPresenter!');
                }
            });
        }
        // Setting fields.
        this.name = name;
        this.contacts = contacts;
    }
}
