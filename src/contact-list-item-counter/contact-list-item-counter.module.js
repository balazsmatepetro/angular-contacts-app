import angular from 'angular';
import contactListItemCounterComponent from './contact-list-item-counter.component';

export default angular
    .module('app.contact-list-item-counter', [])
    .component('contactListItemCounter', contactListItemCounterComponent)
    .name;
