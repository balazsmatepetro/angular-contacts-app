import SearchController from './search.controller';

export default {
    bindings: {
        contactPresenters: '<'
    },
    controller: SearchController,
    controllerAs: 'vm',
    templateUrl: 'src/search/search.component.html'
};
