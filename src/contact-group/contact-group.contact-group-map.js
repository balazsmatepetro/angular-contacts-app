import isContactGroup from './contact-group.is-contact-group';
import find from 'lodash.find';

/**
 * This class represents a ContactGroup map.
 * 
 * @export
 * @class ContactGroupMap
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class ContactGroupMap {
    /**
     * Creates an instance of ContactGroupMap.
     * 
     * @param {Array.<ContactGroup>} [groups=[]] The ContactGroup collection.
     * @throws {Error} Thrown when one of the items is not a ContactGroup instance.
     * @memberof ContactGroupMap
     */
    constructor(groups = []) {
        // If the given argument is not an array, we have to throw an exception.
        if (!Array.isArray(groups)) {
            throw new Error('The given argument must be an array!');
        }
        // If the given array is not empty, we have to check the values and throw an exception
        // when one of the values is not a ContactGroup instance.
        if (0 !== groups.length) {
            groups.forEach((group) => {
                if (!isContactGroup(group)) {
                    throw new Error('All items must be an instance of ContactGroup');
                }
            });
        }
        // Setting groups.
        /**
         * @type {Array.<ContactGroup>}
         */
        this.groups = groups;
    }

    /**
     * Returns the contact group instance if that can be located in the map, else undefined.
     * 
     * @param {String} groupName The name of contact group.
     * @returns {ContactGroup|undefined}
     * @memberof ContactGroupMap
     */
    getGroup(groupName) {
        return find(this.groups, (group) => groupName === group.name);
    }

    /**
     * Returns true if the group can be located in the map, else false.
     * 
     * @param {String} groupName The name of contact group.
     * @returns {Boolean}
     * @memberof ContactGroupMap
     */
    hasGroup(groupName) {
        return !!(this.getGroup(groupName));
    }

    /**
     * Adds the given contact group to the map.
     * 
     * @param {ContactGroup} group The given contact group.
     * @throws {Error} Thrown when the given argument is invalid.
     * @memberof ContactGroupMap
     */
    setGroup(group) {
        // If the given argument is not instance of ContactGroup, we have to throw an exception.
        if (!isContactGroup(group)) {
            throw new Error('The given argument must be instance of ContactGroup!');
        }
        // If the given group already exists, we have to throw an exception.
        if (this.hasGroup(group.name)) {
            throw new Error('The given group already exists!');
        }
        // Setting contact group.
        this.groups.push(group);
    }
}
