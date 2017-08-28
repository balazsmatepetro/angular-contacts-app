import angular from 'angular';
import contactListItemComponent from './contact-list-item.component';

export default angular
    .module('app.contact-list-item', [])
    .component('contactListItem', contactListItemComponent)
    .name;
