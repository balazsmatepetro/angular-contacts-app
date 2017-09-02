import * as Events from './contact-list-item.events';

/**
 * The controller of contact list item component.
 * 
 * @export
 * @class ContactListItemController
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class ContactListItemController {
    /**
     * Creates an instance of ContactListItemController.
     * 
     * @param {Object} $scope The $scope instance.
     * @memberof ContactListItemController
     */
    constructor($scope) {
        this.$scope = $scope;
    }

    /**
     * Returns the class for the contact item.
     * 
     * @returns {Array.<Object>}
     * @memberof ContactListItemController
     */
    getItemClass() {
        return {
            'contact-list-item-active': this.contactPresenter.isActive
        };
    }

    /**
     * Toggles the 'isActive' field of the contact presenter and emits and event.
     * 
     * @memberof ContactListItemController
     */
    toggleContact() {
        // Setting the proper value.
        this.contactPresenter.isActive = !this.contactPresenter.isActive;
        // Dispatching event.
        this.$scope.$emit(Events.CONTACT_LIST_ITEM_TOGGLE_SELECTED_CONTACT, {
            selectedContact: this.contactPresenter.isActive ? this.contactPresenter : null
        });
    }

    /**
     * Returns the injectable names.
     * 
     * @returns {Array.<String>}
     * @readonly
     * @static
     * @memberof SearchController
     */
    static get $inject() {
        return [
            '$scope'
        ];
    }
}
