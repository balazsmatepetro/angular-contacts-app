import Group from './group.entity';
import isObject from 'lodash.isobject';

/**
 * Returns true if the given argument is a Group instance, else false.
 * 
 * @param {Group} value The given argument.
 * @returns {Boolean}
 */
export default function isGroup(value) {
    return isObject(value) && value instanceof Group;
}
