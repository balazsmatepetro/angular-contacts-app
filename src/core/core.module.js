import angular from 'angular';
import ContactService from './contact.service';

export default angular
    .module('app.core', [])
    .service('contactService', ContactService)
    .name;
