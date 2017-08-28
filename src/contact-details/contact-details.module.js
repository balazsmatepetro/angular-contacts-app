import angular from 'angular';
import contactDetailsComponent from './contact-details.component';

export default angular
    .module('app.contact-details', [])
    .component('contactDetails', contactDetailsComponent)
    .name;
