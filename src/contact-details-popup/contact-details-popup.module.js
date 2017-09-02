import angular from 'angular';
import contactDetailsPopupComponent from './contact-details-popup.component';

export default angular
    .module('app.contact-details-popup', [])
    .component('contactDetailsPopup', contactDetailsPopupComponent)
    .name;
