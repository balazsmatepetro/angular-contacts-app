import ContactListItemCounterController from './contact-list-item-counter.controller';

export default {
    bindings: {
        contactPresenters: '<'
    },
    controller: ContactListItemCounterController,
    controllerAs: 'vm',
    templateUrl: 'src/contact-list-item-counter/contact-list-item-counter.component.html'
};
