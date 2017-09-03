import * as ContactEvents from '../core/contact.events';
import * as ContactListItemEvents from '../contact-list-item/contact-list-item.events';

/**
 * Controller of contact-list component.
 * 
 * @export
 * @class ContactListController
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class ContactListController {
    /**
     * Creates an instance of ContactListController.
     * 
     * @param {Object} $scope 
     * @param {ContactService} contactService 
     * @param {AggregateService} aggregateService 
     * @param {OrderService} orderService 
     * @memberof ContactListController
     */
    constructor($scope, contactService, aggregateService, orderService) {
        /**
         * The controller scope.
         * 
         * @type {Object}
         */
        this.$scope = $scope;

        /**
         * The contact service.
         * 
         * @type {ContactService}
         */
        this.contactService = contactService;

        /**
         * The contact group aggregate service.
         * 
         * @type {AggregateService}
         */
        this.aggregateService = aggregateService;

        /**
         * The contact gorup order service.
         * 
         * @type {OrderService}
         */
        this.orderService = orderService;

        /**
         * The contact groups.
         * 
         * @type {Array.<ContactGroup>}
         */
        this.contactGroups = [];

        /**
         * The contact presenters.
         * 
         * @type {Array.<ContactPresenter>}
         */
        this.contactPresenters = [];

        /**
         * The contacts are loaded or not.
         * 
         * @type {Boolean}
         */
        this.contactsLoaded = false;

        /**
         * The selected contact.
         * 
         * @type {ContactPresenter|null}
         */
        this.selectedContact = null;

        // Subscribing event handler to the all contacts loaded event.
        $scope.$on(ContactEvents.CONTACT_CONTACTS_LOADED, (event, payload) => {
            // Setting contact presenters.
            this.contactPresenters = payload.contacts;
            // Marking as loaded.
            this.contactsLoaded = true;
        });

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
            if (this.contactsLoaded) {
                this.groupContacts(contacts);
            }
        });

        // NOTE:
        // We have to call the loadAll method here, otherwise when the user navigates back to this
        // page, the event is not triggered and the event handler will never be executed!
        this.contactService.loadAll();
    }

    /**
     * Creates contact groups by the given contacts.
     * 
     * @param {Array.<ContactPresenter>} contacts The contact presenter collection.
     * @memberof ContactListController
     */
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
            'contactService',
            'contactGroupAggregateService',
            'contactGroupOrderService'
        ];
    }
}
