import Contact from './contact.entity';
import ContactField from './contact-field.entity';
import Group from './group.entity';
import isContact from './is-contact';
import find from 'lodash.find';
import findIndex from 'lodash.findindex';
import maxBy from 'lodash.maxby';

export default class ContactService {
    constructor($q) {
        this.$q = $q;
    }

    findAll() {
        return createPromise(this.$q, CONTACTS);
    }

    findById(id) {
        const CONTACT_ID = parseInt(id, 10);
        const CONTACT = find(CONTACTS, (contact) => CONTACT_ID === contact.id);
        const HAS_FOUND = isContact(CONTACT);
        const PAYLOAD = HAS_FOUND ? CONTACT : 'Contact could not be located!';

        return createPromise(this.$q, PAYLOAD, HAS_FOUND);
    }

    /**
     * Creates a new contact instance.
     * 
     * @param {Contact} contact The given Contact instance.
     * @returns {Promise}
     * @throws {Error} Thrown when the given argument is invalid.
     * @memberof ContactService
     */
    create(contact) {
        // If the given value is not a Contact instance, we have to throw an exception.
        if (!isContact(contact)) {
            throw new Error('The given argument must be a Contact instance!');
        }
        // If the given contact has an ID, it will be handled as an existing contact, so we 
        // will have to throw an exception.

        // TODO: Use isIntegerId instead!
        if (Number.isInteger(contact.id)) {
            throw new Error('Cannot create new contact from an existing one!');
        }
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
        // Returning promise.
        return createPromise(this.$q, contact);
    }

    /**
     * Updates the given contact instance.
     * 
     * @param {Contact} contact The given Contact instance.
     * @returns {Promise}
     * @throws {Error} Thrown when the given argument is invalid, or the contact could not be located.
     * @memberof ContactService
     */
    update(contact) {
        // If the given value is not a Contact instance, we have to throw an exception.
        if (!isContact(contact)) {
            throw new Error('The given argument must be a Contact instance!');
        }
        // If the given contact doesn't have an ID, it will be handled as a new contact,
        // so we have to throw an exception.

        // TODO: Use isIntegerId instead!
        if (!Number.isInteger(contact.id)) {
            throw new Error('Cannot update a non-existing contact!');
        }
        // We have to find the index of the given contact.
        const INDEX = findIndex(CONTACTS, (item) => contact.id === item.id);
        // If the index value is equal to -1 that means the contact could not be located,
        // so we have to throw an exception.
        if (-1 === INDEX) {
            throw new Error('The given contact does not exist!');
        }
        // Updating contact.
        CONTACTS[INDEX] = contact;
        // Returning promise.
        return createPromise(this.$q, contact);
    }

    /**
     * Returns the injectable names.
     * 
     * @returns {Array.<String>}
     * @readonly
     * @static
     * @memberof SearchController
     */
    static get $inject() {
        return [
            '$q'
        ];
    }
}

function createPromise($q, payload, isSuccessful = true) {
    // Creating deferred instance.
    const DEFERRED = $q.defer();
    // Resolving/rejecting deferred object.
    isSuccessful ? DEFERRED.resolve(payload) : DEFERRED.reject(payload);
    // Returning the Promise object.
    return DEFERRED.promise;
}


const THE_DOE_FAMILY = new Group(1, 'The Doe Family');
const STAR_WARS = new Group(2, 'Star Wars');
const ARCHER = new Group(3, 'Archer');
const THE_BUNDY_FAMILY = new Group(4, 'The Bundy Family');

const CONTACT_FIELD = new ContactField('string', 'Label', 'email', 'Value');

/**
 * @type {Array.<Contact>}
 */
const CONTACTS = [
    new Contact(1, 'John', 'Doe', [], [THE_DOE_FAMILY]),
    new Contact(2, 'Jane', 'Doe', [], [THE_DOE_FAMILY]),
    new Contact(3, 'Bud', 'Bundy', [], [THE_BUNDY_FAMILY]),
    new Contact(4, 'Boba', 'Fett', [], [STAR_WARS]),
    new Contact(5, 'Luke', 'Skywalker', [], [STAR_WARS]),
    new Contact(6, 'Leia', 'Organa', [], [STAR_WARS]),
    new Contact(7, 'Darth', 'Vader', [], [STAR_WARS]),
    new Contact(8, 'Al', 'Bundy', [CONTACT_FIELD], [THE_BUNDY_FAMILY]),
    new Contact(9, 'Sterling', 'Archer', [], [ARCHER]),
    new Contact(10, 'Carol', 'Tunt', [], [ARCHER]),
    new Contact(11, 'Ádám', 'Éva', [], [])
];
