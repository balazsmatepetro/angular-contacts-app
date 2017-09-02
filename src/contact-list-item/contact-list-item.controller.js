export default class ContactListItemController {
    constructor($scope) {
        this.$scope = $scope;
    }

    activate() {
        this.contact.isActive = !this.contact.isActive;

        if (this.contact.isActive) {
            this.$scope.$emit('selectContact', {
                selectedContact: this.contact
            });
        }
    }

    getClass() {
        return {
            'contact-list-item-active': this.contact.isActive
        };
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
