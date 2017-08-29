import ContactGroupMap from './contact-group.contact-group-map';
import helper from './contact-group.helper';
import isObject from 'lodash.isobject';

/**
 * Contact group order service.
 * 
 * @export
 * @class OrderService
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class OrderService {
    /**
     * Returns an ordered collection of ContactGroup by the given ContactGroupMap.
     * 
     * @param {ContactGroupMap} contactGroupMap The ContactGroupMap instance.
     * @returns {Array.<ContactGroup>} The ordered ContactGroup collection.
     * @throws {Error} Thrown when the given argument is invalid.
     * @memberof OrderService
     */
    order(contactGroupMap) {
        // If the given argument is not an instance of ContactGroupMap, we have to throw an exception.
        if (!isObject(contactGroupMap) || !(contactGroupMap instanceof ContactGroupMap)) {
            throw new Error('The given argument must be an instance of ContactGroupMap!');
        }
        // The array of ordered contact groups.
        let ORDERED = [];
        // We have to loop through the alphabet characters.
        helper.alphabet.split('').forEach((character) => {
            // Getting group from the map.
            const GROUP = contactGroupMap.getGroup(character);
            // If the group exists in the map, we have to push it to the ordered array.
            if (undefined !== GROUP) {
                ORDERED.push(GROUP);
            }
        });
        // Getting group from the map.
        const EMPTY_GROUP = contactGroupMap.getGroup(helper.emptyGroupName);
        // If the group exists in the map, we have to push it to the end of array.
        if (undefined !== EMPTY_GROUP) {
            ORDERED.push(EMPTY_GROUP);
        }
        // Returning ordered contact groups.
        return ORDERED;
    }
}
