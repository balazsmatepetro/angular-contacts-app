import ContactDetailsPopupController from './contact-details-popup.controller';

export default {
    bindings: {
        contact: '<'
    },
    controller: ContactDetailsPopupController,
    controllerAs: 'vm',
    templateUrl: 'src/contact-details-popup/contact-details-popup.component.html'
};
