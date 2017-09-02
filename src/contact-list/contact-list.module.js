import angular from 'angular';
import contactListComponent from './contact-list.component';

export default angular
    .module('app.contact-list', [])
    .component('contactList', contactListComponent)
    .name;
