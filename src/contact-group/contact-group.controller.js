import narrowVisibleContactEntries from '../core/narrow-visible-contact-entries';

/**
 * The controller of contact group component.
 * 
 * @export
 * @class ContactGroupController
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class ContactGroupController {
    /**
     * Returns true if the contact group has at least one visible contact item, else false.
     * 
     * @returns {Boolean} 
     * @memberof ContactGroupController
     */
    hasVisibleContact() {
        return 0 !== narrowVisibleContactEntries(this.contacts).length;
    }
}
