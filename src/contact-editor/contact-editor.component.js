import ContactEditorController from './contact-editor.controller';

export default {
    bindings: {
        contact: '<'
    },
    controller: ContactEditorController,
    controllerAs: 'vm',
    templateUrl: 'src/contact-editor/contact-editor.component.html'
};
