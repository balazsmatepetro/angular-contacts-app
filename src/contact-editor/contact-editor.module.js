import angular from 'angular';
import contactEditorComponent from './contact-editor.component';

export default angular
    .module('app.contact-editor', [])
    .component('contactEditor', contactEditorComponent)
    .name;
