import * as Types from './contact-field.types';
import isNil from 'lodash.isnil';
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
     * @param {String|undefined|null} id The ID of contact field.
     * @param {String} label The label of contact field.
     * @param {String} type The type of contact field.
     * @param {String} value The value of contact field.
     * @memberof ContactField
     */
    constructor(id, label, type, value) {
        // If the given ID is not a nil or a string, we have to throw an exception.
        if (!isNil(id) && (!isString(id) || 0 === id.length)) {
            throw new Error('The ID must be a nil (undefined, null) or a unique string ID');
        }
        // If the label is not a string, we have to throw an exception.
        if (!isString(label)) {
            throw new Error('The label must be a string!');
        }
        // If the label is an empty string, we have to throw an exception.
        // if (0 === label.length) {
        //     throw new Error('The label cannot be an empty string!');
        // }
        // If the given type is not a valid type, we have to throw an exception.
        if (Types.CONTACT_FIELD_TYPE_EMAIL !== type && Types.CONTACT_FIELD_TYPE_PHONE_NUMBER !== type) {
            throw new Error('Invalid type given!');
        }
        // If the given value is not a string, we have to throw an exception.
        if (!isString(value)) {
            throw new Error('The value must be a string!');
        }
        // If the given value is an empty string, we have to throw an exception.
        // if (0 === value.length) {
        //     throw new Error('The value cannot be an empty string!');
        // }
        // Setting fields.
        this.id = id;
        this.label = label;
        this.type = type;
        this.value = value;
    }

    isEmail() {
        return Types.CONTACT_FIELD_TYPE_EMAIL === this.type;
    }

    isPhoneNumber() {
        return Types.CONTACT_FIELD_TYPE_PHONE_NUMBER === this.type;
    }
}
