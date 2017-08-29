import ContactPresenter from './contact.presenter';
import isObject from 'lodash.isobject';

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
    return contactPresenters.filter((contactPresenter) => isContactPresenterInstance(contactPresenter) && contactPresenter.isVisible);
}

/**
 * Returns true if the given argument is a ContactPresenter instance, else false.
 * 
 * @param {ContactPresenter} value The given argument.
 * @returns {Boolean}
 */
function isContactPresenterInstance(value) {
    return isObject(value) && value instanceof ContactPresenter;
}
