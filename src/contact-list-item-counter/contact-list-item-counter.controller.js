import narrowVisibleContactEntries from '../core/narrow-visible-contact-entries';

/**
 * The controller of contact list item counter component.
 * 
 * @export
 * @class ContactListItemCounterController
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class ContactListItemCounterController {
    /**
     * Returns the number of items.
     * 
     * @returns {Number} The number of items.
     * @memberof ContactListItemCounterController
     */
    count() {
        return narrowVisibleContactEntries(this.contacts).length;
    }

    /**
     * Returns the suffix text.
     * 
     * @returns {String} The suffix text.
     * @memberof ContactListItemCounterController
     */
    getSuffixText() {
        return 1 === this.count() ? 'contact' : 'contacts';
    }
}
