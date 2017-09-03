import existingContactResolver from './contact-editor/contact-editor.existing-contact-route-resolver';
import newContactResolver from './contact-editor/contact-editor.new-contact-route-resolver';
import groupPresentersResolver from './contact-editor/contact-editor.group-presenters-route-resolver';

export default function appRouting($urlRouterProvider, $stateProvider) {
    $stateProvider
        .state('contacts', {
            component: 'contactList',
            url: '/'
        })
        .state('contact', {
            component: 'contactDetails',
            url: '/contacts/{id}',
            resolve: {
                contact: ['$state', '$stateParams', 'contactService', existingContactResolver]
            }
        })
        .state('edit', {
            component: 'contactEditor',
            url: '/contacts/{id}/edit',
            resolve: {
                contact: ['$state', '$stateParams', 'contactService', existingContactResolver],
                groupPresenters: ['$q', groupPresentersResolver]
            }
        })
        .state('new', {
            component: 'contactEditor',
            url: '/contacts/create',
            resolve: {
                contact: ['$q', newContactResolver],
                groupPresenters: ['$q', groupPresentersResolver]
            }
        });

    $urlRouterProvider.otherwise('/');
}
