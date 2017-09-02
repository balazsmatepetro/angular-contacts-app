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
     * @param {boolean} [isVisible=true] The visibility of entry.
     * @memberof ContactPresenter
     */
    constructor(contact, isVisible = true, isActive = false) {
        this.id = contact.id;
        this.firstName = contact.firstName;
        this.lastName = contact.lastName;
        this.contactFields = contact.contactFields;
        this.groups = contact.groups;
        this.isVisible = !!isVisible;
        this.isActive = !!isActive;
    }
}
