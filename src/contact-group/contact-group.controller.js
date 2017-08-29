import narrowVisibleContactPresenters from '../core/narrow-visible-contact-presenters';
import helper from './contact-group.helper';

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
        return 0 !== narrowVisibleContactPresenters(this.contactGroup.contacts).length;
    }

    /**
     * Returns true if the contact group is an empty named group, else false.
     * 
     * @returns {Boolean}
     * @memberof ContactGroupController
     */
    isEmptyNamedGroup() {
        return this.contactGroup.name === helper.emptyGroupName;
    }
}
