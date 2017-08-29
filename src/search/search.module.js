import angular from 'angular';
import searchComponent from './search.component';
import SearchService from './search.service';

export default angular
    .module('app.search', [])
    .component('search', searchComponent)
    .service('searchService', SearchService)
    .name;
