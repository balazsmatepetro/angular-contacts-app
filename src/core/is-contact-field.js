import ContactField from './contact-field.entity';
import isObject from 'lodash.isobject';

/**
 * Returns true if the given argument is a ContactField instance, else false.
 * 
 * @param {ContactField} value The given argument.
 * @returns {Boolean}
 */
export default function isContactField(value) {
    return isObject(value) && value instanceof ContactField;
}
