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
        validateName(firstName, 'first name');
        // If the last name is invalid, it will throw an exception.
        validateName(lastName, 'last name');


        /*
        // If the contact fields array is invalid, we have to throw an exception.
        if (!Array.isArray(contactFields)) {
            throw new Error(`The contact fields argument must be an array!`);
        }
        // If one of the contact fields is not a ContactField instance, we have to throw an exception.
        if (0 !== contactFields.length) {
            contactFields.forEach((contactField) => {
                if (!isContactField(contactField)) {
                    throw new Error('All contact field items must be an instance of Contact Field!');
                }
            });
        }
        // If the groups array is invalid, we have to throw an exception.
        if (!Array.isArray(groups)) {
            throw new Error(`The groups argument must be an array!`);
        }
        // If one of the group items is not a Group instance, we have to throw an exception.
        if (0 !== groups.length) {
            groups.forEach((group) => {
                if (!isGroup(group)) {
                    throw new Error('All group items must be an instance of Group!');
                }
            });
        }
        */


        // Setting fields.
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.contactFields = contactFields;
        this.groups = groups;
    }

    addContactField(contactField) {
        // If the given argument is not a ContactField instance, we have to throw an exception.
        if (!isContactField(contactField)) {
            throw new Error('The given argument must be a ContactField instance!');
        }
        // Pushing contact field to the array.
        this.contactFields.push(contactField);
    }

    addGroup(group) {
        // If the given argument is not a Group instance, we have to throw an exception.
        if (!isGroup(group)) {
            throw new Error('The given argument must be a Group instance!');
        }
        // Pushing group to the array.
        this.groups.push(group);
    }

    removeContactField(contactField) {

    }

    removeGroup(group) {
        
    }
}

function validateName(value, label) {
    if (!isString(value)) {
        throw new Error(`The ${label} must be a string!`);
    }

    // if (0 === value.length) {
    //     throw new Error(`The ${label} cannot be an empty string!`);
    // }
}
