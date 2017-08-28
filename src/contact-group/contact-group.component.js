import ContactGroupController from './contact-group.controller';

export default {
    bindings: {
        contacts: '<',
        name: '<'
    },
    controller: ContactGroupController,
    controllerAs: 'vm',
    templateUrl: 'src/contact-group/contact-group.component.html'
};
