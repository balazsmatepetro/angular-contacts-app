import ContactGroupController from './contact-group.controller';

export default {
    bindings: {
        contactGroup: '<'
    },
    controller: ContactGroupController,
    controllerAs: 'vm',
    templateUrl: 'src/contact-group/contact-group.component.html'
};
