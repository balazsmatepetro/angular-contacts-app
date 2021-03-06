import isContactPresenter from './is-contact-presenter';

/**
 * Return the collection only of the visible ContactPresenters by the given collection.
 * 
 * @export
 * @param {Array.<ContactPresenter>} contactPresenters The given ContactPresenter collection.
 * @returns {Array.<ContactPresenter>}
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default function narrowVisibleContactPresenters(contactPresenters) {
    // When the given argument is not an array we have to throw an exception.
    if (!Array.isArray(contactPresenters)) {
        throw new Error('The given argument must be an array');
    }
    // When the given array is empty we have to throw an exception.
    if (0 === contactPresenters.length) {
        throw new Error('The given array cannot be empty!');
    }
    // Returning only the visible contact entries.
    return contactPresenters.filter((contactPresenter) => isContactPresenter(contactPresenter) && contactPresenter.isVisible);
}
