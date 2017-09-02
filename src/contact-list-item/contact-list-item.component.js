import ContactListItemController from './contact-list-item.controller';

export default {
    bindings: {
        contact: '<'
    },
    controller: ContactListItemController,
    controllerAs: 'vm',
    templateUrl: 'src/contact-list-item/contact-list-item.component.html'
};
