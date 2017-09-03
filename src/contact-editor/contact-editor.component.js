import ContactEditorController from './contact-editor.controller';

export default {
    bindings: {
        contact: '<',
        groupPresenters: '<'
    },
    controller: ContactEditorController,
    controllerAs: 'vm',
    templateUrl: 'src/contact-editor/contact-editor.component.html'
};
