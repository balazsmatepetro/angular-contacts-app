import ContactListController from './contact-list.controller';

export default {
    bindings: {
        contacts: '<'
    },
    controller: ContactListController,
    controllerAs: 'vm',
    templateUrl: 'src/contact-list/contact-list.component.html'
};
