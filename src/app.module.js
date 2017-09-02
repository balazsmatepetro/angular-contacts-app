import angular from 'angular';
import angularAnimate from 'angular-animate';
import angularMessages from 'angular-messages';
import uiRouter from 'angular-ui-router';
import coreModule from './core/core.module';
import contactDetailsModule from './contact-details/contact-details.module';
import contactDetailsPopupModule from './contact-details-popup/contact-details-popup.module';
import contactEditorModule from './contact-editor/contact-editor.module';
import contactGroupModule from './contact-group/contact-group.module';
import contactListModule from './contact-list/contact-list.module';
import contactListItemModule from './contact-list-item/contact-list-item.module';
import contactListItemCounterModule from './contact-list-item-counter/contact-list-item-counter.module';
import searchModule from './search/search.module';
import appRouting from './app.routes';

const MODULE_NAME = 'app';

angular
    .module(MODULE_NAME, [
        angularAnimate,
        angularMessages,
        uiRouter,
        coreModule,
        contactDetailsModule,
        contactDetailsPopupModule,
        contactEditorModule,
        contactGroupModule,
        contactListModule,
        contactListItemModule,
        contactListItemCounterModule,
        searchModule
    ])
    .config(['$urlRouterProvider', '$stateProvider', appRouting]);

angular.element(document).ready(() => {
    angular.bootstrap(document, [MODULE_NAME]);
});
