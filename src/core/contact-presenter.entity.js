import isContact from './is-contact';

/**
 * This class represents a contact entry on the UI, essentially it's a decorated
 * contact entry.
 * 
 * @export
 * @class ContactPresenter
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class ContactPresenter {
    /**
     * Creates an instance of ContactPresenter.
     * 
     * @param {Contact} contact The contact object.
     * @param {boolean} [isVisible=true] The entry is visible or not.
     * @param {boolean} [isActive=false] The entry is active or not.
     * @memberof ContactPresenter
     */
    constructor(contact, isVisible = true, isActive = false) {
        // If the given contact argument is not a Contact instance, we have to throw an exception.
        if (!isContact(contact)) {
            throw new Error('The contact argument must be an instance of Contact!');
        }
        // Setting fields.
        this.id = contact.id;
        this.firstName = contact.firstName;
        this.lastName = contact.lastName;
        this.contactFields = contact.contactFields;
        this.groups = contact.groups;
        this.isVisible = !!isVisible;
        this.isActive = !!isActive;
    }
}
