import ContactListItemController from './contact-list-item.controller';

export default {
    bindings: {
        contactPresenter: '<'
    },
    controller: ContactListItemController,
    controllerAs: 'vm',
    templateUrl: 'src/contact-list-item/contact-list-item.component.html'
};
