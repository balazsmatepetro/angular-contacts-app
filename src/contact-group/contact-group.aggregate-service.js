import ContactGroup from './contact-group.entity';
import ContactGroupMap from './contact-group.contact-group-map';
import helper from './contact-group.helper';
import isContactPresenter from '../core/is-contact-presenter';
import isObject from 'lodash.isobject';

/**
 * Contact group aggregator service.
 * 
 * @export
 * @class AggregateService
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class AggregateService {
    /**
     * Creates and returns a ContactGroup map by given ContactPresenter collection.
     * 
     * @param {Array.<ContactPresenter>} contactPresenters The ContactPresenter collection.
     * @returns {ContactGroupMap} The ContactGroup map.
     * @throws {Error} Thrown when the given argument is invalid.
     * @memberof AggregateService
     */
    aggregate(contactPresenters) {
        // If the given argument is not an array, we have to throw an exception.
        if (!Array.isArray(contactPresenters)) {
            throw new Error('The given argument must be an array!');
        }
        // If the given array is empty, we have to throw an exception.
        if (0 === contactPresenters.length) {
            throw new Error('The given array cannot be empty!');
        }
        // This object will store the contact groups.
        const GROUP_MAP = new ContactGroupMap();
        // Looping throgh contacts.
        contactPresenters.forEach((contactPresenter) => {
            // If the given value is not object or not a ContactPresenter instance we have to throw an exception.
            if (!isObject(contactPresenter) || !isContactPresenter(contactPresenter)) {
                throw new Error('All items must be an instance of ContactPresenter');
            }
            // Getting first letter of first name.
            const FIRST_LETTER = contactPresenter.firstName.charAt(0).toLowerCase();
            // If the first letter is in the alphabet, we will group by the first letter, otherwise 
            // we will use an empty string.
            const GROUP_NAME = -1 !== helper.alphabet.indexOf(FIRST_LETTER) ? FIRST_LETTER : helper.emptyGroupName;
            // If the contact group doesn't exist yet, now we will create it..
            if (!GROUP_MAP.hasGroup(GROUP_NAME)) {
                GROUP_MAP.setGroup(new ContactGroup(GROUP_NAME, []));
            }
            // Pushing contact item to the contact group.
            GROUP_MAP.getGroup(GROUP_NAME).contacts.push(contactPresenter);
        });
        // Returns aggregated contact groups.
        return GROUP_MAP;
    }
}
