import Contact from '../core/contact.entity';

/**
 * Creates a new, empty Contact instance.
 * 
 * @export
 * @param {Object} $q Angular $q service.
 * @returns {Promise<Contact>}
 */
export default function newContactResolver($q) {
    // Creates a deferred object.
    const DEFERRED = $q.defer();
    // Resolving deferred with the contact entity.
    DEFERRED.resolve(new Contact(undefined, '', ''));
    // Returning the promise.
    return DEFERRED.promise;
}
