import * as ContactListItemEvents from '../contact-list-item/contact-list-item.events';

export default class ContactListController {
    constructor($scope, contactGroupAggregateService, contactGroupOrderService) {
        // Setting fields.
        this.$scope = $scope;
        this.aggregateService = contactGroupAggregateService;
        this.orderService = contactGroupOrderService;
        /**
         * The contact groups.
         * 
         * @type {Array.<ContactGroup>}
         */
        this.contactGroups = [];

        /**
         * The selected contact.
         * 
         * @type {ContactPresenter|null}
         */
        this.selectedContact = null;

        this.$scope.$on('searchError', () => {
            alert('searchError!');
        });
        
        // Subscribing event handler to the toggle selected to contact event.
        this.$scope.$on(ContactListItemEvents.CONTACT_LIST_ITEM_TOGGLE_SELECTED_CONTACT, (event, payload) => {
            // Setting selected contact.
            this.selectedContact = payload.selectedContact;
            // Looping through the contact presenters.
            this.contactPresenters.forEach((contact) => {
                // If we have a selected contact and the ID is the same as the current one's ID, we mark the item as selected.
                contact.isActive = null !== payload.selectedContact && payload.selectedContact.id === contact.id;
            });
        });

        // Creating contact groups.
        this.$scope.$watch(() => this.contactPresenters, (contacts) => {
            this.groupContacts(contacts);
        });
    }

    groupContacts(contacts) {
        // Creates contact groups by the given contacts.
        const AGGREGATED = this.aggregateService.aggregate(contacts);
        // Orders the contact groups alphabetically.
        const ORDERED = this.orderService.order(AGGREGATED);
        // Sets contact groups on the scope.
        this.contactGroups = ORDERED;
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
            '$scope',
            'contactGroupAggregateService',
            'contactGroupOrderService'
        ];
    }
}
