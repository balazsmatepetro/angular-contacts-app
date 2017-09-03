import Contact from './contact.entity';
import ContactPresenter from './contact-presenter.entity';
import ContactField from './contact-field.entity';
import Group from './group.entity';
import * as Events from './contact.events';
import isContact from './is-contact';
import isIntegerId from './is-integer-id';
import find from 'lodash.find';
import findIndex from 'lodash.findindex';
import maxBy from 'lodash.maxby';

/**
 * Contact service.
 * 
 * @export
 * @param {Object} $rootScope The $rootScope.
 * @param {Object} $http The $http service.
 * @param {Object} $q The $q service.
 * @returns {Object}
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default function contactService($rootScope, $http, $q) {
    /**
     * The contacts.
     * 
     * @type {Array.<Contact>}
     */
    const CONTACTS = [];
    // The deferred object.
    let deferred = null;

    // TODO: Unit tests!

    return {
        findAll: findAll,
        findById: findById,
        create: create,
        update: update,
        loadAll: loadAll
    };

    /**
     * Returns all promise and broadcasts 'all contacts loaded' event.
     * 
     * @returns {Promise<Array.<Contact>>}
     */
    function loadAll() {
        return init().then((contacts) => {
            $rootScope.$broadcast(Events.CONTACT_CONTACTS_LOADED, {
                contacts: mapContacts(contacts)
            });
        });
    }

    /**
     * Returns all contacts.
     * 
     * @returns {Promise<Array.<Contact>>}
     */
    function findAll() {
        return init().then((contacts) => mapContacts(contacts));
    }

    /**
     * Finds the contact item by ID.
     * 
     * @param {Number} id The contact ID.
     * @returns {Promise<Contact>}
     * @throws {Error} Thrown when the contact item could not be located by ID.
     * @returns 
     */
    function findById(id) {
        // Converting the the ID to an integer.
        const CONTACT_ID = parseInt(id, 10);
        // Calling init.
        return init().then((contacts) => {
            // Locating the contact item by ID.
            const CONTACT = find(contacts, (contact) => CONTACT_ID === contact.id);
            // If the contact item could not be located, we have to throw an exception.
            if (!isContact(CONTACT)) {
                throw new Error('Contact could not be located!');
            }
            // Returning contact item.
            return CONTACT;
        });
    }

    /**
     * Creates a new contact instance.
     * 
     * @param {Contact} contact The given Contact instance.
     * @returns {Promise<Contact>}
     * @throws {Error} Thrown when the given argument is invalid.
     * @memberof ContactService
     */
    function create(contact) {
        // If the given value is not a Contact instance, we have to throw an exception.
        if (!isContact(contact)) {
            throw new Error('The given argument must be a Contact instance!');
        }
        // If the given contact has an ID, it will be handled as an existing contact, so we 
        // will have to throw an exception.
        if (isIntegerId(contact.id)) {
            throw new Error('Cannot create new contact from an existing one!');
        }
        // Returning promise.
        return init().then(() => {
            /**
             * The lastly created contact.
             * 
             * @type {Contact}
             */
            const LASTLY_CREATED_CONTACT = maxBy(CONTACTS, (contact) => contact.id);
            // Increasing the ID by one.
            contact.id = LASTLY_CREATED_CONTACT.id + 1;
            // Pushing contact to the data source.
            CONTACTS.push(contact);
            // Returning Contact instance.
            return contact;
        });
    }

    /**
     * Updates the given contact instance.
     * 
     * @param {Contact} contact The given Contact instance.
     * @returns {Promise<Contact>}
     * @throws {Error} Thrown when the given argument is invalid, or the contact could not be located.
     * @memberof ContactService
     */
    function update(contact) {
        // If the given value is not a Contact instance, we have to throw an exception.
        if (!isContact(contact)) {
            throw new Error('The given argument must be a Contact instance!');
        }
        // If the given contact doesn't have an ID, it will be handled as a new contact,
        // so we have to throw an exception.
        if (!isIntegerId(contact.id)) {
            throw new Error('Cannot update a non-existing contact!');
        }
        // Returning promise.
        return init().then(() => {
            // We have to find the index of the given contact.
            const INDEX = findIndex(CONTACTS, (item) => contact.id === item.id);
            // If the index value is equal to -1 that means the contact could not be located,
            // so we have to throw an exception.
            if (-1 === INDEX) {
                throw new Error('The given contact does not exist!');
            }
            // Updating contact.
            CONTACTS[INDEX] = contact;
            // Returning Contact instance.
            return contact;
        });
    }

    function init() {
        // If the deferred is not null, we will return the deferred object's promise.
        if (null !== deferred) {
            return deferred.promise;
        }
        // Creating deferred object.
        deferred = $q.defer();
        // Fetching contacts.
        $http.get('/data/contacts.json').then((response) => {
            // The contacts.
            const CONTACTS_DATA = response.data.contacts;
            // Looping through contacts.
            CONTACTS_DATA.forEach((contact) => {
                // This array will store the contact fields.
                const CONTACT_FIELDS = [];
                // Looping through contact fields and creating contact field instances.
                if (contact.contactFields && Array.isArray(contact.contactFields)) {
                    contact.contactFields.forEach((data) => {
                        CONTACT_FIELDS.push(new ContactField(data.label, data.type, data.value));
                    });
                }
                // This array will store the groups.
                const GROUPS = [];
                // Looping through groups and creating group instances.
                if (contact.groups && Array.isArray(contact.groups)) {
                    contact.groups.forEach((data) => {
                        GROUPS.push(new Group(data.id, data.name));
                    });
                }
                // Pushing Contact item to the collection.
                CONTACTS.push(
                    new Contact(contact.id, contact.firstName, contact.lastName, CONTACT_FIELDS, GROUPS)
                );
            });
            // Resolving deferred object.
            deferred.resolve(CONTACTS);
        }, () => {
            // Rejecting deferred object.
            deferred.reject('Contacts could not be loaded!');
        });
        // Returning promise.
        return deferred.promise;
    }

    /**
     * Maps the given Contact collection to a ContactPresenter collection.
     * 
     * @param {Array.<Contact>} contacts The Contact collection.
     * @returns {Array.<ContactPresenter>}
     */
    function mapContacts(contacts) {
        return contacts.map((contact) => new ContactPresenter(contact, true, false));
    }
}
