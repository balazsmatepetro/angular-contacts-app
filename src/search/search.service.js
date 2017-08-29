import filter from 'lodash.filter';
import isString from 'lodash.isstring';
import startsWith from 'lodash.startswith';

/**
 * The search service.
 * 
 * @export
 * @class SearchService
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class SearchService {
    /**
     * Creates an instance of SearchService.
     * 
     * @param {ContactService} contactService The ContactService instance.
     * @memberof SearchService
     */
    constructor(contactService) {
        this.contactService = contactService;
    }

    /**
     * Performs a search by the given search term and returns the result.
     * 
     * @param {String} term The search term.
     * @param {Boolean} caseInsensitive The matching should be case insensitive or not.
     * @returns {Promise}
     * @memberof SearchService
     */
    search(term, caseInsensitive = true) {
        // If the given argument is not a string, we have to throw an exception.
        if (!isString(term)) {
            throw new Error('The given search term must be a string!');
        }
        // If the given term is an empty string, we have to throw an exception.
        if (0 === term.length) {
            throw new Error('The given search term cannot be an empty string!');
        }
        // If the search is case insensitive, we have to make the term lowercase.
        if (caseInsensitive) {
            term = term.toLowerCase();
        }
        // Returning contact items that match the given search term.
        return this.contactService.findAll().then((contacts) => {
            return filter(contacts, (contact) =>  {
                return hasFirstNameMatch(contact) || hasLastNameMatch(contact);
            });
        });

        /**
         * Returns true if the first name matches to the term.
         * 
         * @param {Contact} contact The contact instance.
         * @returns {Boolean}
         */
        function hasFirstNameMatch(contact) {
            const FIRST_NAME = caseInsensitive ? contact.firstName.toLowerCase() : contact.firstName;

            return startsWith(FIRST_NAME, term);
        }

        /**
         * Returns true if the last name matches to the term.
         * 
         * @param {Contact} contact The contact instance.
         * @returns {Boolean}
         */
        function hasLastNameMatch(contact) {
            const LAST_NAME = caseInsensitive ? contact.lastName.toLowerCase() : contact.lastName;

            return startsWith(LAST_NAME, term);
        }
    }

    /**
     * Returns the name of injectables.
     * 
     * @returns {Array.<String>}
     * @readonly
     * @static
     * @memberof SearchService
     */
    static get $inject() {
        return [
            'contactService'
        ];
    }
}
