export default class ContactListController {
    constructor($scope, contactGroupAggregateService, contactGroupOrderService) {
        this.$scope = $scope;
        this.aggregateService = contactGroupAggregateService;
        this.orderService = contactGroupOrderService;

        this.contactGroups = [];

        this.selectedContact = undefined;

        this.$scope.$on('searchError', () => {
            alert('searchError!');
        });

        this.$scope.$on('selectContact', (event, payload) => {
            this.selectedContact = payload.selectedContact;

            this.contacts.forEach((contact) => {
                contact.isActive = payload.selectedContact.id === contact.id;
            });
        });

        this.$scope.$watch(() => this.contacts, (contacts) => {
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
