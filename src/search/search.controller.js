/**
 * The controller of search component.
 * 
 * @export
 * @class SearchController
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class SearchController {
    /**
     * Creates an instance of SearchController.
     * 
     * @param {Object} $scope The $scope instance.
     * @param {SearchService} searchService The SearchService instance.
     * @memberof SearchController
     */
    constructor($scope, searchService) {
        // Setting necessary fields.
        this.$scope = $scope;
        this.searchService = searchService;
        // Watching the search term changes.
        this.$scope.$watch(() => this.term, (newTerm) => {
            // We have to narrow only when the term is not undefined.
            if (undefined !== newTerm) {
                this.narrow(newTerm);
            }
        });
    }

    /**
     * Narrows the visible contact items on the UI.
     * 
     * @param {String} [term=''] The given search term.
     * @memberof SearchController
     */
    narrow(term = '') {
        // If the search term is an empty string.
        if ('' === term) {
            // We have to make visible all contact items.
            changeVisibility(this.contactPresenters, () => true);
            // An stop running.
            return;
        }
        // If the search term is not an empty string, we have to perform a new search.
        this
            .searchService
            .search(term)
            .then((contacts) => {
                // Mapping the narrowed contact IDs to a string.
                const NARROWED_IDS = contacts.map((contact) => contact.id);
                // Making visible only those items that can be located in the narrowed IDs array.
                changeVisibility(this.contactPresenters, (contact) => -1 !== NARROWED_IDS.indexOf(contact.id));
            })
            .catch(() => this.$scope.$emit('searchError'));

        function changeVisibility(contacts, predicate) {
            // Looping through the contacts.
            contacts.forEach((contact) => {
                // Making visible only those items that match the condition.
                contact.isVisible = predicate(contact);
            });
        }
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
            'searchService'
        ];
    }
}
