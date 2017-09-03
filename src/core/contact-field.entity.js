import * as Types from './contact-field.types';
import isString from 'lodash.isstring';

/**
 * This class represents a contact field.
 * 
 * @export
 * @class ContactField
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class ContactField {
    /**
     * Creates an instance of ContactField.
     * 
     * @param {String} label The label of contact field.
     * @param {String} type The type of contact field.
     * @param {String} value The value of contact field.
     * @memberof ContactField
     */
    constructor(label, type, value) {
        // If the label is not a string, we have to throw an exception.
        if (!isString(label)) {
            throw new Error('The label must be a string!');
        }
        // If the given type is not a valid type, we have to throw an exception.
        if (Types.CONTACT_FIELD_TYPE_EMAIL !== type && Types.CONTACT_FIELD_TYPE_PHONE_NUMBER !== type) {
            throw new Error('Invalid type given!');
        }
        // If the given value is not a string, we have to throw an exception.
        if (!isString(value)) {
            throw new Error('The value must be a string!');
        }
        // Setting fields.
        this.label = label;
        this.type = type;
        this.value = value;
    }

    /**
     * Returns true if the contact field's type is email, else false.
     * 
     * @returns {Boolean}
     * @memberof ContactField
     */
    isEmail() {
        return Types.CONTACT_FIELD_TYPE_EMAIL === this.type;
    }

    /**
     * Returns true if the contact field's type is phone number, else false.
     * 
     * @returns {Boolean}
     * @memberof ContactField
     */
    isPhoneNumber() {
        return Types.CONTACT_FIELD_TYPE_PHONE_NUMBER === this.type;
    }
}
