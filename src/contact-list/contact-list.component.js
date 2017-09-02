import ContactListController from './contact-list.controller';

export default {
    bindings: {
        contactPresenters: '<'
    },
    controller: ContactListController,
    controllerAs: 'vm',
    templateUrl: 'src/contact-list/contact-list.component.html'
};
