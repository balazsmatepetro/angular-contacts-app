import Contact from './contact.entity';
import isObject from 'lodash.isobject';

/**
 * Returns true if the given argument is a Contact instance, else false.
 * 
 * @param {Contact} value The given argument.
 * @returns {Boolean}
 */
export default function isContact(value) {
    return isObject(value) && value instanceof Contact;
}
