import ContactGroup from './contact-group.entity';
import isObject from 'lodash.isobject';

/**
 * Returns true if the given value is a ContactGroup instance, else false.
 * 
 * @export
 * @param {any} value The given value.
 * @returns {Boolean}
 */
export default function isContactGroup(value) {
    return isObject(value) && value instanceof ContactGroup;
}
