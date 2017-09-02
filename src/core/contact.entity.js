import isContactField from './is-contact-field';
import isGroup from './is-group';
import isIntegerId from './is-integer-id';
import isNil from 'lodash.isnil';
import isString from 'lodash.isstring';

/**
 * This class represents a contact.
 * 
 * @export
 * @class Contact
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class Contact {
    constructor(id, firstName, lastName, contactFields = [], groups = []) {
        // If the ID is not a nil value and not an integer ID, we have to throw an exception.
        if (!isNil(id) && !isIntegerId(id)) {
            throw new Error('The ID must be a nil (null, undefined) or an integer, which is greater than zero!');
        }
        // If the first name is invalid, it will throw an exception.
        if (!isString(firstName)) {
            throw new Error('The first name must be a string!');
        }
        // If the last name is invalid, it will throw an exception.
        if (!isString(lastName)) {
            throw new Error('The last name must be a string!');
        }
        // If the contact fields array is invalid, we have to throw an exception.
        if (!Array.isArray(contactFields)) {
            throw new Error('The contact fields argument must be an array!');
        }
        // If one of the contact fields is not a ContactField instance, we have to throw an exception.
        if (0 !== contactFields.length) {
            contactFields.forEach((contactField) => {
                if (!isContactField(contactField)) {
                    throw new Error('All contact field items must be an instance of ContactField!');
                }
            });
        }
        // If the groups array is invalid, we have to throw an exception.
        if (!Array.isArray(groups)) {
            throw new Error('The groups argument must be an array!');
        }
        // If one of the group items is not a Group instance, we have to throw an exception.
        if (0 !== groups.length) {
            groups.forEach((group) => {
                if (!isGroup(group)) {
                    throw new Error('All group items must be an instance of Group!');
                }
            });
        }
        // Setting fields.
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.contactFields = contactFields;
        this.groups = groups;
    }
}
