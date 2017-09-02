import contactListResolver from './contact-list/contact-list.route-resolver';
import existingContactResolver from './contact-editor/contact-editor.existing-contact-route-resolver';
import newContactResolver from './contact-editor/contact-editor.new-contact-route-resolver';

export default function appRouting($urlRouterProvider, $stateProvider) {
    $stateProvider
        .state('contacts', {
            component: 'contactList',
            url: '/',
            resolve: {
                contacts: ['contactService', contactListResolver]
            }
        })
        .state('contact', {
            component: 'contactDetails',
            url: '/contacts/{id}',
            resolve: {
                contact: ['$stateParams', 'contactService', existingContactResolver]
            }
        })
        .state('edit', {
            component: 'contactEditor',
            url: '/contacts/{id}/edit',
            resolve: {
                contact: ['$stateParams', 'contactService', existingContactResolver]
            }
        })
        .state('new', {
            component: 'contactEditor',
            url: '/contacts/create',
            resolve: {
                contact: ['$q', newContactResolver]
            }
        });

    $urlRouterProvider.otherwise('/');
}
