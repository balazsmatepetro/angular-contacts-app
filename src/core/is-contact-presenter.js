import ContactPresenter from './contact.presenter';
import isObject from 'lodash.isobject';

/**
 * Returns true if the given argument is a ContactPresenter instance, else false.
 * 
 * @param {ContactPresenter} value The given argument.
 * @returns {Boolean}
 */
export default function isContactPresenter(value) {
    return isObject(value) && value instanceof ContactPresenter;
}
