import angular from 'angular';
import contactGroupComponent from './contact-group.component';

export default angular
    .module('app.contact-group', [])
    .component('contactGroup', contactGroupComponent)
    .name;
