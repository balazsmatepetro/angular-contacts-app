import angular from 'angular';
import contactService from './contact.service';

export default angular
    .module('app.core', [])
    .service('contactService', ['$rootScope', '$http', '$q', contactService])
    .name;
