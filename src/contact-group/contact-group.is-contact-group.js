import ContactGroup from './contact-group.entity';

/**
 * Returns true if the given value is a ContactGroup instance, else false.
 * 
 * @export
 * @param {any} value The given value.
 * @returns {Boolean}
 */
export default function isContactGroup(value) {
    return 'object' === typeof value && value instanceof ContactGroup;
}
