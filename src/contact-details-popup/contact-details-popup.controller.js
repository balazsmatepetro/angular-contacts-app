import isContactPresenter from '../core/is-contact-presenter';
import * as ContactListItemEvents from '../contact-list-item/contact-list-item.events';

/**
 * The controller of contact details popup.
 * 
 * @export
 * @class ContactDetailsPopupController
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class ContactDetailsPopupController {
    /**
     * Creates an instance of ContactDetailsPopupController.
     * 
     * @param {Object} $scope 
     * @memberof ContactDetailsPopupController
     */
    constructor($scope) {
        this.$scope = $scope;
    }

    getGroupNames() {
        if (!isContactPresenter(this.contact)) {
            return '';
        }

        return this.contact.groups.map((group) => group.name).join(',');
    }

    /**
     * Closes the popup.
     * 
     * @memberof ContactDetailsPopupController
     */
    close() {
        this.$scope.$emit(ContactListItemEvents.CONTACT_LIST_ITEM_TOGGLE_SELECTED_CONTACT, {
            selectedContact: null
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
